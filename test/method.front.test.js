
'use strict';

// Modules
require('should');

// Subject
var method_front = require('../lib/method.front.js');

describe('.front()', function () {

  it('should call client.lpop() with provided key', function () {

    // Generate
    var front = method_front({
      lpop : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    front('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var front = method_front({
      lpop : function (key, next) {
        called = true;
        next();
      }
    });
    front('foo', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var front = method_front({
      lpop : function (key, next) {
        next(undefined, 'Read Result');
      }
    });
    front('foo', function (error, result) {
      result.should.be.type('string').and.equal('Read Result');
    });

  });

});
