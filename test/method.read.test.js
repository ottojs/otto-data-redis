
'use strict';

// Modules
require('should');

// Subject
var method_read = require('../lib/method.read.js');

describe('.read()', function () {

  it('should call client.get() with provided key', function () {

    // Generate
    var read = method_read({
      get : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    read('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var read = method_read({
      get : function (key, next) {
        called = true;
        next();
      }
    });
    read('foo', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var read = method_read({
      get : function (key, next) {
        next(undefined, 'Read Result');
      }
    });
    read('foo', function (error, result) {
      result.should.be.type('string').and.equal('Read Result');
    });

  });

});
