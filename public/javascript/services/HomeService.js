"use strict";
var app;
(function (app) {
    var Services;
    (function (Services) {
        var HomeService = (function () {
            function HomeService($resource) {
                this.$resource = $resource;
                this.QuestionResource = $resource("/questions/:id", null, {
                    "update": { method: "PUT" }
                });
            }
            HomeService.prototype.getAll = function () {
                return this.QuestionResource.query();
            };
            HomeService.prototype.getQuestion = function (questionId) {
                return this.QuestionResource.get({ id: questionId });
            };
            HomeService.prototype.saveQuestion = function (question) {
                return this.QuestionResource.save(question).$promise;
            };
            HomeService.prototype.updateQuestion = function (question) {
                return this.QuestionResource.update({ id: question._id }, question).$promise;
            };
            HomeService.prototype.deleteQuestion = function (questionId) {
                return this.QuestionResource.delete({ _id: questionId }).$promise;
            };
            return HomeService;
        })();
        Services.HomeService = HomeService;
        angular.module('app').service('HomeService', HomeService);
    })(Services = app.Services || (app.Services = {}));
})(app || (app = {}));
