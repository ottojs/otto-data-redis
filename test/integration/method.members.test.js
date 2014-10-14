
'use strict';

// Modules
require('should');
var connection = require('../../lib/connection.js');
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.members.js')(connection);

describe('.members()', function () {

  it('should list all member values for a set key', function (done) {
    redis.add('otto-test-members', ['one', 'two', 'three'], function (error, result) {
      subject('otto-test-members', function (error, members) {
        (error === null).should.equal(true);
        members.should.containDeep(['one', 'two', 'three']);
        redis.delete('otto-test-members', done);
      });
    });
  });

});
