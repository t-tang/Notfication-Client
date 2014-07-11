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
                hideNotifications : false,

                actions: {
                    toggleList: function () {
                        this.set('hideNotifications',!this.get('hideNotifications'));
                    }
                }
            });

///////////////////////////////////////
// UserTask Controller
///////////////////////////////////////
        UserTaskApp.UsertaskController = Ember.ObjectController.extend({

            isOutstanding: function (key,value) {
                if (value !== undefined) {throw new Error(key + 'is a read only property');}
                return this.get('model.status') === 'OUTSTANDING';
            }.property('model.status'),

            isActioned: function (key,value) {
                if (value !== undefined) {throw new Error(key + 'is a read only property');}
                return this.get('model.status') === 'ACTIONED';
            }.property('model.status'),

            isCompleted : function(key,value) {
                if (value !== undefined) {throw new Error(key + 'is a read only property');}
                return this.get('model.status') === 'COMPLETED';
            }.property('model.status'),

            actions: {
                applyAction: function (action) {
                    Service.applyAction(action);
                    this.get('model').set('pending',false).set('actioned',true).save();
                },

                dismiss: function() {
                    if (this.get('model.status') === 'COMPLETED') {
                        this.store.deleteRecord(this.get('model'));
                    }
                }
            }
        });

///////////////////////////////////////
// Model - UserTask
///////////////////////////////////////
        UserTaskApp.Usertask = DS.Model.extend(
            {
                title: DS.attr('string'),
                status: DS.attr('string'),
                userMessage: DS.attr('string'),
                actions: DS.attr('actions'),
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

