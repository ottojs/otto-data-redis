
'use strict';

// Return Function
function read (client) {
  return function (key, next) {

    // Grab Key
    client.get(key, function (error, value) {

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
}

// Exports
module.exports = read;
