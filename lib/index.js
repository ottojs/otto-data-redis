
'use strict';

// Modules
var connection    = require('./connection.js');
var method_save   = require('./method.save.js');
var method_read   = require('./method.read.js');
var method_delete = require('./method.delete.js');
var method_append = require('./method.append.js');

// Client
var client = connection();

// Exports
module.exports = {
  save   : method_save(client),
  read   : method_read(client),
  delete : method_delete(client),
  append : method_append(client)
};
