# Overview

Notifications is used to notify the user of an action (usually ajax) which has completed in the background. These tasks may be quick ("Profile saved") or long-running ("Geocoding complete").

Notifications integrates well with ajaxqueue to provide an indication of the # of in-flight and queued actions.

# Demo

* [Full page](http://jsfiddle.net/jookyboi/udvaP/17/embedded/result/)
* [JSFiddle](http://jsfiddle.net/jookyboi/udvaP/17/)

# Usage

    var ajaxqueueOne = $().ajaxqueue({
        concurrentActions: 3
    });

    var ajaxqueueTwo = $().ajaxqueue({
        concurrentActions: 1
    });

    var notifications = $("#notifications").notifications({
        messageDuration: 2000,
        ajaxqueues: [ajaxqueueOne, ajaxqueueTwo]
    });

## Compatibility

Tested on IE7-8, Chrome9+, Firefox 3.5+

## Minimized Version

1. [jquery.notifications.min.js](https://github.com/ZS/jquery.controls/raw/master/notifications/js/jquery.notifications.min.js)
2. [jquery.notifications.min.css](https://github.com/ZS/jquery.controls/raw/master/notifications/css/jquery.notifications.min.css)

## Debugging and Development Version

1. [jquery.notifications.js](https://github.com/ZS/jquery.controls/raw/master/notifications/js/jquery.notifications.js)
2. [jquery.notifications.css](https://github.com/ZS/jquery.controls/raw/master/notifications/css/jquery.notifications.css)