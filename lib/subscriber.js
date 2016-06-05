/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var IFTTT = require("./IFTTT-client");
var notifyMessageAsPromise = require("./notification");
var config = require("./user-info");
function subscribeRepo(repo) {
    var userInfo = config.getUserInfo();
    var url = "https://github.com/" + repo + "/releases.atom";
    var ifttt = new IFTTT(userInfo);
    ifttt.subscribe(url, function (error, res, body) {
        if (error) {
            console.error("Error feedly.subscribe: ", JSON.parse(body));
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