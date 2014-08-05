
'use strict';

// Return Function
function read (client) {
  return function (key, next) {
    client.get(key, next);
  };
}

// Exports
module.exports = read;
