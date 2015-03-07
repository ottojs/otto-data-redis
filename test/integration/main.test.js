
'use strict';

// Modules
require('should');

// Subject
var subject = require('../../lib/index.js');

describe('Module', function () {

  it('should have property .client', function () {
    subject.should.have.property('client').and.be.type('object');
  });

  it('should have method .tail()', function () {
    subject.should.have.property('tail').and.be.type('function');
  });

  describe('Save/Read object', function () {

    it('should return an object', function (done) {
      subject.save('otto-test-object', {
        json : 'object',
        with : {
          nested :'values'
        }
      }, function (error, result) {
        subject.read('otto-test-object', function (error, result) {
          (error === null).should.equal(true);
          result.should.eql({
            json : 'object',
            with : {
              nested : 'values'
            }
          });
          subject.delete('otto-test-object', done);
        });
      });
    });

  });

  describe('Append/Front object', function () {

    it('should be able to append an object and read it back', function (done) {
      subject.append('otto-test-list', {
        some   : 'properties',
        to     : 'convert',
        nested : { properties : 'too' }
      }, function (error, result) {
        (error === null).should.equal(true);
        result.should.equal(1);
        subject.front('otto-test-list', function (error, item) {
          (error === null).should.equal(true);
          item.should.be.type('object').and.eql({
            some   : 'properties',
            to     : 'convert',
            nested : { properties : 'too' }
          });
          subject.delete('otto-test-list', done);
        });
      });
    });

  });

});
