function openNav() {
    document.getElementById("mySideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

  //submit urls section
function generateURLKey() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}

function generateTaskKey() {
    return (("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4) +
    ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4));
}

function generateTimerID() {
    return (("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4) +
    ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4) +
  ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4));
}

let timeLimit;
$.get(chrome.extension.getURL('/sidenav.html'), function(data) {
    $($.parseHTML(data)).appendTo('body');
    let arrow = document.getElementById("arrow");
    let closeButton = document.getElementById("closebtn");
    arrow.addEventListener("click", openNav);
    closeButton.addEventListener("click", closeNav);
    //form to create a task
    let formTask = document.getElementById("task-form");
    formTask.addEventListener('submit', function(e){
      e.preventDefault();
      let task = document.getElementById("task-name").value;
      timeLimit = document.getElementById("time-limit").value;
      let key = generateTaskKey();
      chrome.storage.sync.set({[key]: task});
      formTask.reset();
    });
    //form to create a blocked website.
    let formURL = document.getElementById("website-form");
    formURL.addEventListener('submit', function(e){
      e.preventDefault();
      let website = document.getElementById("website-entry").value;
      let key = generateURLKey();
      chrome.storage.sync.set({[key]: website});
      formURL.reset();
    });

    //creating the api
    let blockedWebsites = document.getElementById("blocked-websites");
    let listOfTasks = document.getElementById("task-list");
    chrome.storage.sync.get(null, function(items){
    //shows the list of websites
      for(let key in items) {
        if (key.length === 4){
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
          //show the list of tasks
        } else if (key.length === 8) {
            let item = document.createElement("li");
            let remove = document.createElement("button");
            remove.innerHTML = "remove";
            remove.setAttribute("key", key);
            remove.addEventListener("click", function(e){
              chrome.storage.sync.remove(this.getAttribute("key"));
              let that = this.parentElement
              listOfTasks.removeChild(that);
            });
            item.appendChild(document.createTextNode(items[key][0]));
            let clock = items[key][1];

            let timer = document.createElement("p");
            timer.id = generateTimerID();
            item.appendChild(remove);
            item.appendChild(timer);
            listOfTasks.appendChild(item);
            clock.countdown(timer.id);
        }
      }
    });
  })
//end of ajax



  //adds a new website or a new task on the fly
  chrome.storage.onChanged.addListener(function(changes, namespace){
    for(let key in changes){
      if (changes[key]["newValue"] === undefined){
        break;
      }
      if (key.length === 4){
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
        //adding a task on the fly
      } else if (key.length === 8){
        let listOfTasks = document.getElementById("task-list");
        let item = document.createElement("li");
        let remove = document.createElement("button");
        remove.innerHTML = "remove";
        remove.setAttribute("key", key);
        remove.addEventListener("click", function(e){
          chrome.storage.sync.remove(this.getAttribute("key"));
          listOfTasks.removeChild(this.parentElement);
        });
        let timer = document.createElement("p");

        item.appendChild(document.createTextNode(changes[key]["newValue"]));
        item.appendChild(remove);
        item.appendChild(timer);
        listOfTasks.appendChild(item);
        startTimer(timeLimit, timer)
      }
    }
  })
