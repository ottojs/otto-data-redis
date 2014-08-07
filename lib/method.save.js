
'use strict';

// Return Function
function save (client) {
  return function (key, value, next) {

    // Convert objects to JSON
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    // Save
    client.set(key, value, next);

  };
}

// Exports
module.exports = save;
