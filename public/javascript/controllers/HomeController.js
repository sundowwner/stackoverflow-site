'use strict';
var app;
(function (app) {
    var Controllers;
    (function (Controllers) {
        var HomeController = (function () {
            function HomeController(HomeService, $location, $routeParams) {
                this.HomeService = HomeService;
                this.$location = $location;
                this.$routeParams = $routeParams;
                this.questions = HomeService.getAll();
            }
            HomeController.prototype.delete = function (id) {
                var _this = this;
                this.HomeService.deleteQuestion(id).then(function (res) {
                    _this.questions = _this.questions.filter(function (b) { return b._id !== id; });
                });
            };
            return HomeController;
        })();
        Controllers.HomeController = HomeController;
        angular.module('app').controller('HomeController', HomeController);
    })(Controllers = app.Controllers || (app.Controllers = {}));
})(app || (app = {}));
