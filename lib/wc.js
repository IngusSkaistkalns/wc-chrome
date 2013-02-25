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

    // Requesting resource
    req.open("GET", "http://wc.makit.lv/?format=text", false);
    req.send(null);
    if (req.status != 200) throw "Response code is not 200";

    // Parse data and process status
    badgeText = req.responseText.trim();
    if (parseInt(badgeText) > 10) status = statuses[0];      // Busy    :(
    else if (parseInt(badgeText) > -1) status = statuses[1]; // Empty   :)
    else status = statuses[2]; badgeText = "?";              // No info ;\

  } catch(error) {
    status = statuses[2];
    badgeText = "?"
  }

  // Set badge text and status icon
  chrome.browserAction.setIcon({path:"images/" + status + ".png"});
  chrome.browserAction.setBadgeText({ text: badgeText });

  setTimeout(update, 1000);
}


// Initial badge text and status icon with calling update()
chrome.browserAction.setBadgeText({ text: badgeText });
chrome.browserAction.setBadgeBackgroundColor({ color: badgeColor });
setTimeout(update, 750);
