/*
 * Author: Ingus Skaistkalns
 * Date: 20.02.2013
 * Description: Bacground loop for fetching light status
 */

// Varibales and default values
var statuses = ["busy", "empty", "no_info"];
var status = "no_info";
var badgeText = "?"
var badgeColor = "#1E1D19";
var req = new XMLHttpRequest();


// Main loop function
function update() {
  try {
    req.open("GET", "http://wc.makit.lv/?format=text", false);
    req.send(null);
    badgeText = req.responseText;
    status = parseInt(badgeText) > 10 ? statuses[0] : statuses[1];
  } catch(err) {
    status = statuses[2];
    badgeText = "?"
  }

  chrome.browserAction.setIcon({path:"images/" + status + ".png"});
  chrome.browserAction.setBadgeText({ text: badgeText });

  setTimeout(update, 100);
}


// Initial badge text with update call
chrome.browserAction.setBadgeText({ text: badgeText });
chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor });
setTimeout(update, 750);
