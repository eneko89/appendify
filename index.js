var path = require('path'),
    through = require('through2'),
    minimatch = require('minimatch');

module.exports = function appendify (file, opts) {

  // Check if configuration properties are set.
  if (!(opts && opts.glob && opts.string)) {
    throw new Error('Could not find configuration for appendify');
  }

  var glob = opts.glob,
      string = opts.string,
      cwd = process.cwd(),
      matched = false;

  // Use minimatch to match glob patterns in opts.paths
  matched = minimatch(file, path.join(cwd, glob));

  if (!matched) {

    // If current file does not match patterns in options,
    // return a passthrough stream.
    return through();
  }

  var buffer = '';

  // Buffer file content chunks.
  function write (chunk, enc, next) {
    buffer += chunk;
    next();
  }

  function end () {

    // If string is a function, call it with the current
    // file path as parameter to generate the string.
    if (string instanceof Function) {
      buffer += string(file);
    } else {
      buffer += string;      
    }

    this.push(buffer);
    this.push(null);
  }

  return through(write, end);
};
