
'use strict';

// Modules
require('should');

// Subject
var method_add = require('../lib/method.add.js');

describe('.add()', function () {

  it('should call client.sadd() with provided key', function () {

    // Generate
    var set_add = method_add({
      sadd : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    set_add('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var set_add = method_add({
      sadd : function (key, next) {
        called = true;
        next();
      }
    });
    set_add('foo', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var set_add = method_add({
      sadd : function (key, next) {
        next(undefined, 'Add Result');
      }
    });
    set_add('foo', function (error, result) {
      result.should.be.type('string').and.equal('Add Result');
    });

  });

});
