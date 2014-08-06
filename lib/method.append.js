
'use strict';

// Exports
module.exports = function (client) {
  return function (key, value, next) {
    if (value instanceof Array) {
      value.unshift(key);
      client.rpush(value, next);
    } else {
      client.rpush(key, value, next);
    }
  };
};
