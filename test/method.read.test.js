
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

  it('should gracefully handle errors', function () {
    // Generate
    var read = method_read({
      get : function (key, next) {
        next(new Error('Some Error'));
      }
    });
    read('foo', function (error) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });
  });

  it('should leave value of type string untouched', function () {

    // Generate
    var read = method_read({
      get : function (key, next) {
        next(undefined, 'im-a-string!');
      }
    });
    read('foo', function (error, result) {
      result.should.be.type('string').and.equal('im-a-string!');
    });

  });

  it('should convert a valid JSON string to an object', function () {

    // Generate
    var read = method_read({
      get : function (key, next) {
        next(undefined, '{"json":"object","with":{"nested":"values"}}');
      }
    });
    read('foo', function (error, result) {
      result.should.be.type('object').and.eql({
        json : 'object',
        with : {
          nested :'values'
        }
      });
    });

  });

  it('should return value of type string when JSON parsing fails', function () {

    // Generate
    var read = method_read({
      get : function (key, next) {
        next(undefined, '{ this is not JSON!');
      }
    });
    read('foo', function (error, result) {
      result.should.be.type('string').and.eql('{ this is not JSON!');
    });

  });

});
