
'use strict';

// Exports
module.exports = function (client) {
  return function (key, value, next) {

    if (value instanceof Array) {

      for (var i = 0; i < value.length; i++) {
        // Convert objects to JSON
        if (typeof value[i] === 'object') {
          value[i] = JSON.stringify(value[i]);
        }
      }

      value.unshift(key);

      client.lpush(value, next);

    } else {

      // Convert objects to JSON
      if (typeof value === 'object') {
        value = JSON.stringify(value);
      }

      client.lpush(key, value, next);

    }

  };
};
