"use strict";

(function() {
    if ('undefined' == typeof window.crypto) {
        window.crypto = {};
        window.crypto.getRandomValues = function(arr) {
            for (var i = 0; i < arr.length; i++) {
                /*
                 * TODO: use a better random, maybe can set custom seed or something.
                 *
                 */
                arr[i] = Math.round(Math.random() * 255);
            }
            return arr;
        }
    }
})();
