
'use strict';

// Exports
module.exports = function (client) {
  return function (key, next) {
    client.del(key, next);
  };
};
