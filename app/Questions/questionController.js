
/** This is module for questionController. */
var questionController = angular.module('questionController', []);

/** This is questionController - controller for questions. */
questionController.controller('questionController', function($scope, $modal, QuestionService) {

    $scope.QuestionService = QuestionService;

    $scope.questionFilter = QuestionService.isQuestionAvailable;

});