'use strict';

describe('Controllers', function() {

    beforeEach(module('app'));

    describe('answerModalController', function() {

        var scope, answerModalController, answer;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            answer = {
                "title": "0+",
                "text": "информационная продукция для детей, не достигших возраста шести лет",
                "necessaryConditions": [],
                "conditions": []
            };
            answerModalController = $controller('answerModalController', {
                $scope: scope,
                answer: answer
            });

        }));

        it('should pass answer to scope', function() {
            expect(scope.answer).toBeDefined();
            expect(scope.answer.title).toEqual("0+");
            expect(scope.answer.text).toEqual("информационная продукция для детей, не достигших возраста шести лет");
        });

    });

    describe('questionController', function() {

        var scope, questionController, modalServiceMock, modalOptions, questionService;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            var modalResult = {
                then: function(callback) {
                    callback(); // passing fake value as result
                }
            };
            // mock version of angular-ui $modal service
            modalServiceMock = {
                open: function(options) {
                }
            };
            modalOptions = {
                templateUrl: '/templates/answer-tpl.html',
                controller: 'answerModalController',
                resolve: {
                    answer: jasmine.any(Function)
                }
            };

            spyOn(modalServiceMock, "open")
                .and
                .returnValue({ result: modalResult });

            questionService = {};
            questionService.answer = 0;
            questionService.clear = function() {
                questionService.answer = 0;
            };
            questionController = $controller('questionController', {
                $scope: scope,
                $modal: modalServiceMock,
                QuestionService: questionService
            });

        }));

        it('should open modal, when answer value changed', function() {
            questionService.answer =  42;
            scope.$digest();
            expect(modalServiceMock.open).toHaveBeenCalledWith(modalOptions);
        });

        it('should clear QuestionService after modal close', function() {
            questionService.answer =  42;
            scope.$digest();
            expect(questionService.answer).toEqual(0);
        });

    });


});