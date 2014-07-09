define(
    ['EventBus','HostConfig','RestRequest'],
    function(EventBus,HostConfig)  {
        'user strict';
        // Sse ctor
        var SseChannel = function(serviceUrl) {
            this.eventSource = new EventSource(HostConfig.baseUrl + serviceUrl);
            this.eventSource.onmessage = function(message) {
                    if (message.data !== undefined) {
                        var data = $.parseJSON(message.data);
                        if (typeof(data) === 'object') {
                            for (var item in data) {
                                EventBus.post(item, data[item]);
                            }
                        } else {
                            console.log('Expected Object, but received ',data);
                        }
                    }
            }
        }

        return Object.freeze(SseChannel);
    }
)
