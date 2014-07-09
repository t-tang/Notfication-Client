/* global DS Ember */
define(
    ['Service','EventBus'],
    function(Service) {
        'use strict';
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
            });

///////////////////////////////////////
// UserTask Controller
///////////////////////////////////////
        UserTaskApp.UsertaskController = Ember.ObjectController.extend({

            isNotCompleted : function(key,value) {
                var model = this.get('model');

                if (value === undefined) {
                    return !model.get('completed');
                } else {
                    throw new Error(key + ' is a readonly property');
                }
            }.property('model.completed'),

            isNotPending : function(key,value) {
                var model = this.get('model');

                if (value === undefined) {
                    return !model.get('pending');
                } else {
                    throw new Error(key + ' is a readonly property');
                }
            }.property('model.pending'),

            actions: {
                applyAction: function (action) {
                    var model = this.get('model');
                    model.set('pending',false).set('actioned',true).save();
                    Service.applyAction(action);
                },

                dismiss: function() {
                    this.store.deleteRecord(this.get('model'));
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
                actions: DS.attr('actions'),
                pending: DS.attr('boolean'),
                actioned: DS.attr('boolean'),
                completed: DS.attr('boolean'),
                userStatusMessage: DS.attr('string')
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

