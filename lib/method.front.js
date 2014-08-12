
'use strict';

// Exports
module.exports = function (client) {
  return function (list, next) {

    // Grab Key
    client.rpop(list, function (error, value) {

      if (error) { return next(error); }

      // Process
      if (value) {

        // Potential JSON
        if (value.substring(0, 1) === '{') {
          // Attempt to Parse
          try {
            value = JSON.parse(value);
          } catch (error) {
            // Parse Failed
          }
        }

      }

      // Return
      next(error, value);

    });

  };
};
