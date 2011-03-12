# Demo

Note that the demo below was written using the browser's default stying (which is rather ugly). A basic style sheet will be provided later to prettify things.

* [Full page](http://jsfiddle.net/jookyboi/FEa5J/7/embedded/result/)
* [JSFiddle](http://jsfiddle.net/jookyboi/FEa5J/7/)

# Usage

Using the popup control involves two parts. You'd want to establish the popup container markup first.

	<input class="control trigger" type="button" container="this-popup" value="Open this popup" />

	<div class="this-popup" style="display: none;">
		<div class="popup">
			<div class="content">
				<fieldset>
					<label for="field-name">Field name</label>
					<input type="text" value="This is a field name" />
				</fieldset>

				<fieldset>
					<label for="">Field select</label>
					<select>
						<option>Field option 1</option>
						<option>Field option 2</option>
						<option>Field option 3</option>
					</select>
				</fieldset>

				<p>
					There is some text here which needs to be displayed in order to
					tell the user what to do.
				</p>
				<p>This is another paragraph of text.</p>

			</div>

			<div class="controls">
				<a href="#" class="cancel">Cancel</a>
				<input type="button" class="ok" value="OK" />
			</div>
		</div>
	</div>

Next, you'll wire up the control with the `popup()` function.

	popup({
		trigger: function() {
			return $("input.control");
		},
		container: function(trigger) {
			return $("div." + trigger.attr("container"));
		}
	});

Most of your visual configuration will be done through HTML. The popup however, is in charge of positioning your popup in relation to the trigger button/link/linkbutton. The following positions your popup to the right of the trigger button.

	popup({
		trigger: function() {
			return $("input.left-control");
		},
		container: function(trigger) {
			return $("div." + trigger.attr("container"));
		},
		position: {
			my: "top left",
			at: "bottom center"
		}
	});

For more examples, check out the source for the demo.

## Packed Version

The popup control depends on 2 additional jquery plugins:

1. jquery.browserdetect.js
2. [jquery.qtip.js](http://craigsworks.com/projects/qtip2/)

If you choose popup.pack.min.js, both plugins will be included with the popup control. This is the recommended route if you have no use for browserdetect for qtip in the rest of your application.

Likewise, popup.pack.min.css contains override styles for the popup as well as the qtip.

### Download

1. [popup.pack.min.js](https://github.com/ZS/jquery.controls/raw/master/popup/js/popup.pack.min.js)
2. [popup.pack.min.css](https://github.com/ZS/jquery.controls/raw/master/popup/css/popup.pack.min.css)


## Unpacked Version

If your application already has dependencies on qtip or browserdetect, it makes no sense to include them twice. In this case, you'll want to download the missing components and include only those.

### Download

1. [jquery.browserdetect.min.js](https://github.com/ZS/jquery.controls/raw/master/popup/js/jquery.browserdetect.min.js)
2. [jquery.qtip.min.js](https://github.com/ZS/jquery.controls/blob/master/popup/js/jquery.qtip.min.js)
3. [popup.min.js](https://github.com/ZS/jquery.controls/raw/master/popup/js/popup.min.js)
4. [jquery.qtip.min.css](https://github.com/ZS/jquery.controls/raw/master/popup/css/jquery.qtip.min.css)
5. [popup.pack.min.css](https://github.com/ZS/jquery.controls/raw/master/popup/css/popup.pack.min.css)

## Debugging and Development Version

If something's gone horrible wrong in your app or you'd just like to contribute a specific feature, it helps to pull the un-minified versions to hack on.

### Download

1. [jquery.browserdetect.chirp.js](https://github.com/ZS/jquery.controls/raw/master/popup/js/jquery.browserdetect.chirp.js)
2. [jquery.qtip.chirp.js](https://github.com/ZS/jquery.controls/raw/master/popup/js/jquery.qtip.chirp.js)
3. [popup.chirp.js](https://github.com/ZS/jquery.controls/raw/master/popup/js/popup.chirp.js)



