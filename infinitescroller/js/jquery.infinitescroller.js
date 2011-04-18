/*
*	JQuery.InfiniteScroller
*
*	Author: Rui Jiang (rui.jiang@zsassociates.com)
*	Purpose: The Infinite Scroller is used for automatically loading (via ajax) additional results 
*            in a long list as the user scrolls to the top or bottom of a container.
*
*   -----------------------------------------------------------------------------------------------
*
*   Configuration options:
*   [required] (string)
*   url                     : The url which accepts the next page # as input and returns the 
*                             markup to prepend/append to the list.
*
*   [required] (jQueryObject)
*   scrollContainer         : The container which holds the list and contains the scrollbar.
*                             It should have a fixed height and CSS property overflow: hidden.
*
*   [optional] (integer)
*   initialPage             : The page to load via ajax when the infinitescroller initializes.
*                             Use a value <= 0 to not load anything.
*
*   [required] (integer)
*   totalPageCount          : Needed for the plugin to know when to stop trying to retrieve
*                             previous/next pages.
*
*   [optional] (jqueryObject)
*   previousButton          : Pass a jQuery object to this parameter if you don't want to have
*                             the plugin automatically scroll up when the user reaches the top
*                             of the list.
*
*   [optional] (jqueryObject)
*   previousLoadingGraphic  : The image to show as the infinite scroller is loading the previous
*                             set of results.
*
*   [optional] (jqueryObject)
*   nextLoadingGraphic      : The image to show as the infinite scroller is loading the next
*                             set of results.
*
*   [optional] (integer)
*   triggerAtBottom         : The # of pixels from the bottom of the list to begin loading
*                             the next set of results.
*
*   [optional] (integer)
*   triggerAtTop            : The # of pixels from the top of the list to begin loading the
*                             previous set of results. Only used when previousButton is not set.
*                             It is advisable to set this value to something less than the typical
*                             mouse wheel offset increment. (< 20 pixels)
*
*   [optional] (integer)
*   scrollTopOffset         : The # of pixels to offset the final scroll position once the previous
*                             set of results is loaded. The reason for this is that the user may not 
*                             realize the previous results have been loaded. You'll want to use this 
*                             to give him a "peek" of the next set so he'd know to scroll up.
*
*   [optional] (object)
*   ajaxData                : Any additional parameters you'd want to pass to the url.
*
*   [optional] (function)
*   onLoadCallback          : Function called once a page of results is loaded.
*
*   -----------------------------------------------------------------------------------------------
*
*   Usage:
*
*   var scroller = $("#scroll-content ul").infinitescroller({
*        url: "../ajax/getResults",
*        initialPage: 1,
*        totalPageCount: 15,
*        previousButton: $("a.previous-results"),
*        previousLoadingGraphic: $(".loading-previous-spinner"),
*        nextLoadingGraphic: $(".loading-next-spinner"),
*        scrollContainer: $("#scroll-content")
*    });
*
*/

