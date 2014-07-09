requirejs.config({
    baseUrl: 'js',

    paths: {
        EmberApp: 'app/UserTaskApp',
        RestRequest: 'app/RestRequest',
        SseChannel: 'app/SseChannel',
        Service: 'app/Service',
        EventBus: 'app/EventBus',
        HostConfig: 'env/dev1/HostConfig'
    }
});

requirejs(['app/Main']);
