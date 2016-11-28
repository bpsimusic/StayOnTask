
function getTabsUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    for (var i = 0; i < tabs.length; i++) {
      let url = tabs[i].url
      let tabId = tabs[i].id
      callback(url, tabId);
    }

  });

}

//enter something in popup.js, the background should be able to get it because they're all linked.
//want chrome.storage.sync.set to be set in popup.js
chrome.tabs.onUpdated.addListener(function() {
  //the url comes from the tab url
  getTabsUrl(function(url, tabId) {
    //items is a POJO that holds what you previously stored as a website.
    //items[website1] = facebook.com
    chrome.storage.sync.get(null, function(items){
      for(var key in items) {
        if (url.includes(items[key])){
          let myNewUrl = "http://google.com";
          chrome.tabs.update(tabId, {url: myNewUrl});
          alert("Website is blocked!")
        }
      }
    });
  });
});
