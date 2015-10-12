appendify
=========

Browserify transform to append text at the end of CommonJS module files. This
makes possible to inject code into modules whose path matches a given glob
pattern.


Usage
-----

This transform is designed to be used with the browserify API:


```javascript
var appendify = require('appendify');

b.transform(appendify, {
  glob: './foo/bar/*.js',
  string: '\nconsole.log("This will be appended to modules matching the glob");'
});
```

Instead, you could also provide a function which returns the string to inject.
The function will receive the file path to the module as parameter:

```javascript
var appendify = require('appendify');

b.transform(appendify, {
  glob: './foo/bar/*.js',
  string: function(path) {
    return '\n// Module path: ' + path;
  }
});
```