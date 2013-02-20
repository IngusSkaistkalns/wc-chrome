/*
 * Author: Ingus Skaistkalns
 * Date: 20.02.2013
 * Description: Bacground loop for fetching light status
 */

// Global varibales
var status = "no_info";
var badgeText = "?"
var badgeColor = "#1E1D19";
var req = new XMLHttpRequest();

// Main loop function
function update() {
  req.open("GET", "http://wc.makit.lv/?format=text", false);
  req.send();
  badgeText = req.responseText;

  if (parseInt(badgeText) > 10) {
    status = "busy";
  } else {
    status = "empty";
  }

  chrome.browserAction.setIcon({path:"images/" + status + ".png"});
  chrome.browserAction.setBadgeText({ text: badgeText });

  setTimeout(update, 750);
}

// Initial badge text with update call
chrome.browserAction.setBadgeText({ text: badgeText });
chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor });
setTimeout(update, 750);
