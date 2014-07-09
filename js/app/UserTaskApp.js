define(
    ['Service','EventBus'],
    function(Service,HostConfig) {
///////////////////////////////////////
// Create the application
///////////////////////////////////////
        window.UserTaskApp = Ember.Application.create();

///////////////////////////////////////
// Route / onto the usertasks view
///////////////////////////////////////
        UserTaskApp.Router.map(
            function () {
                this.resource('UserTasksView', { path: '/'});
            });

//////////////////////////////////////////////
// This route links the view to the model
//////////////////////////////////////////////
        UserTaskApp.UserTasksViewRoute = Ember.Route.extend({
            model: function () {
                return this.store.find('usertask');
            }});

///////////////////////////////////////
// UserTasksView controller
///////////////////////////////////////
        UserTaskApp.UserTasksViewController = Ember.ArrayController.extend(
            {
                actions: {
                    applyAction: function (usertask, action) {
                        usertask.set('userStatusMessage','Applying action').save();
                        Service.applyAction(action);
                    },
                    dismiss: function(usertask) {
                       this.store.deleteRecord(usertask);
                    }
                }
            });


///////////////////////////////////////
// Model - UserTask
///////////////////////////////////////
        UserTaskApp.Usertask = DS.Model.extend(
            {
                title: DS.attr('string'),
                userMessage: DS.attr('string'),
                completed: DS.attr('boolean'),
                actions: DS.attr('actions'),
                userStatusMessage: DS.attr('string'),
            }
        );

///////////////////////////////////////
// Actions transform
///////////////////////////////////////
        UserTaskApp.ActionsTransform = DS.Transform.extend(
            {
                deserialize: function (serialize) {
                    return serialize;
                },
                serialize: function(deserialize) {
                    return deserialize;
                }
            }
        );

///////////////////////////////////////
// Data Store Adapter
///////////////////////////////////////
        UserTaskApp.ApplicationAdapter = DS.FixtureAdapter.extend();
        UserTaskApp.Usertask.FIXTURES = [];

    }
);

