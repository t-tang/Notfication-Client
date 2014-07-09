define(
    ['Service','EventBus','EmberApp'],
    function(Service,EventBus) {
        'use strict';

        Service.subscribe();
        Service.userTasks();

        // EventBus handlers
        EventBus.listen('usertask', function (usertask) {
            UserTaskApp.Usertask.store.push('usertask', usertask).save();
        });

        EventBus.listen('usertasks',function(usertasks) {
            UserTaskApp.Usertask.store.pushMany('usertask', usertasks);
        });

        EventBus.listen('userTaskActionResponse', function (message) {
            // update the ui to reflect the userStatusMessage
            UserTaskApp.Usertask.store.getById('usertask',message.userTaskId)
                .set('userStatusMessage',message.userStatusMessage).save();
        });
    }
);
