
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
        if (url.includes(items[key])){
          let myNewUrl = "/message.html";
          chrome.tabs.update(tabId, {url: myNewUrl});
        }
      }
    });
  });
});
