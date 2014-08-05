
'use strict';

// Modules
var connection  = require('./connection.js');
var method_save = require('./method.save.js');

// Client
var client = connection();

// Exports
module.exports = {
  save : method_save(client)
};
