
'use strict';

// Modules
require('should');
var sinon      = require('sinon');
var connection = require('../../lib/connection.js')();
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.read.js')(connection);

describe('.read()', function () {

  it('should return null when key does not exist', function (done) {
    subject('empty', function (error, value) {
      (error === null).should.equal(true);
      (value === null).should.equal(true);
      done();
    });
  });

  it('should successfully read a key/value pair', function (done) {
    redis.save('otto-test-read', 'read-me', function (error, result) {
      redis.read('otto-test-read', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal('read-me');
        redis.delete('otto-test-read', done);
      });
    });
  });

  it('should return an error when something goes wrong', function () {

    // Stub
    sinon.stub(connection, 'get', function (key, next) {
      connection.get.restore();
      next(new Error('Some Error'));
    });

    subject('error', function (error, value) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });

  });

});
