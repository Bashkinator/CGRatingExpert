
/** This is declaration of main app module. */
var app = angular.module('app', [
    /* Config */
    'appConfig',
    /* Controllers */
    'appController',
    'questionController',
    'answerModalController',
    /* Services */
    'questionService',
    /* External components */
    'ui.bootstrap'
]);
