
/** This is module for answerModalController. */
var answerModalController = angular.module('answerModalController', []);

/** This is answerModalController - controller for modal windows with answer. */
answerModalController.controller('answerModalController', function($scope, $modalInstance, answer) {

    $scope.answer = answer;

});
