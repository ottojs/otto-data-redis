
'use strict';

// Modules
require('should');

// Subject
var redis = require('../lib/index.js');

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

    it('should successfully add a value to the right/end of a list', function (done) {

      redis.append('otto-test-list', 'otto-test-value', function (error, result) {
        (error === null).should.equal(true);
        // Re-enable when we remove from list
        //result.should.equal(1);
        done();
      });

    });

  });

});
