
'use strict';

// Modules
require('should');

// Subject
var method_append = require('../lib/method.append.js');

describe('.append()', function () {

  it('should call client.lpush() with provided key', function () {

    // Generate
    var append = method_append({
      lpush : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    append('foo');

  });

  it('should call client.lpush() with provided value', function () {

    // Generate
    var append = method_append({
      lpush : function (key, value) {
        value.should.be.type('string').and.equal('bar');
      }
    });
    append('foo', 'bar');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var append = method_append({
      lpush : function (key, value, next) {
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
      lpush : function (key, value, next) {
        next(undefined, 'Append Result');
      }
    });
    append('foo', 'bar', function (error, result) {
      result.should.be.type('string').and.equal('Append Result');
    });

  });

  it('should leave value of type string untouched', function () {

    // Generate
    var append = method_append({
      lpush : function (key, value, next) {
        next(undefined, value);
      }
    });

    append('string', 'im-a-string!', function (error, value) {
      value.should.be.type('string').and.equal('im-a-string!');
    });

  });

  it('should convert value of type object to JSON string', function () {

    // Generate
    var append = method_append({
      lpush : function (key, value, next) {
        next(undefined, value);
      }
    });

    append('object', {
      some   : 'properties',
      to     : 'convert',
      nested : { properties : 'too' }
    }, function (error, value) {
      value.should.be.type('string').and.equal('{"some":"properties","to":"convert","nested":{"properties":"too"}}');
    });

  });

  it('should convert multiple values of type object to JSON strings', function () {

    // Generate
    var append = method_append({
      // This signature is funky, but it's
      // how the underlying library works
      lpush : function (value, next) {
        next(undefined, value);
      }
    });

    append('object', [
      {
        some   : 'properties',
        to     : 'convert',
        nested : { properties : 'too' }
      },
      {
        one   : 'two',
        three : 'four'
      }
    ], function (error, value) {
      value.should.be.instanceof(Array).with.length(3);
      value[0].should.be.type('string').and.equal('object');
      value[1].should.be.type('string').and.equal('{"some":"properties","to":"convert","nested":{"properties":"too"}}');
      value[2].should.be.type('string').and.equal('{"one":"two","three":"four"}');
    });

  });

});
