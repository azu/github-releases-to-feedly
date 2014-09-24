/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var Feedly = require("./feedly-client");
var notifyMessageAsPromise = require("./notification");
var config = require("./user-info");
var categories = ["Github"];
function subscribeRepo(repo) {
    var userInfo = config.getUserInfo();
    var feedly = new Feedly(userInfo);
    var url = "https://github.com/" + repo + "/releases.atom";
    feedly.subscribe(url, categories, function (error, res, body) {
        if (error) {
            feedly.refreshToken(function (refreshError, response, body) {
                config.setUserInfo(body);
                console.log("retry", body);
                subscribeRepo(repo);
            });
            console.error(JSON.parse(body));
            notifyMessageAsPromise("Error", {
                body: repo,
                icon: "https://github.com/favicon.ico"
            }, function (notification) {
                notification.onshow = function () {
                    setTimeout(notification.close, 1000);
                }
            });
            return;
        }
        notifyMessageAsPromise("Subscribe", {
            body: repo,
            icon: "https://github.com/favicon.ico"
        }, function (notification) {
            notification.onshow = function () {
                setTimeout(n.close, 1000);
            }
        });
    });
}
module.exports.subscribeRepo = subscribeRepo;