
document.addEventListener("DOMContentLoaded", function(){
  let hamburger = document.getElementById("hamburger");
  let closeButton = document.getElementById("closebtn");
  hamburger.addEventListener("click", openNav);
  closeButton.addEventListener("click", closeNav);

  let form = document.getElementById("website-form");
  form.addEventListener('submit', function(){
    let website = document.getElementById("website-entry").value;
    let key = generateKey();
    chrome.storage.sync.set({[key]: website});
  });


  let blockedWebsites = document.getElementById("blocked-websites");
  chrome.storage.sync.get(null, function(items){

    for(var key in items) {
      let item = document.createElement("li");
      let remove = document.createElement("button");
      remove.innerHTML = "remove";
      let buttonKey = remove.createAttribute = ("key");
      buttonKey.value = `${key}`;
      debugger
      remove.addEventListener("click", function(e){
        e.preventDefault();
        debugger
        chrome.storage.sync.remove(this.getAttribute(key));
        this.parentElement.remove();
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
