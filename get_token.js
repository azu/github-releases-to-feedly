/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";

var qs = require('querystring');
var request = require("request");
var code = process.argv[2];

var params = {
    "client_id": "feedly",
    "client_secret": "0XP4XQ07VVMDWBKUHTJM4WUQ",
    "grant_type": "authorization_code",
    "redirect_uri": "http://www.feedly.com/feedly.html",
    "code": code
}
var options = {
    url: 'https://cloud.feedly.com/v3/auth/token?' + qs.stringify(params),
    method: 'POST',
    headers: {
        'User-Agent': 'request'
    }
};

var req = request.post('https://cloud.feedly.com/v3/auth/token', {form: params}, function (error, header, body) {
    var response = JSON.parse(body);
    console.log(body);
//    console.log("id: " + response["id"]);
//    console.log("access_token:" + response["access_token"]);
});


req.on('error', function (e) {
    console.log('problem with request: ' + e.message);
});
