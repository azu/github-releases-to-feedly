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
        callback(null, response.responseHeaders, response.responseText)
    };
    options.onerror = function onerror(response) {
        callback(new Error(response.statusText), response.responseHeaders, response.responseText)
    };
    GM_xmlhttpRequest(options);
};