(function ($) {
    $.fn.extend({
        infinitescroller: function (options) {
            // Region: Constructing Plugin
            var defaults = {
                url: "",
                scrollContainer: null,
                initialPage: 1,
                totalPageCount: null,
                previousButton: null,
                previousLoadingGraphic: null,
                nextLoadingGraphic: null,
                triggerAtBottom: 30,
                triggerAtTop: 5,
                scrollTopOffset: 0,
                ajaxData: {},
                onLoadCallback: null
            };

            var opts = defaults;

            if (options) {
                opts = $.extend(defaults, options);
            }

            // Region: Setup
            var listContainer = $(this);
            var scrollContainer = opts.scrollContainer;
            var hasTriggered = false;

            var lastListHeight = listContainer.height();

            if (opts.previousButton) {
                opts.previousButton.click(function (event) {
                    opts.previousButton.hide();
                    loadPreviousPage();
                    return false;
                });
            }

            // prevents reloading of pages
            var minPageLoaded;
            var maxPageLoaded;

            // Region: Public Functions
            this.loadPage = function (page) {
                if (opts.previousButton) {
                    opts.previousButton.hide();
                }

                listContainer.html("");

                minPageLoaded = page;
                maxPageLoaded = page;

                var data = opts.ajaxData;
                data.page = page;
                ajaxCall(replaceData, null, null, opts.previousLoadingGraphic, data);
            }

            if (opts.initialPage > 0) {
                // use initialPage <= 0 to load nothing on load
                this.loadPage(opts.initialPage);
            }

            this.setTotalPageCount = function (count) {
                opts.totalPageCount = count;
            }

            // Region: Events
            scrollContainer.scroll(function (event) {
                scrollCheck();
            });

            // Region: Private Functions
            function getPreviousPage() {
                return minPageLoaded - 1;
            }

            function getNextPage() {
                return maxPageLoaded + 1;
            }

            function decrementPage() {
                minPageLoaded--;

                // prevents "scroll up" skipping behavior
                var newScrollPosition = listContainer.height() - lastListHeight;
                scrollContainer.scrollTop(newScrollPosition + opts.scrollTopOffset);
            }

            function incrementPage() {
                maxPageLoaded++;
            }

            function isNoScrollbar() {
                return listContainer.height() < scrollContainer.height();
            }

            function loadPreviousPage() {
                lastListHeight = listContainer.height();
                ajaxCall(prependData, getPreviousPage, decrementPage, opts.previousLoadingGraphic, null);
            }

            function loadNextPage() {
                ajaxCall(appendData, getNextPage, incrementPage, opts.nextLoadingGraphic, null);
            }

            function scrollCheck() {
                if (isNoScrollbar()) {
                    // if the data loaded does not cause scrolling to occur
                    if (!opts.previousButton) {
                        ajaxCall(prependData, getPreviousPage, decrementPage, opts.previousLoadingGraphic, null);
                    }
                } else if (getBottomSpacing() - scrollContainer.scrollTop() < opts.triggerAtBottom) {
                    // scroll to next page
                    loadNextPage();
                } else if (scrollContainer.scrollTop() < opts.triggerAtTop) {
                    // scroll to previous page
                    if (!opts.previousButton) {
                        loadPreviousPage();
                    }
                }
            }

            function getBottomSpacing() {
                return listContainer.height() - scrollContainer.height();
            }

            function replaceData(data) {
                listContainer.html(data);

                // make sure we don't need to load anything else before or after
                // this handles the case where the loaded items don't cause scrollbars to appear
                if (isNoScrollbar()) {
                    scrollCheck();
                } else {
                    scrollContainer.scrollTop(opts.scrollTopOffset);
                }
            }

            function prependData(data) {
                listContainer.prepend(data);
            }

            function appendData(data) {
                listContainer.append(data);
            }

            function ajaxCall(changeFunction, nextPageFunction, pageChangeFunction, loadingGraphic, otherData) {
                var data;
                if (otherData) {
                    data = otherData;
                } else {
                    data = opts.ajaxData;
                    data.page = nextPageFunction();
                }

                if (data.page > 0 && data.page <= opts.totalPageCount && !hasTriggered) {
                    hasTriggered = true;

                    if (loadingGraphic) {
                        loadingGraphic.show();
                    }

                    $.ajax({
                        type: "POST",
                        url: opts.url,
                        data: data,
                        success: function (response) {
                            hasTriggered = false;

                            if (loadingGraphic) {
                                loadingGraphic.hide();
                            }

                            changeFunction(response);

                            if (pageChangeFunction) {
                                pageChangeFunction();
                            }

                            if (opts.previousButton && data.page > 1) {
                                opts.previousButton.show();
                            } else if (opts.previousButton) {
                                opts.previousButton.hide();
                            }

                            if (opts.onLoadCallback) {
                                opts.onLoadCallback();
                            }
                        }
                    });
                }
            }

            return this;
        }
    });
})(jQuery);
