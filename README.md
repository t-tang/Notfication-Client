Real time Ember notification client
===================================

This POC demonstrates an Html5-Ember client for real-time enterprise class applications. The client uses Server Side Events (server side push) for broadcasting changes and REST calls for interacting with the server side.

A notification contains actions which are rendered as buttons, on a button click a REST call is triggered to perform the actual action. Real time data updates and REST responses are published onto an event bus for consumption by the application.

It is envisaged that notifications would form part of a workflow, whenever user decision are needed, the workflow would pop up a notification with the relevant actions at that point.

