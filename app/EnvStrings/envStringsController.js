
/** This is module for appController. */
var envStringsController = angular.module('envStringsController', []);

/** This is appController - main controller of entire app. */
envStringsController.controller('envStringsController', function($scope, Config) {
    $scope.commonString = Config.commonString;
    $scope.envString = Config.envString;
});