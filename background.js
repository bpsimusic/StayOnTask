
function getCurrentTabUrl(callback) {
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

document.addEventListener('DOMContentLoaded', function() {

  let form = document.getElementById("website-form")
  form.addEventListener('submit', function(){
  let website = document.getElementById("website-entry").value;
  chrome.storage.sync.set({'website1': website}, function() {
      });
  })
  //the url comes from the tab url
  getCurrentTabUrl(function(url, tabId) {
    chrome.storage.sync.get("website1", function(items){
      for(var key in items) {
        if (url.includes(items[key])){
          let myNewUrl = "http://google.com";
          chrome.tabs.update(tabId, {url: myNewUrl});
          console.log("don't visit me!");
        }
      }
    });
  });
});
