
'use strict';

// Modules
require('should');

// Subject
var method_save = require('../lib/method.save.js');

describe('.save()', function () {

  it('should call client.set() with provided key', function () {

    // Generate
    var save = method_save({
      set : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    save('foo');

  });

  it('should call client.set() with provided value', function () {

    // Generate
    var save = method_save({
      set : function (key, value) {
        value.should.be.type('string').and.equal('bar');
      }
    });
    save('foo', 'bar');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var save = method_save({
      set : function (key, value, next) {
        called = true;
        next();
      }
    });
    save('foo', 'bar', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var save = method_save({
      set : function (key, value, next) {
        next(undefined, 'Client Result');
      }
    });
    save('foo', 'bar', function (error, result) {
      result.should.be.type('string').and.equal('Client Result');
    });

  });

});
