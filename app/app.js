
/**
 * @class ng.app
 * @memberOf ng
 * @description This is declaration of main app module. Doing nothing but including other modules
 * */
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
    'ngAnimate',
    'ui.bootstrap'
]);
