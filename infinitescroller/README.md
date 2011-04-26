# Overview

The Infinite Scroller is used for automatically loading (via ajax) additional results in a long list as the user scrolls to the top or bottom of a container.

Examples of one-way infinite scrollers include the Facebook Wall and Google Reader. In contrast to the plugins used across the web, the Infinite Scroller presented here allows the user to load a single page in the middle of a list and move up or down through the pages.

# Demo

* [Full page](http://jsfiddle.net/jookyboi/mSn6F/15/embedded/result/)
* [JSFiddle](http://jsfiddle.net/jookyboi/mSn6F/15/)

# Usage

    var scroller = $("#scroll-content ul").infinitescroller({
        url: "/echo/html/",
        ajaxData: {
            html: createRandomPhrase(),
            delay: 1
        },
        initialPage: 1,
        totalPageCount: 5,
        previousButton: $("a.previous-results"),
        previousLoadingGraphic: $(".loading-previous-spinner"),
        nextLoadingGraphic: $(".loading-next-spinner"),
        scrollContainer: $("#scroll-content")
    });

## Compatibility

Tested on IE7-8, Chrome 9+, Firefox 3.5+

## Minified Version

[jquery.infinitescroller.min.js](https://github.com/ZS/jquery.controls/raw/master/infinitescroller/js/jquery.infinitescroller.min.js)

## Debugging and Development Version

This version contains all comments and header documentation.

[jquery.infinitescroller.js](https://github.com/ZS/jquery.controls/raw/master/infinitescroller/js/jquery.infinitescroller.js)
