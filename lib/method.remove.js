
'use strict';

// Exports
module.exports = function (client) {
  return function (set, value, next) {
    client.srem(set, value, next);
  };
};
