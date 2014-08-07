
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

  it('should leave value of type string untouched', function () {

    // Generate
    var save = method_save({
      set : function (key, value, next) { next(undefined, value); }
    });

    save('string', 'im-a-string!', function (error, value) {
      value.should.be.type('string').and.equal('im-a-string!');
    });

  });

  it('should convert value of type object to JSON string', function () {

    // Generate
    var save = method_save({
      set : function (key, value, next) { next(undefined, value); }
    });
    save('object', {
      some   : 'properties',
      to     : 'convert',
      nested : { properties : 'too' }
    }, function (error, value) {
      value.should.be.type('string').and.equal('{"some":"properties","to":"convert","nested":{"properties":"too"}}');
    });

  });

});
