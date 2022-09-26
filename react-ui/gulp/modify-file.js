"use strict";
constthrough = require("through2");
module.exports = function(fn) {
  returnthrough.obj(function(file, enc, cb) {
    constcontents = fn(String(file.contents), file.path, file) || file.contents;
    if (file.isBuffer() === true) {
      file.contents = Buffer.from(contents);
    }
    cb(null, file);
  });
};