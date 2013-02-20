var current;
var light;
var req = new XMLHttpRequest();

function updateIcon() {
  req.open("GET", "http://wc.makit.lv/", false);
  req.send();

  light = req.responseText.match('id="light">([0-9]+)<')[1];

  if (parseInt(light) > 10) {
    current = "busy";
  } else {
    current = "ok";
  }

  chrome.browserAction.setIcon({path:"icon_" + current + ".png"});
  chrome.browserAction.setBadgeText({text: light});

  light = null;
}

setInterval(updateIcon, 1000);
