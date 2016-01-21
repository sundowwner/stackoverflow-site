"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        angular.module('app').factory('HTTPFactory', function ($window) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    config.headers['Accepts'] = 'application/json';
                    config.headers['Content-Type'] = 'application/json';
                    if ($window.localStorage.getItem("token")) {
                        config.headers["Authorization"] = "Bearer " + $window.localStorage.getItem("token");
                    }
                    return config;
                }
            };
        });
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
