/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var request = require('./node-request');
function Feedly(userInfo) {
    if(!userInfo["access_token"] ||!userInfo["id"] ) {
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
            Authorization: "OAuth " + this.userInfo["access_token"]
        }
    };
    request(options, callback);
};
Feedly.prototype.feedlizeURL = function (url) {
    if (!url.match(/^feed\//)) {
        return "feed/" + url;
    }
    return url;
}
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
}
module.exports = Feedly;