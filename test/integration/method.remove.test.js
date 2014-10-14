
'use strict';

// Modules
require('should');
var connection = require('../../lib/connection.js');
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.remove.js')(connection);

describe('.remove()', function () {

  it('should successfully remove a value from a set key', function (done) {
    redis.add('otto-test-remove', 'delete-me', function (error, result) {
      subject('otto-test-remove', 'delete-me', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        redis.delete('otto-test-remove', done);
      });
    });
  });

});
