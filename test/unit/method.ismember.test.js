
'use strict';

// Modules
require('should');

// Subject
var method_ismember = require('../../lib/method.ismember.js');

describe('.ismember()', function () {

  it('should call client.sismember() with provided key', function () {

    // Generate
    var ismember = method_ismember({
      sismember : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    ismember('foo');

  });

  it('should call client.sismember() with provided value', function () {

    // Generate
    var ismember = method_ismember({
      sismember : function (key, value) {
        value.should.be.type('string').and.equal('bar');
      }
    });
    ismember('foo', 'bar');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var ismember = method_ismember({
      sismember : function (key, value, next) {
        called = true;
        next();
      }
    });
    ismember('foo', 'bar', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var ismember = method_ismember({
      sismember : function (key, value, next) {
        next(undefined, 0);
      }
    });
    ismember('foo', 'bar', function (error, result) {
      result.should.be.type('boolean').and.equal(false);
    });

  });

  it('should return an error when something goes wrong', function () {

    // Generate
    var ismember = method_ismember({
      sismember : function (key, value, next) {
        next(new Error('Some Error'));
      }
    });
    ismember('foo', 'bar', function (error, result) {
      error.should.have.property('message').and.equal('Some Error');
    });

  });

  it('should return true when value is a member', function () {

    // Generate
    var ismember = method_ismember({
      sismember : function (key, value, next) {
        next(undefined, 1);
      }
    });
    ismember('foo', 'bar', function (error, result) {
      result.should.be.type('boolean').and.equal(true);
    });

  });

  it('should return false when value is not a member', function () {

    // Generate
    var ismember = method_ismember({
      sismember : function (key, value, next) {
        next(undefined, 0);
      }
    });
    ismember('foo', 'bar', function (error, result) {
      result.should.be.type('boolean').and.equal(false);
    });

  });

});
