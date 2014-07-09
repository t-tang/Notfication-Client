define(
    ['RestRequest','SseChannel'],
    function(RestRequest,SseChannel){
        'use strict';
        
        var serviceUrls = {
            subscribe: 'subscribe',
            usertasks: 'usertasks'
        };

        function subscribe() {
            var sse = new SseChannel(serviceUrls.subscribe);
        }

        function userTasks() {
            new RestRequest(serviceUrls.usertasks).get();
        }

        function applyAction(action) {
            new RestRequest(action.url).get();
        }

        return Object.freeze({
            subscribe: subscribe,
            userTasks: userTasks,
            applyAction: applyAction
        });
    });

