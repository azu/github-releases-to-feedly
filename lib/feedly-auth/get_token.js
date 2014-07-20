"use strict";

var qs = require('querystring');
var request = require("../gm_request");
/**
 *
 * @param code ?code=XXX&state=
 * @param callback
 */
function getToken(code, callback) {
    var params = {
        "client_id": "feedly",
        "client_secret": "0XP4XQ07VVMDWBKUHTJM4WUQ",
        "grant_type": "authorization_code",
        "redirect_uri": "http://www.feedly.com/feedly.html",
        "code": code
    };
    var options = {
        url: 'https://cloud.feedly.com/v3/auth/token?' + qs.stringify(params),
        method: 'POST',
        headers: {
            'User-Agent': 'request'
        }
    };

    request('https://cloud.feedly.com/v3/auth/token', function (error, header, body) {
        if (error) {
            return callback(error);
        }
        var response = JSON.parse(body);
        callback(null, response);
    });
}
module.exports = getToken;