
'use strict';

// Exports
module.exports = function (client) {
  return function (set, next) {
    client.smembers(set, next);
  };
};
