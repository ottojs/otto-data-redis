
'use strict';

// Modules
require('should');
var connection = require('../../lib/connection.js');
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.add.js')(connection);

describe('.add()', function () {

  it('should successfully add a value to key set', function (done) {
    subject('otto-test-add', 'member-value', function (error, result) {
      (error === null).should.equal(true);
      result.should.equal(1);
      redis.delete('otto-test-add', done);
    });
  });

  it('should be able to add multiple values to the key set', function (done) {
    subject('otto-test-add', ['one', 'two', 'three'], function (error, result) {
      (error === null).should.equal(true);
      result.should.equal(3);
      redis.delete('otto-test-add', done);
    });
  });

});
