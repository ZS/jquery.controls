/*
*   JQuery.TabDropdown
*
*   Author: Rui Jiang (rui.jiang@zsassociates.com)
*   Purpose: A different take on the standard Javelin tab navigation item. 
*            Wires up any list item with "tab-dropdown" as a class to be
*            the hit target for triggering the submenu. There is a specific
*            set of DOM elements which need to be specified for the plugin
*            to function.
*
*   -----------------------------------------------------------------------------------------------
*
*   Configuration Options:
*   (None)
*
*   Properties:
*   (None)
*
*   Methods:
*   (None)
* 
*   -----------------------------------------------------------------------------------------------
*
*   Usage:
*
*   HTML:
*   <ul>
*       <li class="tab-dropdown">
*           <a href="#">Major section</a>
*           <ul>
*               <li><a href="#">First Subsection</a></li>
*               <li><a href="#">Second Subsection</a></li>
*           </ul>
*       </li>
*       <li class="current tab-dropdown">
*           <a href="#">Current tab</a>
*           <ul>
*               <li class="current"><a href="#">Current Subsection</a></li>
*               <li><a href="#">Another Subsection</a></li>
*           </ul>
*       </li>
*       <li><a href="#">QC</a></li>
*       <li><a href="#">Tabs grow wider to accommodate long captions</a></li>
*   </ul>
*
*   Javascript:
*   $(function() {
*       $().tabdropdown();
*   });
*
 */

(function($) {
    $.fn.extend({
        tabdropdown: function(options) {
            // Region: Constructing Plugin
            var defaults = {};

            // Region: Setup

            var dropdownTab = $("li.tab-dropdown");
            var dropdownTablink = $("li.tab-dropdown").children("a");
            var dropdownMenu = dropdownTab.find("ul");

            // apply styles
            dropdownTab.each(function(index) {
                if (!$(this).hasClass("current") && (!$.browser.msie)) {
                    $(this).css("border-bottom", 0);
                }

                if (!$(this).hasClass("current")) {
                    $(this).find("ul").addClass("unselected");
                }
            });

            dropdownTablink.addClass("dropdown");

            dropdownMenu.find("li:first").addClass("first");
            dropdownMenu.find("li:last").addClass("last");

            dropdownMenu.css("display", "none");
            dropdownMenu.each(function(index) {
                var menu = $(this);

                var position = menu.closest("li.tab-dropdown").position();
                menu.css("left", position.left);

                if ($.browser.webkit && (!isSafari())) {
                    menu.css("top", menu.offset().top + 26);
                }
            });

            // Region: Events

            // show / hide menu
            dropdownTab.live("mouseover", function(event) {
                mouseOverTablink($(this).children("a"));
                $(this).find("ul").show();
            });

            dropdownTab.live("mouseout", function(event) {
                mouseOutTablink($(this).children("a"));
                $(this).find("ul").hide();
            });

            // Region: Private Functions
            function isSafari() {
                if (navigator.vendor && navigator.vendor.indexOf("Apple") != -1)
                    return true;

                return false;
            }

            function mouseOverTablink(tablink) {
                if (tablink.parent().hasClass("current")) {
                    tablink.css("border-bottom", "1px solid #fff");
                    tablink.parent().css("border-bottom", 0);
                } else {
                    tablink.css("background-position", "0 -200px");
                    tablink.css("border-bottom", "1px solid #8bb4e5");

                    if ($.browser.msie) {
                        tablink.closest("li.tab-dropdown").css("border-bottom", "0");
                    }
                }
            }

            function mouseOutTablink(tablink) {
                if (tablink.parent().hasClass("current")) {
                    tablink.css("border-bottom", 0);
                    tablink.parent().css("border-bottom", "1px solid #fff");
                } else {
                    tablink.css("color", "#fff");
                    tablink.css("background-position", "0 -100px");
                    tablink.css("border-bottom", 0);

                    if ($.browser.msie) {
                        tablink.closest("li.tab-dropdown").css("border-bottom", "1px solid #274e7f");
                    }
                }
            }
        }
    });
})(jQuery);
