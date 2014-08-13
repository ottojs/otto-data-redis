
'use strict';

// Modules
require('should');
var connection = require('../../lib/connection.js')();
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.delete.js')(connection);

describe('.delete()', function () {

  it('should successfully delete a key/value pair', function (done) {
    redis.save('otto-test-delete', 'delete-me', function (error, result) {
      subject('otto-test-delete', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        redis.delete('otto-test-delete', done);
      });
    });
  });

});
