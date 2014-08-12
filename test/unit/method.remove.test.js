
'use strict';

// Modules
require('should');

// Subject
var method_remove = require('../../lib/method.remove.js');

describe('.remove()', function () {

  it('should call client.srem() with provided key', function () {

    // Generate
    var set_remove = method_remove({
      srem : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    set_remove('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var set_remove = method_remove({
      srem : function (key, next) {
        called = true;
        next();
      }
    });
    set_remove('foo', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var set_remove = method_remove({
      srem : function (key, next) {
        next(undefined, 'Remove Result');
      }
    });
    set_remove('foo', function (error, result) {
      result.should.be.type('string').and.equal('Remove Result');
    });

  });

});
