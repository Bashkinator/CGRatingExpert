
/** This is module for appController. */
var appController = angular.module('appController', []);

/** This is appController - main controller of entire app. */
appController.controller('appController', function($scope) {
    $scope.angularHello = "And good morning to Angular!";
});