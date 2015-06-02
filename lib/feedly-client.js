/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var request = require('./gm_request');
function Feedly(userInfo) {
    if (!userInfo["access_token"] || !userInfo["id"]) {
        alert("You have set userInfo: User script command -> github-releases-to-feedly - Set UserInfo");
    }
    this.userInfo = userInfo;
    this.baseURI = "https://cloud.feedly.com";
}
Feedly.prototype.request = function (parameters, callback) {
    var method = parameters.method;
    var path = parameters.path;
    var form = parameters.form;
    var options = {
        method: method,
        url: this.baseURI + path,
        body: JSON.stringify(form),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "OAuth " + this.userInfo["access_token"]
        }
    };
    request(options, callback);
};
Feedly.prototype.refreshToken = function (callback) {
    var that = this;
    console.log("refresh token:", that.userInfo);
    this.request({
        method: 'POST',
        path: '/v3/auth/token',
        form: {
            refresh_token: that.userInfo["refresh_token"],
            client_id: "feedly",
            client_secret: "0XP4XQ07VVMDWBKUHTJM4WUQ",
            grant_type: "refresh_token"
        }
    }, callback);

};

Feedly.prototype.feedlizeURL = function (url) {
    if (!url.match(/^feed\//)) {
        return "feed/" + url;
    }
    return url;
};
Feedly.prototype.subscribe = function (url, categories, cb) {
    var input = {
        id: this.feedlizeURL(url)
    };
    var userid;
    if (categories != null) {
        if (!Array.isArray(categories)) {
            categories = [categories];
        }
        userid = this.userInfo.id;
        categories = categories.map(function (c) {
            var id, m, name;
            if (typeof c === 'string') {
                m = c.match(/^user\/[^/]+\/(.*)/);
                name = null;
                id = null;
                if (!m) {
                    name = c;
                    id = "user/" + userid + "/category/" + c;
                } else {
                    name = m[1];
                    id = c;
                }
                c = {
                    id: id,
                    name: name
                };
            }
            return c;
        });
        input.categories = categories;
    }
    this.request({
        method: 'POST',
        path: '/v3/subscriptions',
        form: input
    }, cb);
};
module.exports = Feedly;