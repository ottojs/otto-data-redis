
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/connection.js');

describe('Redis Connection', function () {

  it('should return a Redis Client object', function () {
    subject.should.have.property('set').and.be.type('function');
    subject.should.have.property('get').and.be.type('function');
  });

});
