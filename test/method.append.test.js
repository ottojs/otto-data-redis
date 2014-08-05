
'use strict';

// Modules
require('should');

// Subject
var method_append = require('../lib/method.append.js');

describe('.append()', function () {

  it('should call client.rpush() with provided key', function () {

    // Generate
    var append = method_append({
      rpush : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    append('foo');

  });

  it('should call client.rpush() with provided value', function () {

    // Generate
    var append = method_append({
      rpush : function (key, value) {
        value.should.be.type('string').and.equal('bar');
      }
    });
    append('foo', 'bar');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var append = method_append({
      rpush : function (key, value, next) {
        called = true;
        next();
      }
    });
    append('foo', 'bar', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var append = method_append({
      rpush : function (key, value, next) {
        next(undefined, 'Append Result');
      }
    });
    append('foo', 'bar', function (error, result) {
      result.should.be.type('string').and.equal('Append Result');
    });

  });

});
