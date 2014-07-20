console.log(location);
// ==UserScript==
// @name        Subscribe Github Releases
// @namespace   http://efcl.info/
// @description subscribed by feedly
// @license     MIT
// @include     https://github.com/*/*
// @include     https://github.com/watching
// @version     1
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// @grant GM_xmlhttpRequest
// ==/UserScript==
"use strict";
var config = require("./lib/user-info");
GM_registerMenuCommand("github-releases-to-feedly - Set UserInfo", function () {
    var result = window.prompt("Set Feedly user info : json");
    config.setUserInfo(result);
});
if (location.href === "https://github.com/watching") {
    require("./dipatch/watching")();
} else {
    require("./dipatch/repogitory")();
}
