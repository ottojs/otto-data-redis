
'use strict';

// Return Function
function save (client) {
  return function (key, value, next) {
    client.set(key, value, next);
  };
};

// Exports
module.exports = save;
