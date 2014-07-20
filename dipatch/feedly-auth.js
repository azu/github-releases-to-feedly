"use strict";
// NOT IMPLEMENT
// exec on http://greasemonkey-localhost/
var querystring = require('querystring');
var query = location.query;
var queryParams = querystring.parse(query);
var code = queryParams["code"];
var getToken = require("../lib/feedly-auth/get_token");
getToken(code, function (error, token) {
    console.log(token);
});