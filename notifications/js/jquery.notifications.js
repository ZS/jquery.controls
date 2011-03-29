/*
*	jQuery.Notifications
*
*	Author: Rui Jiang (rui.jiang@zsassociates.com)
*	Purpose: An UI element that keeps track of active/waiting AJAX actions. Can be used on its
*			 own or in conjunction with JQuery.AjaxQueue. Also has a message queue to notify users
*			 of important screen events.
*
*   -----------------------------------------------------------------------------------------------
*
*	Configuration Options:
*	[optional] (text)
*	effect			: The animation used by the notification when showing/hiding itself.
*					  Check out the Show/Hide/Toggle section of http://docs.jquery.com/UI/Effects
*					  for possible values.
*
*	[optional] (object)
*	effectOptions	: The animation options that correspond to the effect option. For example,
*					  the "drop" effect has a property direction that specifies in which
*					  direction the animation occurs. Check http://docs.jquery.com/UI/Effects
*					  for possible options.
*
*	[optional] (number)
*	effectDuration	: The number of milliseconds it takes for the show/hide animation to 
*					  complete.
*
*	[optional] (number)
*	hideDelay		: The number of milliseconds to pause before hiding. Helps to keep users
*                     notified of short-running actions.
*
*	[optional] (hex)
*	actionsBackgroundColor	: The color in hex (ie. "#FFFFDD") for the background color of the
*							  active/waiting bar.
*
*	[optional] (hex)
*	actionsTextColor		: The color in hex for the text color of the active/waiting bar.
*
*	[optional] (hex)
*	messageBackgroundColor	: The color in hex for the background color of the messages bar.
*
*	[optional] (hex)
*	messageTextColor		: The color in hex for the text color of the messages bar.
*
*	[optional] (number)
*	messageDuration	: The number of milliseconds each message will appear on the screen for.
*					  Set this to 0 if you'd like to manually hide each message via a call to
*					  nextMessage().
*
*	[optional] (array)
*	ajaxqueues		: An array of AjaxQueue objects you'd like to register with notifications.
*					  The active/waiting bar will automatically update with any actions you
*					  push onto AjaxQueues specified here. You may also add additional AjaxQueues
*					  after Notifications instantiation by calling the addAjaxQueue() method.
*
*
*	Properties:
*	active			: Array of the names of active actions shown in Notifications.
*	waiting			: Array of the names of waiting actions shown in Notifications.
*
*
*	Methods:
*	(returns nothing)
*	setActive(actionArray)	: Sets the active actions array. Do not use this function if there
*							  are any AjaxQueues registered with Notifications as this will
*							  reset the action counts.
*
*	(returns nothing)
*	setWaiting(actionArray)	: Sets the waiting actions array. Do not use this function if there
*							  are any AjaxQueues registered with Notifications.
*
*	(returns nothing)
*	addActive(actionName)	: Adds an action to the active actions array. Do not use this function
*							  if there are any AjaxQueues registered with Notifications.
*
*	(returns nothing)
*	addWaiting(actionName)	: Adds an action to the waiting actions array. Do not use this function
*							  if there are any AjaxQueues registered with Notifications.
*
*	(returns nothing)
*	clearActive()			: Clears all active actions from the array. Do not use this function
*							  if there are any AjaxQueues registered with Notifications.
*
*	(returns nothing)
*	clearWaiting()			: Clears all waiting actions from the array. Do not use this function
*							  if there are any AjaxQueues registered with Notifications.
*
*	(returns nothing)
*	clearAll()				: Clears all actions from all active/waiting arrays. Do not use this
*							  function if there are any AjaxQueues registered with Notifications.
*
*	(returns nothing)
*	addMessage(html)		: Push a new message onto the message queue. It will show after
*							  any preceding messages have been shown.
*
*	(returns nothing)
*	nextMessage()			: Used in conjunction with setting messageDuration = 0. Shows the
*							  next message on the message queue.
*
*	(returns nothing)
*	clearAllMessages()		: Clears all messages from the message queue. The one on the screen
*							  will be the last shown.
*
*	(returns nothing)
*	addAjaxQueue(newQueue)	: Adds another AjaxQueue object to be tracked by Notifications.
*
*   -----------------------------------------------------------------------------------------------
*
*	Usage:
*
*	var notifications = $("#notificationsDiv").notifications({
*		messageDuration: 2000,
*		ajaxqueues: [ajaxqueueOne, ajaxqueueTwo]
*	});
*
*/

