
'use strict';

// Modules
var should     = require('should');
var connection = require('../../lib/connection.js');
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.save.js')(connection);

describe('.save()', function () {

  afterEach(function (done) {
    redis.delete('otto-test-save', done);
  });

  it('should successfully save a key/value pair without expiration', function (done) {
    subject('otto-test-save', 'save-me', function (error, result) {
      should.not.exist(error);
      result.should.equal('OK');

      // Check TTL
      redis.ttl('otto-test-save', function (error, ttl) {
        should.not.exist(error);
        ttl.should.equal(-1);
        done();
      });

    });
  });

  it('should successfully save a key/value pair with expiration', function (done) {
    subject('otto-test-save', 'save-me', 5050, function (error, result) {
      should.not.exist(error);
      result.should.equal('OK');

      // Check TTL
      redis.ttl('otto-test-save', function (error, ttl) {
        should.not.exist(error);
        ttl.should.be.above(5000).and.be.below(5100);
        done();
      });

    });
  });

});
