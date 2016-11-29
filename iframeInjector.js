var style = document.createElement('link');
style.rel = 'stylesheet';
style.type = 'text/css';
style.href = chrome.extension.getURL('iframe.css');
document.head.appendChild(style);


var iFrame  = document.createElement ("iframe");
iFrame.className = "injectedHTML";
iFrame.src  = chrome.extension.getURL ("sidenav.html");

document.body.insertBefore (iFrame, document.body.firstChild);
