/*
*	JQuery.AjaxQueue
*
*	Author: Rui Jiang (rui.jiang@zsassociates.com)
*	Purpose: Represents a queue of AJAX actions. Can be used to force
* 	         synchronicity or detect how many actions are actively running.
*			 Can be used on its own or in conjunction with JQuery.Notifications.
* 	Notes: Requires Math.uuid.js from http://www.broofa.com/Tools/Math.uuid.js.
*
*   -----------------------------------------------------------------------------------------------
*
*	Configuration Options:
*	[optional] (number)
*	concurrentActions	: Number of actions allowed to run at the same time. Set to
*						  0 or leave it unset for unlimited.
*
*
*	Properties:
*	active		: Array of the names of active actions waiting for a response.
*	waiting		: Array of the names of waiting actions.
*
*	Methods:
*	(returns null)
*	addAction(params)	: Add a new JQuery AJAX action. Valid params are any which
*						  can be specified as part of a $.Ajax() call. Check out
*						  http://docs.jquery.com/Ajax/jQuery.ajax#options for
*						  valid parameters.
*
*						  One additional parameter that must be specified is "name".
*						  "name" is the title of the action (ie. "Adding Object").
*						  You will also need to specify the "success" parameter to
*						  have your Ajax call perform a function upon server
*						  response.
*
*						  An optional parameter "cancel" can be given to provide a 
*						  a function to call in the event the action is canceled
*						  (see cancelAction()).
*
*   (returns null)
*	cancelAction(actionName)	: Remove all JQuery AJAX actions named actionName.
*						  Queued actions will not have requests made, and active 
*						  actions will ignore their responses.  If one or more 
*						  actions are canceled, then queued actions will be run
*						  up to the concurrent limit.
*
*	(returns null)
*	clearWaitingActions()	: Clears any waiting actions. These will never execute.
*
*	(returns null)
*	setPreAction(fn)	: A function you should not have to call. Used by 
*						  Notifications to update itself before an Ajax call.
*
*	[returns null]
*	setPostAddAction(fn)    : A function you should not have to call. Used by
*                                                 Notifications to update itself after adding an action.
*
*	(returns null)
*	setPostAction(fn)	: A function you should not have to call. Used by
*						  Notifications to update itself after an Ajax call.
*
*   -----------------------------------------------------------------------------------------------
*
*   Usage:
*
*   var ajaxqueue = $().ajaxqueue({
*   	concurrentActions: 3
*   });
*
*   ajaxqueue.addAction({
*       name: "new action",
*       type: "POST",
*       url: "../ajax/testechoaction",
*       data: {},
*       success: function(response) {
*           $('#actionqueOutput').append(response + "<br />");
*       },
*       error: function(XMLHttpRequest, textStatus, errorThrown) {
*           $('#actionqueOutput').append(textStatus + "<br />");
*       }
*   });
*
*/

