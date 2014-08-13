
'use strict';

// Exports
module.exports = function (client) {
  return function (key, start, end, next) {

    // Grab Key
    client.lrange(key, start, end, function (error, values) {

      if (error) { return next(error); }

      // Process
      for (var i = 0; i < values.length; i++) {

        // Potential JSON
        if (values[i].substring(0, 1) === '{') {
          // Attempt to Parse
          try {
            values[i] = JSON.parse(values[i]);
          } catch (error) {
            // Parse Failed
          }
        }

      }

      // Return
      next(error, values);

    });

  };
};
