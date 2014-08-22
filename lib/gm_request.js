/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
module.exports = function (options, callback) {
    if (!options.data && options.body) {
        options.data = options.body;
    }
    options.onload = function onload(response) {
        if (response.status === 200 || response.status === 201) {
            callback(null, response, response.responseText)
        } else {
            callback(new Error(response.statusText), response, response.responseText)
        }
    };
    options.onerror = function onerror(response) {
        callback(new Error(response.statusText), response, response.responseText)
    };
    GM_xmlhttpRequest(options);
};