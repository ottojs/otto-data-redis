
'use strict';

// Modules
require('should');
var sinon      = require('sinon');
var connection = require('../../lib/connection.js')();
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.front.js')(connection);

describe('.front()', function () {

  it('should return null when no elements are in the list', function (done) {
    subject('otto-test-list', function (error, result) {
      (error === null).should.equal(true);
      (result === null).should.equal(true);
      redis.delete('otto-test-list', done);
    });
  });

  it('should return a list item when the list is not empty', function (done) {
    redis.append('otto-test-list', 'item', function (error, result) {
      subject('otto-test-list', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal('item');
        redis.delete('otto-test-list', done);
      });
    });
  });

  it('should return the first list item when the list has multiple items', function (done) {
    redis.append('otto-test-list', ['one', 'two', 'three'], function (error, result) {
      subject('otto-test-list', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal('one');
        redis.delete('otto-test-list', done);
      });
    });
  });

  it('should return an error when something goes wrong', function () {

    // Stub
    sinon.stub(connection, 'rpop', function (list, next) {
      connection.rpop.restore();
      next(new Error('Some Error'));
    });

    subject('list', function (error, result) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });

  });

});
