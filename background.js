

chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(
    null, {file: "toggleNavBar.js"}
  );
});

function getTabsUrl(callback) {
  var queryInfo = {
    currentWindow: true
  };
  chrome.tabs.query(queryInfo, function(tabs) {
    for (var i = 0; i < tabs.length; i++) {
      let url = tabs[i].url
      let tabId = tabs[i].id
      callback(url, tabId);
    }
  });
}

chrome.tabs.onUpdated.addListener(function() {
  getTabsUrl(function(url, tabId) {
    chrome.storage.sync.get(null, function(items){
      for(var key in items) {
        let websiteName = items[key].slice(4);
        //safeguards
        if (url.includes(websiteName) && url.length > 0 && websiteName.length > 0){
          let myNewUrl = "/message.html";
          debugger
          chrome.tabs.update(tabId, {url: myNewUrl});
        }
      }
    });
  });
});
