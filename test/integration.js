
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
      redis.save('otto-test-save', 'save-me', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal('OK');
        cleanup('otto-test-save', done);
      });
    });

  });

  describe('.read()', function () {

    it('should successfully read a key/value pair', function (done) {
      redis.save('otto-test-read', 'read-me', function (error, result) {
        redis.read('otto-test-read', function (error, result) {
          (error === null).should.equal(true);
          result.should.equal('read-me');
          cleanup('otto-test-read', done);
        });
      });

    });

  });

  describe('.delete()', function () {

    it('should successfully delete a key/value pair', function (done) {
      redis.save('otto-test-delete', 'delete-me', function (error, result) {
        redis.delete('otto-test-delete', function (error, result) {
          (error === null).should.equal(true);
          result.should.equal(1);
          cleanup('otto-test-delete', done);
        });
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

  describe('Save/Read object', function () {

    it('should return an object', function (done) {
      redis.save('otto-test-object', {
        json : 'object',
        with : {
          nested :'values'
        }
      }, function (error, result) {
        redis.read('otto-test-object', function (error, result) {
          (error === null).should.equal(true);
          result.should.eql({
            json : 'object',
            with : {
              nested : 'values'
            }
          });
          cleanup('otto-test-object', done);
        });
      });
    });

  });

});
