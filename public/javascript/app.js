'use strict';
var App;
(function (App) {
    angular.module('app', ['ngRoute', 'ngResource'])
        .config(function ($routeProvider, $locationProvider, $httpProvider) {
        $routeProvider
            .when('/', {
            templateUrl: '/templates/Home.html',
            controller: app.Controllers.HomeController,
            controllerAs: 'vm'
        })
            .when("/login", {
            templateUrl: "/templates/Login.html",
            controller: app.Controllers.UserController,
            controllerAs: "vm"
        })
            .when("/register", {
            templateUrl: "/templates/Register.html",
            controller: app.Controllers.UserController,
            controllerAs: "vm"
        })
            .when("/questions", {
            templateUrl: "/templates/CreateQuestion.html",
            controller: app.Controllers.CreateQuestionController,
            controllerAs: "vm"
        })
            .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
        $httpProvider.interceptors.push('HTTPFactory');
    });
})(App || (App = {}));
