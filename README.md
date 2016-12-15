# Stay On Task

Stay On Task is a Google Chrome Extension that blocks websites and creates a customized to-do list. It uses the chrome.storage API to store websites and tasks, as well as content-scripts to provide the user interface on each browser tab.

![image of Stay On Task](/docs/StayOnTask.png)


## Manifest.json

The background key for Manifest.json tells the chrome extension which files will be running in the background throughout the duration of the extension. Background.js deals with the logic of the website blocking.

The content scripts key for Manifest.json describes which files to inject into the browser's HTML page. Matches describes which urls to inject the content scripts: document_end tells the browser to load the JavaScript and CSS files when the browser's HTML file has finished loading.

Web accessible resources tells Manifest.json to include any additional files that are not CSS or JS.

![image of Manifest](/docs/manifest.png)


## Website Blocking

The user adds which websites they want to block, which get added to chrome.storage. Chrome.storage acts like a database: it stores user data in a huge JSON object. Use these methods
to store data and retrieve data from chrome.storage.

```javascript

chrome.storage.sync.set({Object}, optional callback);
chrome.storage.sync.get(null, function(items){

});
```
Background.js compares each tab's url against the websites stored in the database: if they match,
the tab's url is changed to serve **message.html**, a local file in StayOnTask.

![image of message.html](/docs/message.png)

## Content Scripts

The Content Script **sidenav.js** works in conjunction with **sidenav.html**. **Sidenav.js** uses jQuery to fetch the html elements in **sidenav.html** and appends them to the body of the current tab.

```javascript
$.get(chrome.extension.getURL('/sidenav.html'), function(data) {
    $($.parseHTML(data)).appendTo('body');
  });
```

## Future Project Plans

- Improve user interface to notify users when a task's deadline is due.
- Improve CSS interface to have uniformity across all tabs.
- Include an option to toggle the interface on/off.
