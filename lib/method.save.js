
'use strict';

// Return Function
function save (client) {
  return function (key, value, ttl, next) {

    // Handle without Expiration
    var expires = true;
    if (!next) {
      expires = false;
      next    = ttl;
    }

    // Convert objects to JSON
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }

    // Save
    if (expires) {
      client.setex(key, ttl, value, next);
    } else {
      client.set(key, value, next);
    }

  };
}

// Exports
module.exports = save;
