
'use strict';

// Modules
require('should');

// Subject
var redis_connection = require('../../lib/connection.js');

describe('Redis Connection', function () {

  it('should return a Redis Client object', function () {
    var result = redis_connection();
    result.should.have.property('set').and.be.type('function');
    result.should.have.property('get').and.be.type('function');
  });

});