(function($) {
    $.fn.extend({
        ajaxqueue: function(options) {
            // Region: Constructing Plugin
            var defaults = {
                concurrentActions: 0
            };

            var opts = defaults;

            if (options) {
                opts = $.extend(defaults, options);
            }

            // Region: Fields
            var active = [];
            var queue = [];
            var idCount = 0;

            var preAction = null;
            var postAddAction = null;
            var postAction = null;

            var id = Math.uuid();

            // Region: Properties
            this.active = function() {
                var actives = [];

                for (var index = 0; index < active.length; index++) {
                    actives.push(active[index].action.name);
                }

                return actives;
            }

            this.waiting = function() {
                var queued = [];

                for (var index = 0; index < queue.length; index++) {
                    queued.push(queue[index].action.name);
                }

                return queued;
            }

            this.id = function() {
                return id;
            }

            // Region: Public Functions
            this.addAction = function(params) {
                var newAction = ajaxAction(params);

                if (opts.concurrentActions === 0 || active.length < opts.concurrentActions) {
                    active.push({
                        id: newAction.id,
                        action: newAction
                    });

                    // execute
                    newAction.ajax();
                } else {
                    queue.push({
                        id: newAction.id,
                        action: newAction
                    });
                }

                if (postAddAction) {
                    postAddAction();
                }

                idCount++;
            }

            this.cancelAction = function(actionName) {
                var matchesName = function(item) { return (item.action.name === actionName); };
                var cancelActive = $.grep(active, matchesName);
                var cancelQueue = $.grep(queue, matchesName);
                for (var index = 0; index < cancelActive.length; index++) {
                    removeActionFromArray(cancelActive[index].id, active);
                    cancelActive[index].action.cancel();
                }
                for (var index = 0; index < cancelQueue.length; index++) {
                    removeActionFromArray(cancelQueue[index].id, queue);
                    cancelQueue[index].action.cancel();
                }
                startNextAction();
            }

            this.clearWaitingActions = function() {
                queue = [];
            }

            this.setPostAddAction = function(fn) {
                postAddAction = fn;
            }

            this.setPreAction = function(fn) {
                preAction = fn;
            }

            this.setPostAction = function(fn) {
                postAction = fn;
            }

            // Region: Private Functions
            function completeAction(actionId) {
                var result = removeActionFromArray(actionId, active);

                if (postAction) {
                    postAction();
                }

                startNextAction();

                return result;
            }

            function startNextAction() {
                while (opts.concurrentActions > 0 && queue.length > 0 && active.length < opts.concurrentActions) {
                    var nextActionObject = queue.shift();

                    active.push({
                        id: nextActionObject.id,
                        action: nextActionObject.action
                    });
                    
                    if (preAction) {
                        preAction();
                    }

                    // execute
                    nextActionObject.action.ajax();
                }
            }

            function removeActionFromArray(actionId, array) {
                var spliceIndex = -1;

                for (var index = 0; index < array.length; index++) {
                    if (array[index].id === actionId) {
                        spliceIndex = index;
                        break;
                    }
                }

                if (spliceIndex >= 0) {
                    array.splice(spliceIndex, 1);
                    return true;
                }
                return false;
            }

            // Region: Supporting Objects
            var ajaxAction = function(params) {
                var actionSuccess, actionError;
                var actionId = "action_" + idCount;

                // need to hold this separately to prevent infinite loop
                var paramsSuccess = params.success;

                // there are 2 signatures for the success function
                if (paramsSuccess.length === 1) {
                    actionSuccess = function(data) {
                        if (completeAction(actionId)) paramsSuccess(data);
                    }
                } else if (paramsSuccess.length === 2) {
                    actionSuccess = function(data, textStatus) {
                        if (completeAction(actionId)) paramsSuccess(data, textStatus);
                    }
                } else if (paramsSuccess.length === 3) {
                    actionSuccess = function(data, textStatus, request) {
                        if (completeAction(actionId)) paramsSuccess(data, textStatus, request);
                    }
                }

                params.success = actionSuccess;

                // only 1 possible signature for error function
                var paramsError;

                if (params.error) {
                    paramsError = params.error;

                    actionError = function(XMLHttpRequest, textStatus, errorThrown) {
                        if (completeAction(actionId)) paramsError(XMLHttpRequest, textStatus, errorThrown);
                    }
                    params.error = actionError;
                }

                return {
                    id: actionId,
                    name: params.name,
                    ajax: function() {
                        $.ajax(params);
                    },
                    cancel: function() {
                        if (params.cancel) {
                            if (params.context) {
                                params.cancel.apply(params.context, []);
                            } else {
                                params.cancel();
                            }
                        }
                    }
                }
            }

            return this;
        }
    });
})(jQuery);

/*!
Math.uuid.js (v1.4)
http://www.broofa.com
mailto:robert@broofa.com

Copyright (c) 2009 Robert Kieffer
Dual licensed under the MIT and GPL licenses.
*/

/*
 * Generate a random uuid.
 *
 * USAGE: Math.uuid(length, radix)
 *   length - the desired number of characters
 *   radix  - the number of allowable values for each character.
 *
 * EXAMPLES:
 *   // No arguments  - returns RFC4122, version 4 ID
 *   >>> Math.uuid()
 *   "92329D39-6F5C-4520-ABFC-AAB64544E172"
 * 
 *   // One argument - returns ID of the specified length
 *   >>> Math.uuid(15)     // 15 character ID (default base=62)
 *   "VcydxgltxrVZSTV"
 *
 *   // Two arguments - returns ID of the specified length, and radix. (Radix must be <= 62)
 *   >>> Math.uuid(8, 2)  // 8 character ID (base=2)
 *   "01001010"
 *   >>> Math.uuid(8, 10) // 8 character ID (base=10)
 *   "47473046"
 *   >>> Math.uuid(8, 16) // 8 character ID (base=16)
 *   "098F4D35"
 */
Math.uuid = (function() {
  // Private array of chars to use
  var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''); 

  return function (len, radix) {
    var chars = CHARS, uuid = [];
    radix = radix || chars.length;

    if (len) {
      // Compact form
      for (var i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;

      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';

      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (var i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }

    return uuid.join('');
  };
})();