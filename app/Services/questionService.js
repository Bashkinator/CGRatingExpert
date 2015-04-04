
/** This is module for Question Service. */
var questionService = angular.module('questionService', []);

/** This is Question Service - service for question managing. */
questionService.factory('QuestionService', function(Config) {
    var QuestionService = {};

    QuestionService.questions = JSON.parse(JSON.stringify(Config.questions)); // clone

    QuestionService.answers = JSON.parse(JSON.stringify(Config.answers)); // clone

    QuestionService.facts = [];

    QuestionService.clear = function() {
        QuestionService.questions = JSON.parse(JSON.stringify(Config.questions)); // clone
        QuestionService.answers = JSON.parse(JSON.stringify(Config.answers)); // clone
        QuestionService.facts = [];
    };

    QuestionService.isQuestionAvailable = function(question) {
        return question.conditions.every(function(condition) {
            return QuestionService.facts.indexOf(condition) != -1;
        });
    };

    QuestionService.chooseOption = function(question, option) {
        switch(question.type) {
            case "OneAnswer":
                question.options.forEach(function(o) {
                    var yesIndex = QuestionService.facts.indexOf(o.yes);
                    var noIndex = QuestionService.facts.indexOf(o.no);
                    if (o == option) {
                        if (o.yes && yesIndex == -1) {
                            QuestionService.facts.push(o.yes);
                        }
                        if (o.no && noIndex != -1) {
                            QuestionService.facts.array.splice(noIndex, 1);
                        }
                    } else {
                        if (o.yes && yesIndex != -1) {
                            QuestionService.facts.splice(yesIndex, 1);
                        }
                        if (o.no && noIndex == -1) {
                            QuestionService.facts.push(o.no);
                        }
                    }
                });
                break;
            case "MultipleAnswers":
                var yesIndex = QuestionService.facts.indexOf(option.yes);
                var noIndex = QuestionService.facts.indexOf(option.no);
                if (option.isChosen) {
                    if (option.yes && yesIndex == -1) {
                        QuestionService.facts.push(option.yes);
                    }
                    if (option.no && noIndex != -1) {
                        QuestionService.facts.splice(noIndex, 1);
                    }
                } else {
                    if (option.yes && yesIndex != -1) {
                        QuestionService.facts.splice(yesIndex, 1);
                    }
                    if (option.no && noIndex == -1) {
                        QuestionService.facts.push(option.no);
                    }
                }
                break;
        }
        QuestionService.answer = QuestionService.checkAnswers();
    };

    QuestionService.checkAnswers = function() {
        if (Config.onlyFirstAnswer) {
            var answer;
            QuestionService.answers.some(function(a) {
                if (QuestionService.checkAnswerNecessaryConditions(a.necessaryConditions) &&
                    QuestionService.checkAnswerConditions(a.conditions)) {
                        answer = a;
                        return true;
                }
            });
            return answer;
        } else {
            // TODO: implement return of all suitable answers
        }
    };

    QuestionService.checkAnswerNecessaryConditions = function(conditions) {
        return conditions.every(function(condition) {
            return QuestionService.facts.indexOf(condition) != -1;
        });
    };

    QuestionService.checkAnswerConditions = function(conditions) {
        return conditions.some(function(condition) {
            return QuestionService.checkAnswerNecessaryConditions(condition);
        });
    };

    return QuestionService;
});