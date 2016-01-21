"use strict";
namespace app.Services {
  export class HomeService {
      public QuestionResource;

      public getAll()   {
          return this.QuestionResource.query();
      }
      public getQuestion(questionId) {
          return this.QuestionResource.get({ id: questionId});
      }

      public saveQuestion(question) {
          return this.QuestionResource.save(question).$promise;
      }
      public updateQuestion(question)   {
          return this.QuestionResource.update({ id: question._id }, question).$promise;
      }
      public deleteQuestion(questionId) {
          return this.QuestionResource.delete({ _id: questionId }).$promise;
      }


    constructor(private $resource: ng.resource.IResourceService) {
        this.QuestionResource = $resource("/questions/:id", null, {
            "update": { method: "PUT" }
        });
    }
  }

  angular.module('app').service('HomeService', HomeService);
}
