
/**
 * @class ng.answerModalController
 * @memberOf ng
 * @description This is module for questionController
 * */
var answerModalController = angular.module('answerModalController', []);

/**
 * @class ng.answerModalController.answerModalController
 * @memberOf ng.answerModalController
 * @description This is answerModalController - controller for modal windows with answer. It just shows title and text of answer
 * */
answerModalController.controller('answerModalController', function($scope, answer) {

    /**
     * @name $scope.answer
     * @object
     * @memberOf ng.answerModalController.answerModalController
     * @description Scope access for answer
     */
    $scope.answer = answer;

});
