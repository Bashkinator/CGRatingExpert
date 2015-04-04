
/** This is module for questionController. */
var questionController = angular.module('questionController', []);

/** This is questionController - controller for questions. */
questionController.controller('questionController', function($scope, $modal, QuestionService) {

    $scope.QuestionService = QuestionService;

    $scope.questionFilter = QuestionService.isQuestionAvailable;

    $scope.$watch('QuestionService.answer', function(newAnswer) {
        if (newAnswer) {
            $modal.open({
                templateUrl: '/templates/answer-tpl.html',
                controller: 'answerModalController',
                resolve: {
                    answer: function () {
                        return newAnswer;
                    }
                }
            }).result.then(function() {
                    QuestionService.clear();
            }, function() {
                    QuestionService.clear();
            });
        }
    });

});