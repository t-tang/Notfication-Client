define(
    function() {
        'use strict';
        var hostUrl = 'http://192.168.56.1:8080/';
        return Object.freeze({
            baseUrl: hostUrl + 'services/'
        });
    }
);