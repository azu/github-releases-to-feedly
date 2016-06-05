/**
 * Created by azu on 2014/06/08.
 * LICENSE : MIT
 */
"use strict";
function getUserInfo() {
    var value = GM_getValue("github-releases-to-feedly", "");
    return value;
}
/**
 * please save

 https://maker.ifttt.com/trigger/{event}/with/key/xxxx url
 { value1: "rss url" }
 * @param string
 */
function setUserInfo(string) {
    GM_setValue("github-releases-to-feedly", string);
}
module.exports.getUserInfo = getUserInfo;
module.exports.setUserInfo = setUserInfo;