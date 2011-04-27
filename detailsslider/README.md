# Overview

The Details Slider is a control for controlling the amount of information on display. Most often the information is displayed as a set of rows in a table. This does not always need to be the case. One of the plugin's options is an array of class selectors, denoting the set of DOM elements to turn on and off in the display.

Though not a part of the plugin, it is suggested that developers place labels below the control to give meaning to either extreme of the slider's position.

# Demo

* [Full page]
* [JSFiddle]

# Usage

## Compatibility

The details slider itself is functional on IE7-8, Chrome 9+, and Firefox 3.5+.

However, there are issues with using qTip tooltips on IE and it is suggested that they be turned off for these browsers. (Toggle qTips with the <code>qtip</code> option.)

## Packed Version

jquery.detailsslider depends on jquery.qtip. If you choose jquery.detailsslider.pack.min.js, both plugins will be included as part of one file.

[jquery.detailsslider.pack.min.js]()

## Unpacked Version

1. [jquery.detailsslider.min.js]()
2. [jquery.qtip.min.js]()

## Debugging and Development Version

This version contains all comments and header documentation.

1. [jquery.detailsslider.js]()
2. [jquery.qtip.js]()