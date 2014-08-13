
'use strict';

// Modules
require('should');

// Subject
var method_delete = require('../../lib/method.delete.js');

describe('.delete()', function () {

  it('should call client.del() with provided key', function () {

    // Generate
    var delete_key = method_delete({
      del : function (key) {
        key.should.be.type('string').and.equal('foo');
      }
    });
    delete_key('foo');

  });

  it('should call the callback if provided', function () {

    var called = false;

    // Generate
    var delete_key = method_delete({
      del : function (key, next) {
        called = true;
        next();
      }
    });
    delete_key('foo', function () {
      called.should.equal(true);
    });

  });

  it('should pass response to callback', function () {

    // Generate
    var delete_key = method_delete({
      del : function (key, next) {
        next(undefined, 'Delete Result');
      }
    });
    delete_key('foo', function (error, result) {
      result.should.be.type('string').and.equal('Delete Result');
    });

  });

});
