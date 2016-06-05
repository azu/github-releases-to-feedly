/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var subscriber = require("../lib/subscriber");
var gh = require('github-url-to-object');
var Feedly = require("../lib/feedly-client");
var config = require("../lib/user-info");
function onSubscribe() {
    var repoObject = gh(location.href);
    var repo = repoObject.user + "/" + repoObject.repo;
    subscriber.subscribeRepo(repo);
}

// random refresh
function randomExChangeRefreshToken(){
    if(Math.random() < 0.1) {
        return;
    }
    setTimeout(function () {
        refreshToken();
    }, 1000 * 10);
}
function refreshToken() {
    var userInfo = config.getUserInfo();
    if (Object.keys(userInfo).length === 0) {
        return;
    }
    var feedly = new Feedly(userInfo);
    feedly.refreshToken(function (error) {
        if (error) {
            return console.error(error);
        }
        console.log("github-releases-to-feedly: refresh token");
    })
}
module.exports = function () {
    var insertMenu = document.querySelector(".pagehead-actions");
    var button = document.createElement("button");
    button.textContent = "Subscribe";
    button.addEventListener("click", onSubscribe);
    insertMenu.appendChild(button);
    randomExChangeRefreshToken();
};
