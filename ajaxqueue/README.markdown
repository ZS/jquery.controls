# Overview

The Ajax Queue provides a way to keep track of concurrent and queued AJAX requests on a single webpage. Users can specify a maximum number of concurrent (in-flight) actions.
It can also be configured to force page actions to be synchronous, which is useful when requests fired by separate events may cause race conditions.

# Demo


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

## Minified Version

[jquery.ajaxqueue.min.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/jquery.ajaxqueue.min.js)

### Download

## Debugging and Development Version

This version contains all comments and header documentation.

[jquery.ajaxqueue.chirp.js](https://github.com/ZS/jquery.controls/raw/master/ajaxqueue/js/jquery.ajaxqueue.chirp.js)

### Download


