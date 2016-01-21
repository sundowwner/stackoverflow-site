'use strict';
namespace app.Controllers {
  export class HomeController {
      public questions;

      public delete(id) {
          this.HomeService.deleteQuestion(id).then((res) => {
              this.questions = this.questions.filter((b) => b._id !== id );
          })
      }
    constructor(private HomeService: app.Services.HomeService,
                private $location: ng.ILocationService,
                private $routeParams: ng.route.IRouteParamsService
    ) {
        this.questions = HomeService.getAll();
    }
  }

  angular.module('app').controller('HomeController', HomeController);
}
