/**
 * Simple EventBus
 */
define(function() {
    'use strict';

    var listeners = {};

    function listen(topic, callback) {
        if (listeners[topic] === undefined) {
            listeners[topic] = [];
        }

        listeners[topic].push(callback);
    }

    function post(topic, message) {
        if (listeners[topic] !== undefined) {
            var listenerList = listeners[topic];
            for (var i = 0; i < listenerList.length; i++) {
                try {
                    listenerList[i](message);
                } catch (err) {
                    console.log('Warning: ' + topic + ' listener threw an exception. ',err);
                }
            }
        } else {
            console.log('Warning: no listeners for ' + topic);
        }
    }

    return Object.freeze({
       listen: listen,
       post: post
    });
});
