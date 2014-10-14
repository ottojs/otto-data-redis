
'use strict';

// Modules
require('should');
var connection = require('../../lib/connection.js');
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.save.js')(connection);

describe('.save()', function () {

  it('should successfully save a key/value pair', function (done) {
    subject('otto-test-save', 'save-me', function (error, result) {
      (error === null).should.equal(true);
      result.should.equal('OK');
      redis.delete('otto-test-save', done);
    });
  });

});
