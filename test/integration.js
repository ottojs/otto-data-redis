
'use strict';

// Modules
require('should');

// Subject
var redis = require('../lib/index.js');

function cleanup (key, done) {
  redis.delete(key, done);
}

describe('Integration', function () {

  describe('.save()', function () {

    it('should successfully save a key/value pair', function (done) {

      redis.save('otto-test-key', 'otto-test-value', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal('OK');
        done();
      });

    });

  });

  describe('.read()', function () {

    it('should successfully read a key/value pair', function (done) {

      redis.read('otto-test-key', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal('otto-test-value');
        done();
      });

    });

  });

  describe('.delete()', function () {

    it('should successfully delete a key/value pair', function (done) {

      redis.delete('otto-test-key', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        done();
      });

    });

  });

  describe('.append()', function () {

    it('should be able to add a value to the right/end of a list', function (done) {
      redis.append('otto-test-list', 'otto-test-value', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        cleanup('otto-test-list', done);
      });
    });

    it('should be able to add multiple values to the right/end of a list', function (done) {
      redis.append('otto-test-list', ['one', 'two', 'three'], function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(3);
        cleanup('otto-test-list', done);
      });
    });

  });

  describe('.front()', function () {

    it('should return null when no elements are in the list', function (done) {
      redis.front('otto-test-list', function (error, result) {
        (error === null).should.equal(true);
        (result === null).should.equal(true);
        cleanup('otto-test-list', done);
      });
    });

    it('should return a list item when the list is not empty', function (done) {
      redis.append('otto-test-list', 'item', function (error, result) {
        redis.front('otto-test-list', function (error, result) {
          (error === null).should.equal(true);
          result.should.equal('item');
          cleanup('otto-test-list', done);
        });
      });
    });

    it('should return the first list item when the list has multiple items', function (done) {
      redis.append('otto-test-list', ['one', 'two', 'three'], function (error, result) {
        redis.front('otto-test-list', function (error, result) {
          (error === null).should.equal(true);
          result.should.equal('one');
          cleanup('otto-test-list', done);
        });
      });
    });

  });

});
