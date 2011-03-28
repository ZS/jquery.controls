var activeTrigger = null;

var popup = function(options) {
    // See http://craigsworks.com/projects/qtip2/docs/position/ for position options
    var settings = {
        trigger: function() {},
        container: function(trigger) {},
        initCallback: function() {},
        cancelCallback: function() {},
        okCallback: function() {},
        ajaxOk: false,
        position: {
            my: "top center",
            at: "bottom center",
            viewport: $(window)
        },
        show: {
            solo: true,
            modal: false
        },
        classes: []
    };

    // initialize
    $.extend(settings, options);

    // persist objects for convenience
    var trigger = settings.trigger();
    var container = settings.container(trigger);

    // this is the actual content of the popup
    var popup = $(container.html());

    // private functions
    function wireOKButton() {
        popup.find("input.ok").click(function() {

            if (settings.ajaxOk) {
                // show spinner, let developer decide
                // when to close qtip
            } else {
                trigger.qtip("hide");
            }

            return false;
        });
    }

    function wireCancelLink() {
        popup.find("a.cancel").click(function() {
            trigger.qtip("hide");
            return false;
        });
    }

    function addActiveState() {
        trigger.addClass("active");
    }

    function removeActiveState() {
        trigger.removeClass("active");
    }

    function wireQtip() {
        // custom classes to adjust for width, etc
        var classes = ["ui-tooltip-plain", "ui-tooltip-shadow", "ui-tooltip-rounded"].concat(settings.classes);

        var qtipOptions = {
            content: {
                text: popup
            },
            show: {
                event: "click",
                solo: settings.show.solo,
                modal: settings.show.modal
            },
            hide: {
                event: "click"
            },
            events: {
                show: function(event, api) {
                    wireOKButton();
                    wireCancelLink();
                    addActiveState();

                    settings.initCallback();

                    // but where solo doesn't work for modal
                    if (settings.show.modal && activeTrigger !== null) {
                        activeTrigger.qtip("hide");
                    }

                    activeTrigger = trigger;
                },
                hide: function(event, api) {
                    removeActiveState();
                }
            },
            style: {
                classes: classes.join(" "),
                tip: {
                    width: 20,
                    height: 10
                }
            },
            position: settings.position
        };

        if (settings.show.modal) {
            qtipOptions.position = {
                my: "center",
                at: "center",
                target: $(window)
            };

            qtipOptions.show.modal = {
                blur: false
            };
        }

        trigger.qtip(qtipOptions);
    }

    wireQtip();

    // public
    return popup;
};