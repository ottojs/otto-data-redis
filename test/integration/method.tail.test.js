
'use strict';

// Modules
require('should');
var sinon      = require('sinon');
var connection = require('../../lib/connection.js')();
var redis      = require('../../lib/index.js');

// Subject
var subject = require('../../lib/method.tail.js')(connection);

describe('.tail()', function () {

  it('should return an empty array when list is empty', function (done) {
    subject('empty', 0, 100, function (error, results) {
      (error === null).should.equal(true);
      results.should.be.instanceof(Array).with.length(0);
      done();
    });
  });

  it('should return an array of appended values when list is not empty', function (done) {

    // Append Values
    redis.append('queue', ['one', 'two', 'three'], function (error, result) {
      (error === null).should.equal(true);
      result.should.be.type('number').and.equal(3);
      // List Values
      subject('queue', 0, 2, function (error, results) {
        (error === null).should.equal(true);
        results.should.be.instanceof(Array).with.length(3);
        results[0].should.be.type('string').and.equal('three');
        results[1].should.be.type('string').and.equal('two');
        results[2].should.be.type('string').and.equal('one');
        redis.delete('queue', done);
      });
    });

  });

  it('should parse JSON values', function (done) {
    // Append Values
    redis.append('queue', ['one', '{"one":"two","embedded":{"object":"here"}}'], function (error, result) {
      (error === null).should.equal(true);
      result.should.be.type('number').and.equal(2);
      subject('queue', 0, 1, function (error, results) {
        (error === null).should.equal(true);
        results.should.be.instanceof(Array).with.length(2);
        results[0].should.be.type('object').and.eql({
          one      : 'two',
          embedded : {
            object : 'here'
          }
        });
        redis.delete('queue', done);
      });
    });
  });

  it('should return an error when something goes wrong', function () {

    // Stub
    sinon.stub(connection, 'lrange', function (key, start, end, next) {
      connection.lrange.restore();
      next(new Error('Some Error'));
    });

    subject('queue', 0, 5, function (error, results) {
      error.should.have.property('name').and.equal('Error');
      error.should.have.property('message').and.equal('Some Error');
    });

  });

});
