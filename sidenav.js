




document.addEventListener("DOMContentLoaded", function(){

  let hamburger = document.getElementById("hamburger");
  let closeButton = document.getElementById("closebtn");
  hamburger.addEventListener("click", openNav);
  closeButton.addEventListener("click", closeNav);

  let form = document.getElementById("website-form");
  form.addEventListener('submit', function(e){
    e.preventDefault();
    let website = document.getElementById("website-entry").value;
    let key = generateKey();
    chrome.storage.sync.set({[key]: website});
    form.reset();
  });
  //creating the api
  let blockedWebsites = document.getElementById("blocked-websites");
  chrome.storage.sync.get(null, function(items){
    for(let key in items) {
      let item = document.createElement("li");
      let remove = document.createElement("button");
      remove.innerHTML = "remove";
      remove.setAttribute("key", key);
      remove.addEventListener("click", function(e){
        chrome.storage.sync.remove(this.getAttribute("key"));
        let that = this.parentElement
        blockedWebsites.removeChild(that);
      });
      item.appendChild(document.createTextNode(items[key]));
      item.appendChild(remove);
      blockedWebsites.appendChild(item);
    }
  });
})

function openNav() {
    document.getElementById("mySideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}

//submit urls section
function generateKey() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

//adds a new website on the fly
chrome.storage.onChanged.addListener(function(changes, namespace){
  for(let key in changes){
    if (changes[key]["newValue"] === undefined){
      break;
    }
    let blockedWebsites = document.getElementById("blocked-websites");
    let item = document.createElement("li");
    let remove = document.createElement("button");
    remove.innerHTML = "remove";
    remove.setAttribute("key", key);
    remove.addEventListener("click", function(e){
      chrome.storage.sync.remove(this.getAttribute("key"));
      blockedWebsites.removeChild(this.parentElement);
    });
    item.appendChild(document.createTextNode(changes[key]["newValue"]));
    item.appendChild(remove);
    blockedWebsites.appendChild(item);
  }
})
