
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

});
