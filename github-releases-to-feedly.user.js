(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"../lib/subscriber":7}],2:[function(require,module,exports){
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
},{"../lib/subscriber":7}],3:[function(require,module,exports){
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

},{"./dipatch/repogitory":1,"./dipatch/watching":2,"./lib/user-info":8}],4:[function(require,module,exports){
/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
var request = require('./gm_request');
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
},{"./gm_request":5}],5:[function(require,module,exports){
/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
module.exports = function (options, callback) {
    if (!options.data && options.body) {
        options.data = options.body;
    }
    options.onload = function onload(response) {
        callback(null, response.responseHeaders, response.responseText)
    };
    options.onerror = function onerror(response) {
        callback(new Error(response.statusText), response.responseHeaders, response.responseText)
    };
    GM_xmlhttpRequest(options);
};
},{}],6:[function(require,module,exports){
'use strict';
function notifyMessage(message, options, callback) {
    if (Notification && Notification.permission === 'granted') {
        var notification = new Notification(message, options);
        callback(null, notification);
    } else if (Notification.requestPermission) {
        Notification.requestPermission(function (status) {
            if (Notification.permission !== status) {
                Notification.permission = status;
            }
            if (status === 'granted') {
                var notification = new Notification(message, options);
                callback(null, notification);
            } else {
                callback(new Error('user denied'));
            }
        });
    } else {
        callback(new Error('doesn\'t support Notification API'));
    }
}
function notifyMessageAsPromise(message, options) {
    return new Promise(function (resolve, reject) {
        notifyMessage(message, options, function (error, notification) {
            if (error) {
                reject(error);
            } else {
                resolve(notification);
            }
        });
    });
}
module.exports = notifyMessageAsPromise;
},{}],7:[function(require,module,exports){
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
            notifyMessageAsPromise("Error", {
                body: repo,
                icon: "https://github.com/favicon.ico"
            }, function (notification) {
                notification.onshow = function () {
                    setTimeout(n.close, 1000);
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
},{"./feedly-client":4,"./notification":6,"./user-info":8}],8:[function(require,module,exports){
/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
function getUserInfo() {
    var value = GM_getValue("github-releases-to-feedly", "{}")
    return JSON.parse(value);
}
function setUserInfo(string) {
    GM_setValue("github-releases-to-feedly", string);
}
module.exports.getUserInfo = getUserInfo;
module.exports.setUserInfo = setUserInfo;
},{}]},{},[3])