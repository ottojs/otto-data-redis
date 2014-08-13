
'use strict';

// Modules
require('should');
var connection = require('../../lib/connection.js')();
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.append.js')(connection);

describe('.append()', function () {

  it('should be able to add a value to the right/end of a list', function (done) {
    subject('otto-test-list', 'otto-test-value', function (error, result) {
      (error === null).should.equal(true);
      result.should.equal(1);
      redis.delete('otto-test-list', done);
    });
  });

  it('should be able to add multiple values to the right/end of a list', function (done) {
    subject('otto-test-list', ['one', 'two', {
      my : 'object',
      embedded : {
        values : 'too'
      }
    }], function (error, result) {
      (error === null).should.equal(true);
      result.should.equal(3);
      redis.delete('otto-test-list', done);
    });
  });

});
