
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/index.js');

describe('Module', function () {

  it('should have method .tail()', function () {
    subject.should.have.property('tail').and.be.type('function');
  });

});
