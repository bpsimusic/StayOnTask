
function generateKey() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

document.addEventListener("DOMContentLoaded", function(){
  let form = document.getElementById("website-form");
  form.addEventListener('submit', function(){
    let website = document.getElementById("website-entry").value;
    let key = generateKey();
    chrome.storage.sync.set({[key]: website});
  });
})
