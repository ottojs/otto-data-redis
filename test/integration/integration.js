
'use strict';

// Modules
require('should');

// Subject
var redis = require('../../lib/index.js');

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

  describe('.add()', function () {

    it('should successfully add a value to key set', function (done) {
      redis.add('otto-test-add', 'member-value', function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        cleanup('otto-test-add', done);
      });
    });

    it('should be able to add multiple values to the key set', function (done) {
      redis.append('otto-test-add', ['one', 'two', 'three'], function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(3);
        cleanup('otto-test-add', done);
      });
    });

  });

  describe('.remove()', function () {

    it('should successfully remove a value from a set key', function (done) {
      redis.add('otto-test-remove', 'delete-me', function (error, result) {
        redis.remove('otto-test-remove', 'delete-me', function (error, result) {
          (error === null).should.equal(true);
          result.should.equal(1);
          cleanup('otto-test-remove', done);
        });
      });
    });

  });

  describe('.members()', function () {

    it('should list all member values for a set key', function (done) {
      redis.add('otto-test-members', ['one', 'two', 'three'], function (error, result) {
        redis.members('otto-test-members', function (error, members) {
          (error === null).should.equal(true);
          members.should.containDeep(['one', 'two', 'three']);
          cleanup('otto-test-members', done);
        });
      });
    });

  });

  describe('.ismember()', function () {

    it('should return true when value is a member of set', function (done) {
      redis.add('otto-test-ismember', ['one', 'two', 'three'], function (error, result) {
        redis.ismember('otto-test-ismember', 'two', function (error, ismember) {
          (error === null).should.equal(true);
          ismember.should.equal(true);
          cleanup('otto-test-ismember', done);
        });
      });
    });

    it('should return false when value is not a member of set', function (done) {
      redis.add('otto-test-ismember', ['one', 'two', 'three'], function (error, result) {
        redis.ismember('otto-test-ismember', 'five', function (error, ismember) {
          (error === null).should.equal(true);
          ismember.should.equal(false);
          cleanup('otto-test-ismember', done);
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

  describe('Append/Front object', function () {

    it('should be able to append an object and read it back', function (done) {
      redis.append('otto-test-list', {
        some   : 'properties',
        to     : 'convert',
        nested : { properties : 'too' }
      }, function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        redis.front('otto-test-list', function (error, item) {
          (error === null).should.equal(true);
          item.should.be.type('object').and.eql({
            some   : 'properties',
            to     : 'convert',
            nested : { properties : 'too' }
          });
          cleanup('otto-test-list', done);
        });
      });
    });

  });

});