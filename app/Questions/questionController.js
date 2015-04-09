
/**
 * @class ng.questionController
 * @memberOf ng
 * @description This is module for questionController
 * */
var questionController = angular.module('questionController', []);

/**
 * @class ng.questionController.questionController
 * @memberOf ng.questionController
 * @description This is questionController - controller for questions
 * @param $scope - angular scope service
 * @param $modal - service for creating modal windows from angular-bootstrap
 * @param QuestionService - service for question control
 * */
questionController.controller('questionController', function($scope, $modal, QuestionService) {

    /**
     * @name $scope.QuestionService
     * @object
     * @memberOf ng.questionController.questionController
     * @description Scope access for Question service
     */
    $scope.QuestionService = QuestionService;

    /**
     * @name $scope.questionFilter
     * @object
     * @memberOf ng.questionController.questionController
     * @description Scope access to question filter by availability
     */
    $scope.questionFilter = QuestionService.isQuestionAvailable;

    /**
     * @name $scope.$watch('QuestionService.answer')
     * @function
     * @memberOf ng.questionController.questionController
     * @description Watch for QuestionService.answer. When QuestionService.answer is changed to defined value, opens a modal window with answer
     * @listens QuestionService.answer_change
     * @param newAnswer - new value of QuestionService.answer
     */
    $scope.$watch('QuestionService.answer', function(newAnswer) {
        if (newAnswer) {
            $modal.open({
                templateUrl: 'templates/answer-tpl.html',
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