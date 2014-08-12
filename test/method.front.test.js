
'use strict';

// Modules
require('should');

// Subject
var method_front = require('../lib/method.front.js');

describe('.front()', function () {

  it('should call client.rpop() with provided key', function () {

    // Generate
    var front = method_front({
      rpop : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    front('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var front = method_front({
      rpop : function (key, next) {
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
      rpop : function (key, next) {
        next(undefined, 'Read Result');
      }
    });
    front('foo', function (error, result) {
      result.should.be.type('string').and.equal('Read Result');
    });

  });

  it('should gracefully handle errors', function () {

    // Generate
    var front = method_front({
      rpop : function (key, next) {
        next(new Error('Some Error'));
      }
    });

    front('foo', function (error) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });

  });

  it('should leave value of type string untouched', function () {

    // Generate
    var front = method_front({
      rpop : function (key, next) {
        next(undefined, 'im-a-string!');
      }
    });

    front('foo', function (error, result) {
      result.should.be.type('string').and.equal('im-a-string!');
    });

  });

  it('should convert a valid JSON string to an object', function () {

    // Generate
    var front = method_front({
      rpop : function (key, next) {
        next(undefined, '{"json":"object","with":{"nested":"values"}}');
      }
    });

    front('foo', function (error, result) {
      result.should.be.type('object').and.eql({
        json : 'object',
        with : {
          nested : 'values'
        }
      });
    });

  });

  it('should return value of type string when JSON parsing fails', function () {

    // Generate
    var front = method_front({
      rpop : function (key, next) {
        next(undefined, '{ this is not JSON!');
      }
    });

    front('foo', function (error, result) {
      result.should.be.type('string').and.eql('{ this is not JSON!');
    });

  });

});
