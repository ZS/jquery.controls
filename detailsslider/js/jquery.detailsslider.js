/*
*   jQuery.DetailsSlider
*
*   Author: Rui Jiang (rui.jiang@zsassociates.com)
*   Purpose: UI control used to selectively control the display of multiple pieces of
*            data. Pulling the slider to defined notches shows and hides the amount of
*            information present.
*
*   -----------------------------------------------------------------------------------------------
*
*   Configuration options:
*   [required] (array)
*   levels          : Specifies the set of detail level selectors. For instance, an
*                     array of [".level-1", ".level-2", ".level-3"] would hide DOM
*                     elements decorated with any of those 3 classes when the slider
*                     is in its leftmost position. Moving the slider one notch to the
*                     right would show .level-1  elements. Two notches would additionally
*                     show .level-2. Moving the slider to its rightmost position would
*                     show all elements.
*
*   [optional] (array)
*   levelTips       : Specifies the tooltips to show at each notch of the slider. Be
*                     sure to include the "no details" state tooltip as the first item
*                     in the array. Not specifying this option will result in tooltips
*                     being disabled.
*
*   [optional] (string)
*   leftLabel       : The text to display at the left edge of the slider. Defaults to
*                     "No Details".
*
*   [optional] (string)
*   rightLabel      : The text to display at the right edge of the slider. Defaults to
*                     "Max Details".
*
*   [optional] (integer)
*   width           : The width (in pixels) of the slider. Defaults to 300.
*
*   [optional] (integer)
*   defaultLevel    : Zero-indexed details level the slider is initialized to. Defaults
*                     to 0.
*
*
*   Properties:
*   slider          : The actual jQuery UI slider object that DetailsSlider uses. For
*                    documentation about the object's API, check out
*                    http://jqueryui.com/demos/slider.
*
*   -----------------------------------------------------------------------------------------------
*
*   Usage:
*
*   var detailsSlider = $("#slider").detailsslider({
*       levels: [".level-1", ".level-2", ".level-3"],
*       levelTips: ["None", "Assigned", "Metric A", "Metric B"],
*       leftLabel: "Fewer",
*       rightLabel: "More",
*       width: 200,
*       defaultLevel: 1
*   });
*
*/

(function($) {
    $.fn.extend({
        detailsslider: function(options) {
            // Region: Constructing Plugin
            var defaults = {
                levels: [],
                levelTips: [],
                leftLabel: "No Details",
                rightLabel: "Max Details",
                width: 300,
                defaultLevel: 0,
                qtip: true
            };

            var opts = defaults;

            if (options) {
                opts = $.extend(defaults, options);
            }

            // Region: Setup
            var slider = $(this);
            slider.css("width", opts.width);

            initializeSlider();

            // Region: Properties
            this.slider = function() {
                return slider;
            }

            // Region: Private Functions
            function initializeSlider() {
                slider.slider({
                    value: opts.defaultLevel,
                    min: 0,
                    max: opts.levels.length,
                    step: 1,
                    slide: function(event, ui) {
                        updateDisplay(ui.value);
                    }
                });

                updateDisplay(slider.slider("value"));
                addLabels();
                addNotches();

                if (opts.levelTips.length > 0 && opts.qtip) {
                    addTooltips();
                }
            }

            function addLabels() {
                slider.after('<span class="slider-label left-end"></span>');
                slider.after('<span class="slider-label right-end"></span>');

                var leftEnd = $("span.left-end");
                var rightEnd = $("span.right-end");

                leftEnd.html(opts.leftLabel);
                rightEnd.html(opts.rightLabel);

                leftEnd.css("left", slider.position().left);
                rightEnd.css("left", slider.position().left + slider.width() - rightEnd.width());
            }

            function addNotches() {
                var notchHtml = '<span class="notch"></span>';
                var numLevels = opts.levels.length;

                for (var index = 1; index < numLevels; index++) {
                    var notch = $(notchHtml);
                    var cssLeft = Math.floor(100 / numLevels) * index;
                    notch.css("left", cssLeft + "%");
                    
                    slider.append(notch);
                }
            }

            function addTooltips() {
                var handle = slider.find(".ui-slider-handle"); 

                handle.qtip({
                   content: '',
                   show: {
                        delay: 0,
                        when: {
                            event: "showtip"
                        },
                        effect: {
                            type: "fade",
                            length: 100
                        }
                   },
                   hide: {
                        delay: 0,
                        when: {
                            event: "hidetip"
                        },
                        effect: {
                            type: "fade",
                            length: 100
                        }
                   },
                   position: {
                        corner: {
                            target: 'topMiddle',
                            tooltip: 'bottomMiddle'
                        }
                   },
                   style: {
                       color: "#999",
                       fontSize: "0.8em",
                       padding: "3px 4px 3px 4px",
                       tip: {
                            corner: 'bottomMiddle',
                            color: '#ddd',
                            size: {
                                x: 15,
                                y : 8
                            }
                       },
                       border: {
                            width: 1,
                            radius: 2,
                            color: '#ddd'
                       }
                   }
                });

                // show / hide behavior
                slider.bind("slidechange", showTip);
                slider.bind("slide", showTip);
                
                function showTip(event, ui) {
                    var qtip = $(".qtip");

                    if (!qtip.is(":visible")) {
                        setTimeout(function() {
                            handle.qtip("show");
                            handle.trigger("showtip");

                            handle.qtip("api").updateContent(opts.levelTips[slider.slider("value")]);
                        }, 100);

                    } else {
                        setTimeout(function() {
                            handle.qtip("api").updateContent(opts.levelTips[slider.slider("value")]);
                        }, 100);
                    }
                }

                slider.bind("focusout", function(event, ui) {
                    handle.qtip("hide");
                    handle.trigger("hidetip");
                });
            }

            function updateDisplay(level) {
                for (var index = 0; index <= level; index++) {
                    $(opts.levels[index]).show();
                }

                for (var index = level; index < opts.levels.length; index++) {
                    $(opts.levels[index]).hide();
                }
            }

            return this;
        }
    });
})(jQuery);