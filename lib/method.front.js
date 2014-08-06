
'use strict';

// Exports
module.exports = function (client) {
  return function (list, next) {
    client.lpop(list, next);
  };
};
