'use strict';

describe('Services', function() {

    beforeEach(module('app'));

    describe('questionService', function() {

        it('should init properly', inject(function(QuestionService, Config) {
            expect(QuestionService.answers).toEqual(Config.answers);
            expect(QuestionService.questions).toEqual(Config.questions);
            var facts = [];
            QuestionService.questions.forEach(function(question) {
                question.options.forEach(function(option) {
                    if (option.no && facts.indexOf(option.no) == -1)
                        facts.push(option.no);
                });
            });
            expect(QuestionService.facts).toEqual(facts);
        }));

        it('should return false for unavailable question', inject(function(QuestionService) {
            var result = QuestionService.isQuestionAvailable({
                conditions: ["test fact"]
            });
            expect(result).toBeFalsy();
        }));

        it('should return true for available question', inject(function(QuestionService) {
            QuestionService.facts.push("test fact");
            var result = QuestionService.isQuestionAvailable({
                conditions: ["test fact"]
            });
            expect(result).toBeTruthy();
        }));

        it('should check several condition and return false', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact3");
            var result = QuestionService.isQuestionAvailable({
                conditions: ["test fact1", "test fact2", "test fact3"]
            });
            expect(result).toBeFalsy();
        }));

        it('should check several condition and return true', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact2");
            QuestionService.facts.push("test fact3");
            var result = QuestionService.isQuestionAvailable({
                conditions: ["test fact1", "test fact1", "test fact3"]
            });
            expect(result).toBeTruthy();
        }));

        it('should return false for answer necessaryCondition check', inject(function(QuestionService) {
            var result = QuestionService.checkAnswerNecessaryConditions(["test fact"]);
            expect(result).toBeFalsy();
        }));

        it('should return true for answer necessaryCondition check', inject(function(QuestionService) {
            QuestionService.facts.push("test fact");
            var result = QuestionService.checkAnswerNecessaryConditions(["test fact"]);
            expect(result).toBeTruthy();
        }));

        it('should check several condition and return false for answer necessaryCondition check', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact3");
            var result = QuestionService.checkAnswerNecessaryConditions(["test fact1", "test fact2", "test fact3"]);
            expect(result).toBeFalsy();
        }));

        it('should check several condition and return true for answer necessaryCondition check', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact2");
            QuestionService.facts.push("test fact3");
            var result = QuestionService.checkAnswerNecessaryConditions(["test fact1", "test fact1", "test fact3"]);
            expect(result).toBeTruthy();
        }));

        it('should check answer conditions and return true', inject(function(QuestionService) {
            QuestionService.facts.push("test fact2");
            QuestionService.facts.push("test fact3");
            var result = QuestionService.checkAnswerConditions([
                ["test fact1"],
                ["test fact2", "test fact3"]
            ]);
            expect(result).toBeTruthy();
        }));
        it('should check answer conditions and return false', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact3");
            var result = QuestionService.checkAnswerConditions([
                ["test fact1", "test fact2"],
                ["test fact2", "test fact3"]
            ]);
            expect(result).toBeFalsy();
        }));

        it('should check answers conditions and return undefined', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact2");
            QuestionService.facts.push("test fact3");
            QuestionService.answers = [
                {
                    necessaryConditions: ["test fact1", "test fact2"],
                    conditions: [
                        ["test fact4"], ["test fact5", "test fact6"]
                    ]
                },
                {
                    necessaryConditions: ["test fact1", "test fact2", "test fact7"],
                    conditions: [
                        ["test fact4"], ["test fact1", "test fact3"]
                    ]
                }
            ];
            var result = QuestionService.checkAnswers();
            expect(result).toBeUndefined();
        }));

        it('should check answers conditions and return second answer', inject(function(QuestionService) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact2");
            QuestionService.facts.push("test fact3");
            QuestionService.answers = [
                {
                    necessaryConditions: ["test fact1", "test fact2"],
                    conditions: [
                        ["test fact4"], ["test fact5", "test fact6"]
                    ]
                },
                {
                    necessaryConditions: ["test fact1", "test fact2"],
                    conditions: [
                        ["test fact3"], ["test fact5", "test fact6"]
                    ]
                }
            ];
            var result = QuestionService.checkAnswers();
            expect(result).toEqual(QuestionService.answers[1]);
        }));
        it('should do nothing if Config.onlyFirstAnswer is falsy', inject(function(QuestionService, Config) {
            QuestionService.facts.push("test fact1");
            QuestionService.facts.push("test fact2");
            QuestionService.facts.push("test fact3");
            QuestionService.answers = [
                {
                    necessaryConditions: ["test fact1", "test fact2"],
                    conditions: [
                        ["test fact4"], ["test fact5", "test fact6"]
                    ]
                },
                {
                    necessaryConditions: ["test fact1", "test fact2"],
                    conditions: [
                        ["test fact3"], ["test fact5", "test fact6"]
                    ]
                }
            ];
            Config.onlyFirstAnswer = false;
            var result = QuestionService.checkAnswers();
            expect(result).toBeUndefined();
        }));

        it('should add yes-fact to facts and remove no-fact', inject(function(QuestionService) {
            var option = { yes: "yes-fact", no: "no-fact"};
            QuestionService.facts.push(option.no);
            var question = {
                type: "OneAnswer",
                options: [option]
            };
            QuestionService.chooseOption(question, option);
            expect(QuestionService.facts.indexOf(option.yes)).not.toEqual(-1);
        }));

        it('should do nothing because all already done', inject(function(QuestionService) {
            var option = { yes: "yes-fact", no: "no-fact"};
            QuestionService.facts.push(option.yes);
            var question = {
                type: "OneAnswer",
                options: [option]
            };
            QuestionService.chooseOption(question, option);
            expect(QuestionService.facts.indexOf(option.yes)).not.toEqual(-1);
        }));
        it('should choose option and disable others', inject(function(QuestionService) {
            var option1 = { yes: "yes-fact", no: "no-fact"};
            var option2 = { yes: "yes-fact2", no: "no-fact2"};
            QuestionService.facts.push(option2.yes);
            var question = {
                type: "OneAnswer",
                options: [option1, option2]
            };
            QuestionService.chooseOption(question, option1);
            expect(QuestionService.facts.indexOf(option1.yes)).not.toEqual(-1);
        }));
        it('should do nothing because all already done', inject(function(QuestionService) {
            var option1 = { yes: "yes-fact", no: "no-fact"};
            var option2 = { yes: "yes-fact2", no: "no-fact2"};
            QuestionService.facts.push(option1.yes);
            QuestionService.facts.push(option2.no);
            var question = {
                type: "OneAnswer",
                options: [option1, option2]
            };
            QuestionService.chooseOption(question, option1);
            expect(QuestionService.facts.indexOf(option1.yes)).not.toEqual(-1);
        }));

        it('should toggle one option', inject(function(QuestionService) {
            var option1 = { yes: "yes-fact", no: "no-fact", isChosen:true };
            var option2 = { yes: "yes-fact2", no: "no-fact2"};
            QuestionService.facts.push(option1.no);
            var question = {
                type: "MultipleAnswers",
                options: [option1, option2]
            };
            QuestionService.chooseOption(question, option1);
            expect(option1.isChosen).toBeTruthy();
            expect(QuestionService.facts.indexOf(option1.yes)).not.toEqual(-1);
        }));

        it('should do nothing', inject(function(QuestionService) {
            var option1 = { yes: "yes-fact", no: "no-fact", isChosen:true };
            var option2 = { yes: "yes-fact2", no: "no-fact2"};
            QuestionService.facts.push(option1.yes);
            var question = {
                type: "MultipleAnswers",
                options: [option1, option2]
            };
            QuestionService.chooseOption(question, option1);
            expect(option1.isChosen).toBeTruthy();
            expect(QuestionService.facts.indexOf(option1.yes)).not.toEqual(-1);
        }));

        it('should do nothing', inject(function(QuestionService) {
            var option1 = { yes: "yes-fact", no: "no-fact", isChosen:false };
            var option2 = { yes: "yes-fact2", no: "no-fact2"};
            QuestionService.facts.push(option1.yes);
            var question = {
                type: "MultipleAnswers",
                options: [option1, option2]
            };
            QuestionService.chooseOption(question, option1);
            expect(option1.isChosen).toBeFalsy();
            expect(QuestionService.facts.indexOf(option1.yes)).toEqual(-1);
        }));

        it('should do nothing', inject(function(QuestionService) {
            var option1 = { yes: "yes-fact", no: "no-fact", isChosen:false };
            var option2 = { yes: "yes-fact2", no: "no-fact2"};
            QuestionService.facts.push(option1.no);
            var question = {
                type: "MultipleAnswers",
                options: [option1, option2]
            };
            QuestionService.chooseOption(question, option1);
            expect(option1.isChosen).toBeFalsy();
            expect(QuestionService.facts.indexOf(option1.yes)).toEqual(-1);
        }));
    });

});