(function($) {
    $.fn.extend({
        notifications: function(options) {
            // Region: Constructing Plugin
            var defaults = {
				effect: "slide",
				effectOptions: { 
					direction: "down",
					easing: "easeInQuad"
				},
				effectDuration: 500,
				hideDelay: 1500,
				actionsBackgroundColor: "#DDDDDD",
				actionsTextColor: "#000000",
				messageBackgroundColor: "#FFFF77",
				messageTextColor: "#000000",
				messageDuration: 5000,
				ajaxqueues: []
                        };
			
			var opts = defaults;
			
			if (options) {
				opts = $.extend(defaults, options);
			}
			
			// Region: Setup
			insertDOM($(this));
			
			// apply colors
			$("#notificationsContainer").css("background-color", opts.actionsBackgroundColor);
			$("#notificationsContainer").css("color", opts.actionsTextColor);
			
			$("#notificationMessageContainer").css("background-color", opts.messageBackgroundColor);
			$("#notificationMessageContainer").css("color", opts.messageTextColor);
			
			// use different divs depending on the browser
			var fixedDiv;
			
			if ($.browser.mozilla) {
				fixedDiv = "#notificationsFixedArea";
			} else {
				fixedDiv = "#notificationsContainer";
			}
			
			$(fixedDiv).hide();
			$("#notificationMessageContainer").hide();
			$("#notificationsNoActions").hide();
			
			if (opts.ajaxqueues.length > 0) {
				setupAjaxQueues();
			}
			
			// Region: Fields
			
			// all of the following represent queues
			var active = [];
			var waiting = [];
			var messages = [];
			
			var isVisible = false;
			var isOnlyMessageVisible = false;
			var isMessageVisible = false;
			var isMessageDisplaying = false;
			
			// integration with ajaxqueue
			var ajaxqueueActive = new Array(opts.ajaxqueues.length);
			var ajaxqueueWaiting = new Array(opts.ajaxqueues.length);
			
			// Region: Properties
			this.active = function() {
				return active;
			}
			
			this.waiting = function() {
				return waiting;
			}
			
			// Region: Public Functions
			this.setActive = function(actionArray) {
				active = actionArray;
				updateUI();
			}
			
			this.setWaiting = function(actionArray) {
				waiting = actionArray;
				updateUI();
			}
			
			this.addActive = function(actionName) {
				active.push(actionName);
				updateUI();
			}
			
			this.addWaiting = function(actionName) {
				waiting.push(actionName);
				updateUI();
			}

			this.clearActive = function() {
				active = [];
				updateUI();
			}
			
			this.clearWaiting = function() {
				waiting = [];
				updateUI();
			}
			
			this.clearAll = function() {
				active = [];
				waiting = [];
				updateUI();
			}
			
			this.addMessage = function(html) {
				messages.push(html);
				updateUI();
			}
			
			this.nextMessage = function() {
				isMessageDisplaying = false;
				updateUI();
			}
			
			this.clearAllMessages = function() {
				messages = [];
				updateUI();
			}
			
			this.addAjaxQueue = function(newQueue) {
				opts.ajaxqueues.push(newQueue);
				setupAjaxQueues();
			}
			
			// Region: Private Functions
			function insertDOM(domElement) {
				var html = '<div id="notificationsFixedArea">' +
                                                    '<div id="notificationMessageContainer">' +
                                                            '<div class="notificationsLine"></div>' +
                                                            '<div id="notificationMessage"></div>' +
                                                    '</div>' +
                                                    '<div id="notificationsContainer">' +
                                                            '<div class="notificationsLine"></div>' +
                                                            '<div id="notificationsInner">' +
                                                                    '<div id="notificationsActionsCount">' +
                                                                            '<span id="notificationsActiveImage"></span> ' +
                                                                            '<span id="notificationsActiveCount">0</span> ' +
                                                                            'actions active / ' +
                                                                            '<span id="notificationsWaitingCount">0</span> actions waiting' +
                                                                    '</div>' +
                                                                    '<span id="notificationsNoActions">No active or waiting actions</span>' +
                                                            '</div>' +
                                                    '</div>' +
                                            '</div>';

				domElement.html(html);
			}
			
			// AjaxQueue integration
			function setupAjaxQueues() {
			
				function updateActiveWaiting(queue) {
					return function() {
						setAjaxQueueActive(queue, queue.active());
						setAjaxQueueWaiting(queue, queue.waiting());
					}
				}
			
				for (var index = 0; index < opts.ajaxqueues.length; index++) {
					var curriedUpdate = updateActiveWaiting(opts.ajaxqueues[index]);
				
					opts.ajaxqueues[index].setPreAction(curriedUpdate);
                                        opts.ajaxqueues[index].setPostAddAction(curriedUpdate);
					opts.ajaxqueues[index].setPostAction(curriedUpdate);
				}
			}
			
			function setAjaxQueueActive(queueObject, active) {
				if (!ajaxqueueActive[queueObject.id()]) {
					ajaxqueueActive[queueObject.id()] = new Array(1);
				}
			
				ajaxqueueActive[queueObject.id()][0] = active;
				assignQueueArrays();
			}
			
			function setAjaxQueueWaiting(queueObject, waiting) {
				if (!ajaxqueueWaiting[queueObject.id()]) {
					ajaxqueueWaiting[queueObject.id()] = new Array(1);
				}
			
				ajaxqueueWaiting[queueObject.id()][0] = waiting;
				assignQueueArrays();
			}
			
			function assignQueueArrays() {
				active = [];
				waiting = [];
				
				for (var index = 0; index < opts.ajaxqueues.length; index++) {
					var queueObject = opts.ajaxqueues[index];
				
					if (ajaxqueueActive[queueObject.id()]) {
						active = active.concat(ajaxqueueActive[queueObject.id()][0]);
					}
					
					if (ajaxqueueWaiting[queueObject.id()]) {
						waiting = waiting.concat(ajaxqueueWaiting[queueObject.id()][0]);
					}
				}
				
				updateUI();
			}
			
			// State Helpers
			function isAnyActions() {
				return (active.length > 0 || waiting.length);
			}
			
			function isAnyMessages() {
				return (messages.length > 0);
			}
			
			function updateUI() {
				showNotifications();
				setCounts();
				
				showMessage();
				setNextMessage();
				hideMessage();
				
				hideNotifications();
			}
			
			function showNotifications() {
				if (isAnyActions() || isAnyMessages()) {
				
					if (!isVisible && !isAnyActions() && isAnyMessages()) {
							$("#notificationsContainer").hide();
							$("#notificationsFixedArea").show();
							
							isOnlyMessageVisible = true;
					} else if (isVisible && isOnlyMessageVisible && isAnyActions()) {
						
						$("#notificationsContainer").show();
						isOnlyMessageVisible = false;
						
					} else if(!isVisible) {
						$("#notificationsContainer").show();
					
						$(fixedDiv).show(
							opts.effect,
							opts.effectOptions,
							opts.effectDuration,
							function() {}
						);
						
						isOnlyMessageVisible = false;
					}

					isVisible = true;
				}
			}
			
			function setCounts() {
				if (isVisible && isAnyActions()) {
					$("#notificationsActiveCount").html(active.length);
					$("#notificationsWaitingCount").html(waiting.length);
					
					$("#notificationsActionsCount").show();
					$("#notificationsNoActions").hide();
				} else if(isVisible) {
					$("#notificationsActionsCount").hide();
					$("#notificationsNoActions").show();
				}
			}
			
			function showMessage() {
				function showMessageHelper() {
					$("#notificationMessageContainer").fadeIn(500, function() {});
					isVisible = true;
				}
			
				if (!isMessageVisible && isAnyMessages()) {
					if (!isAnyActions()) {
						// wait for actions bar to come up first
						setTimeout(showMessageHelper, opts.effectDuration);
					} else {
						showMessageHelper();
					}
				}
			}
			
			function setNextMessage() {
				// isAnyMessages() is the base condition for the recursion
				if (isAnyMessages() && !isMessageDisplaying) {
					var currentMessage = messages.shift()
					$("#notificationMessage").html(currentMessage);
					isMessageDisplaying = true;
					
					$("#notificationMessage").fadeIn(300, function() {
						// move on only when the client calls next when 
						// opts.messageDuration is set to 0
						if (opts.messageDuration > 0) {
							setTimeout(function() {
								$("#notificationMessage").fadeOut(300, function() {
									isMessageDisplaying = false;
									setNextMessage();
								});
							
							}, opts.messageDuration);
						}
					});
				} else if(!isAnyMessages()) {
					hideMessage();
				}
			}
			
			function hideMessage() {
				if (isVisible && !isMessageDisplaying && !isAnyMessages()) {
					
					$("#notificationMessageContainer").fadeOut(500, function() {
						$("#notificationMessage").html("");
						hideNotifications();
					});
				}
			}
			
			function hideNotifications() {
				if (isVisible && (!isAnyActions() && !isAnyMessages() && !isOnlyMessageVisible && 
					$("#notificationMessage").html() === "")) {
					
					setTimeout(function() {
						$(fixedDiv).hide(
							opts.effect,
							opts.effectOptions,
							opts.effectDuration,
							function() {}
						);
					}, opts.hideDelay);
				
					isVisible = false;
				}
			}

            return this;
		}
	});
})(jQuery);