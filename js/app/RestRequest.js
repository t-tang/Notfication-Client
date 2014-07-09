define(
    ['HostConfig','EventBus'],
    function(HostConfig,EventBus){
        'use strict';
        // Rest request ctor
        var RestRequest = function(serviceUrl,queryParams) {
            this.url = HostConfig.baseUrl + serviceUrl;
            this.data = queryParams;
        };

        RestRequest.prototype.crossDomain = true;
        RestRequest.prototype.get = function() {
            $.getJSON(this.url,this.data).done(function(response){
                for (var item in response) {
                    EventBus.post(item,response[item]);
                }
            });
        };

        return Object.freeze(RestRequest);
    });
