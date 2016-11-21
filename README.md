# Stay On Task


### Background

A lot of work is done on the Internet, which means there are also a lot of distractions. A 5-minute visit to Facebook, YouTube, and other social media sites can be distracting and end up taking hours of your time. Stay on Task is a Chrome extension that blocks you from visiting certain websites, as well as providing a personal to-do list written in JavaScript.


### Functionality and MVP

Users will be able to:
- Submit urls they don't want to visit. When the user attempts to visit a blocked url, a blank page with a message is shown.
- Create a to-do list: each to-do has a time limit.
- The to-do list will be a pop-up bar on the left side of the browser.
- Each to-do can be created/deleted/checked off.
- The ability to turn off the extension.


### Architecture and Technologies

I will be using JavaScript to create the Todo list.

I will be researching HTTP requests to see how to prevent a site from being reached.

I will use JavaScript to create a timer.

### Wireframes

There will be a pop-up sidebar that can appear whenever you toggle it.

![wireframes](/docs/wireframes/StayOnTask.png)

### Implementation Timeline

**(Two Days)**
Get setup. Research Technologies, especially how to create a Chrome Extension. Start off by researching on how to block a get request to a website. By end of day two, should be able to not visit a website like Facebook.

**(Three Days)**
Get started on To-do list. Because you won't be using React, find a way to write JavaScript that will create Todo list items for you. By the end of day three, should be able to create, delete, and edit todo list items.

**(Two Days)**

Add JavaScript interface for adding websites to be blocked.

**(One Day)**
Be able to disable the extension.

**(Two Days)**
Finish up loose ends and fix bugs.

**Bonus:**
- Create a new feature that tracks how long you have spent on each website.
- Create a daily log that reports how long you have spent on each website, as well as how many tasks you have completed successfully.
