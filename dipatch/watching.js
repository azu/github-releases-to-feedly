/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var subscriber = require("../lib/subscriber");
var watching = function watching() {
    var repos = document.querySelectorAll(".repo-name");
    var repoRegx = /^https:\/\/github.com\/(.*?)$/;
    var getRepo = function (a) {
        var match = a.href.match(repoRegx);
        return match && match[1];
    }
    var subscribe = function (repo) {
        subscriber.subscribeRepo(repo);
    }
    var createSubscribeButton = function (repo) {
        var button = document.createElement("button");
        button.textContent = "Subscribe";
        button.addEventListener("click", function onSubscribe() {
            subscribe(repo);
        });
        return button;
    }
    Array.prototype.slice.call(repos).forEach(function (ele) {
        var repo = getRepo(ele);
        var button = createSubscribeButton(repo);
        var parentNode = ele.parentNode;
        parentNode.insertBefore(button, parentNode.firstChild);
    });
};
module.exports = watching