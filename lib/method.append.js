
'use strict';

// Exports
module.exports = function (client) {
  return function (key, value, next) {
    client.rpush(key, value, next);
  };
};
