
'use strict';

// Exports
module.exports = function (client) {
  return function (list, next) {
    client.rpop(list, next);
  };
};
