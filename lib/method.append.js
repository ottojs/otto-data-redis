
'use strict';

// Exports
module.exports = function (client) {
  return function (key, value, next) {
    if (value instanceof Array) {
      value.unshift(key);
      client.lpush(value, next);
    } else {
      client.lpush(key, value, next);
    }
  };
};
