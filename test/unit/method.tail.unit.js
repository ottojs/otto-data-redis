
'use strict';

// Modules
require('should');

// Subject
var method_tail = require('../../lib/method.tail.js');

describe('.tail()', function () {

  it('should call client.lrange() with provided key', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    tail('foo');

  });

  it('should call client.lrange() with provided start', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end) {
        start.should.be.type('number').and.equal(0);
      }
    });
    tail('foo', 0);

  });

  it('should call client.lrange() with provided end', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end) {
        end.should.be.type('number').and.equal(20);
      }
    });
    tail('foo', 5, 20);

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end, next) {
        called = true;
        next(undefined, []);
      }
    });
    tail('foo', 5, 20, function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end, next) {
        next(undefined, ['one', 'two', 'three']);
      }
    });
    tail('foo', 5, 20, function (error, results) {
      results.should.be.instanceof(Array).with.length(3);
      results[0].should.be.type('string').and.equal('one');
      results[1].should.be.type('string').and.equal('two');
      results[2].should.be.type('string').and.equal('three');
    });

  });

  it('should leave string values untouched', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end, next) {
        next(undefined, ['one']);
      }
    });
    tail('foo', 5, 2, function (error, results) {
      results.should.be.instanceof(Array).with.length(1);
      results[0].should.be.type('string').and.equal('one');
    });

  });

  it('should convert JSON values to objects', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end, next) {
        next(undefined, ['{"one":"two","embedded":{"object":"here"}}']);
      }
    });
    tail('foo', 5, 2, function (error, results) {
      results.should.be.instanceof(Array).with.length(1);
      results[0].should.be.type('object').and.eql({
        one : 'two',
        embedded : {
          object : 'here'
        }
      });
    });

  });

  it('should use raw string when JSON parsing fails', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end, next) {
        next(undefined, ['{ This is not JSON!']);
      }
    });
    tail('foo', 5, 2, function (error, results) {
      results.should.be.instanceof(Array).with.length(1);
      results[0].should.be.type('string').and.equal('{ This is not JSON!');
    });

  });

  it('should handle errors gracefully', function () {

    // Generate
    var tail = method_tail({
      lrange : function (key, start, end, next) {
        next(new Error('Some Error'));
      }
    });
    tail('foo', 5, 2, function (error, results) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });

  });

});
