
'use strict';

// Exports
module.exports = function (client) {
  return function (set, member, next) {
    client.sismember(set, member, function (error, result) {

      if (error) { return next(error); }

      if (result === 1) {
        result = true;
      } else {
        result = false;
      }

      next(null, result);

    });
  };
};
