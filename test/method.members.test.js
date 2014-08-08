
'use strict';

// Modules
require('should');

// Subject
var method_members = require('../lib/method.members.js');

describe('.members()', function () {

  it('should call client.smembers() with provided key', function () {

    // Generate
    var set_members = method_members({
      smembers : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    set_members('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var set_members = method_members({
      smembers : function (key, next) {
        called = true;
        next();
      }
    });
    set_members('foo', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var set_members = method_members({
      smembers : function (key, next) {
        next(undefined, 'Members Result');
      }
    });
    set_members('foo', function (error, result) {
      result.should.be.type('string').and.equal('Members Result');
    });

  });

});
