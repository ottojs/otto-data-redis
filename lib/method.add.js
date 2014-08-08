
'use strict';

// Exports
module.exports = function (client) {
  return function (set, value, next) {
    if (value instanceof Array) {
      value.unshift(set);
      client.sadd(value, next);
    } else {
      client.sadd(set, value, next);
    }
  };
};
