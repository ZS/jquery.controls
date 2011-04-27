# Overview

The Ajax Queue provides a way to keep track of concurrent and queued AJAX requests on a single webpage. Users can specify a maximum number of concurrent (in-flight) actions.
It can also be configured to force page actions to be synchronous, which is useful when requests fired by separate events may cause race conditions.

# Demo

* [Full page](http://jsfiddle.net/jookyboi/mNe9L/11/embedded/result/)
* [JSFiddle](http://jsfiddle.net/jookyboi/mNe9L/11/)

# Usage

	var ajaxqueue = $().ajaxqueue({
		concurrentActions: 3
	});

	ajaxqueue.addAction({
		name: "new action",
		type: "POST",
		url: "../ajax/testechoaction",
		data: {},
		success: function(response) {
			$('#actionqueOutput').append(response + "<br />");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			$('#actionqueOutput').append(textStatus + "<br />");
		}
	});

## Compatibility

Tested on IE6-8, Chrome 9+, Firefox 3.5+

## Packed Version

jquery.ajaxqueue depends on the Math.uuid library. If you choose jquery.ajaxqueue.pack.min.js, both plugins will be included as part of one file.

[jquery.ajaxqueue.pack.min.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/jquery.ajaxqueue.pack.min.js)

## Unpacked Version

1. [jquery.ajaxqueue.min.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/jquery.ajaxqueue.min.js)
2. [Math.uuid.min.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/Math.uuid.min.js)

## Debugging and Development Version

This version contains all comments and header documentation.

1. [jquery.ajaxqueue.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/jquery.ajaxqueue.js)
2. [Math.uuid.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/Math.uuid.js)


