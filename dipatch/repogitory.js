/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var subscriber = require("../lib/subscriber");
function onSubscribe() {
    var repo = document.getElementsByName("nwo")[0].value;
    subscriber.subscribeRepo(repo);
}

module.exports = function () {
    var insertMenu = document.querySelector(".pagehead-actions");
    var button = document.createElement("button");
    button.textContent = "Subscribe";
    button.addEventListener("click", onSubscribe);
    insertMenu.appendChild(button);
}