
'use strict';

// Modules
require('should');
var sinon      = require('sinon');
var connection = require('../../lib/connection.js');
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.ismember.js')(connection);

describe('.ismember()', function () {

  it('should return true when value is a member of set', function (done) {
    redis.add('otto-test-ismember', ['one', 'two', 'three'], function (error, result) {
      subject('otto-test-ismember', 'two', function (error, ismember) {
        (error === null).should.equal(true);
        ismember.should.equal(true);
        redis.delete('otto-test-ismember', done);
      });
    });
  });

  it('should return false when value is not a member of set', function (done) {
    redis.add('otto-test-ismember', ['one', 'two', 'three'], function (error, result) {
      subject('otto-test-ismember', 'five', function (error, ismember) {
        (error === null).should.equal(true);
        ismember.should.equal(false);
        redis.delete('otto-test-ismember', done);
      });
    });
  });

  it('should return an error when something goes wrong', function () {

    // Stub
    sinon.stub(connection, 'sismember', function (set, value, next) {
      connection.sismember.restore();
      next(new Error('Some Error'));
    });

    subject('group', 'member', function (error, ismember) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });

  });

});
