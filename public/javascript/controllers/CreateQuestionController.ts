"use strict";
namespace app.Controllers{
    export class CreateQuestionController{
        public question = {};

        public askQuestion()    {
            this.HomeService.saveQuestion(this.question).then((res) => {
                this.$location.path("/")
            })
        }


        constructor(
            private HomeService: app.Services.HomeService,
            private $location: ng.ILocationService
        ){

        }

    }
    angular.module("app").controller("CreateQuestionController",CreateQuestionController);
}
