"use strict";
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var CreateQuestionController = (function () {
            function CreateQuestionController(HomeService, $location) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.question = {};
            }
            CreateQuestionController.prototype.askQuestion = function () {
                var _this = this;
                this.HomeService.saveQuestion(this.question).then(function (res) {
                    _this.$location.path("/");
                });
            };
            return CreateQuestionController;
        })();
        Controllers.CreateQuestionController = CreateQuestionController;
        angular.module("app").controller("CreateQuestionController", CreateQuestionController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
