
'use strict';

// Client
var client = require('./connection.js');

// Exports
module.exports = {
  save     : require('./method.save.js')     (client),
  read     : require('./method.read.js')     (client),
  delete   : require('./method.delete.js')   (client),
  add      : require('./method.add.js')      (client),
  remove   : require('./method.remove.js')   (client),
  members  : require('./method.members.js')  (client),
  ismember : require('./method.ismember.js') (client),
  append   : require('./method.append.js')   (client),
  front    : require('./method.front.js')    (client),
  tail     : require('./method.tail.js')     (client),
  ttl      : require('./method.ttl.js')      (client)
};
