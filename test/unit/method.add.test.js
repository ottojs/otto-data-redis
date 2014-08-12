
'use strict';

// Modules
require('should');

// Subject
var method_add = require('../../lib/method.add.js');

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

  it('should be able to add a single value to set', function () {

    // Generate
    var set_add = method_add({
      sadd : function (key, value, next) {
        next(undefined, value);
      }
    });
    set_add('foo', 'my-value', function (error, result) {
      result.should.be.type('string').and.equal('my-value');
    });

  });

  it('should be able to add multiple values to set', function () {

    // Generate
    var set_add = method_add({
      // This is odd, but it's how
      // the underlying library works
      sadd : function (key, next) {
        next(undefined, key);
      }
    });
    set_add('foo', ['one', 'two', 'three'], function (error, result) {
      result.should.be.instanceof(Array).with.length(4);
      result[0].should.be.type('string').and.equal('foo');
      result[1].should.be.type('string').and.equal('one');
      result[2].should.be.type('string').and.equal('two');
      result[3].should.be.type('string').and.equal('three');
    });

  });

});
