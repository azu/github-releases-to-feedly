/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";

module.exports = (function (options, callback) {
    if (typeof GM_xmlhttpRequest !== "undefined") {
        return require("./gm_request");
    }else{
        return require("request")
    }
})()