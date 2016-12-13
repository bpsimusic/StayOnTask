

function openNav() {
    document.getElementById("mySideNav").style.width = "300px";
}

function closeNav() {
    document.getElementById("mySideNav").style.width = "0";
}

function startTimer(){
  chrome.storage.sync.get(null, function(items){
  //shows the list of websites
  if(Object.keys(items).length != 0)
    for(let key in items) {
      if (key.length === 8){
        let inMilli = Date.parse(new Date());
        let milliSecsLeft = (items[key][1] - inMilli);
        let minutesLeft = Math.floor(milliSecsLeft / (1000 * 60))

        let timer = document.getElementById(key);
        let hours = "00";
        let minutes = minutesLeft % 60;

        if (hours <=0 && minutes <=0 ){
          hours = "00";
          minutes = "00";
        } else {
          if (minutesLeft >= 60){
            hours = Math.floor(minutesLeft / 60);
            hours = "0" + hours;
          }
          if(minutes < 10){
            minutes = "0" + minutes;
          } else {
            minutes = minutes;
          }
        }
        //working on this.


        timer.innerHTML = `Time Left: ${hours}:${minutes}`;
      }
    }
  });
}

setInterval(startTimer, 1000);

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


$.get(chrome.extension.getURL('/sidenav.html'), function(data) {
    $($.parseHTML(data)).appendTo('body');
    let arrow = document.getElementById("arrow");
    let closeButton = document.getElementById("closebtn-stayontask");
    arrow.addEventListener("click", openNav);
    closeButton.addEventListener("click", closeNav);
    //form to create a task
    let formTask = document.getElementById("task-form");
    formTask.addEventListener('submit', function(e){
      e.preventDefault();
      let task = document.getElementById("task-name").value;
      let timeLimit = document.getElementById("time-limit").value;
      let key = generateTaskKey();
      let d = new Date();
      let milliSecs = Date.parse(d) + (60 * 60 * 1000 * timeLimit);
      let taskDetails = [task, milliSecs]
      chrome.storage.sync.set({[key]: taskDetails});
      formTask.reset();
    });
    //form to create a blocked website.
    let formURL = document.getElementById("website-form");
    formURL.addEventListener('submit', function(e){
      e.preventDefault();
      let website = document.getElementById("website-entry").value;
      let error = document.getElementById("form-error");
      if (/^(www\..+)/.test(website)){
        let key = generateURLKey();
        chrome.storage.sync.set({[key]: website});
        error.innerHTML = "";
        formURL.reset();
      } else {
        error.innerHTML = "website must follow example format";
        error.style.color = "red";
      }
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
            item.className = "task-list-item";
            let remove = document.createElement("button");
            remove.innerHTML = "remove";
            remove.setAttribute("key", key);
            remove.addEventListener("click", function(e){
              chrome.storage.sync.remove(this.getAttribute("key"));
              $(this).closest('li').remove();
            });
            let timer = document.createElement("span");
            timer.id = key;
            let checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("value", "completed");
            let checkboxID = key + "checkbox"
            checkbox.id = checkboxID;
            let task = document.createElement("div");
            task.innerHTML = items[key][0];
            task.className= "task-title"
            let flex = document.createElement("div");
            flex.id = "flex-container";


            flex.appendChild(timer);
            flex.appendChild(checkbox);
            flex.appendChild(remove);
            item.appendChild(task);
            item.appendChild(flex);
            listOfTasks.appendChild(item);
            $(`#${checkboxID}`).wrap("<label>Complete</label>")
        }
      }
    });
    //Update Tasks
    let updateTasks = document.getElementById("update-tasks");
    updateTasks.addEventListener("click", function(){
      let list = document.getElementById("task-list");
      let listItems = list.children;
      let removeTasks = [];
      for (let i = (listItems.length-1); i >= 0; i--) {
        if (listItems[i].querySelector("input").checked){
            let key = listItems[i].querySelector("input").id;
            key= key.slice(0,8);
            //this is the problem
            chrome.storage.sync.remove(key);
            list.removeChild(listItems[i]);
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
        item.className = "task-list-item"
        let remove = document.createElement("button");
        remove.innerHTML = "remove";
        remove.setAttribute("key", key);
        remove.addEventListener("click", function(e){
          chrome.storage.sync.remove(this.getAttribute("key"));
          $(this).closest('li').remove();
        });
        let timer = document.createElement("span");
        timer.id = key;
        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.setAttribute("value", "completed");
        let checkboxID = key + "checkbox";
        checkbox.id = checkboxID;
        let task = document.createElement("div");
        task.innerHTML = changes[key]["newValue"][0];
        task.className = "task-title";

        let flex = document.createElement("div");
        flex.id = "flex-container";
        flex.appendChild(timer);
        flex.appendChild(checkbox);
        flex.appendChild(remove);
        item.appendChild(task);
        item.appendChild(flex);
        listOfTasks.appendChild(item);
        $(`#${checkboxID}`).wrap("<label>Complete</label>")
      }
    }
  })
