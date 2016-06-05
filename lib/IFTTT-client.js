// LICENSE : MIT
"use strict";
var request = require('./gm_request');
function IFTTTClient(userInfo) {
    this.baseURI = userInfo;
}
IFTTTClient.prototype.subscribe = function (url, callback) {
    var data = {"value1": url};
    var options = {
        method: "POST",
        url: this.baseURI,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
    request(options, callback);
};
module.exports = IFTTTClient;