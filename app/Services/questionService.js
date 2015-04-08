
/**
 * @class ng.questionService
 * @memberOf ng
 * @description This is module for Question Service
 * */
var questionService = angular.module('questionService', []);

/**
 * @class ng.questionService.QuestionService
 * @memberOf ng.questionService
 * @description This is Question Service - service for question managing
 */
questionService.factory('QuestionService', function(Config) {
    var QuestionService = {};

    /**
     * @name clear
     * @function
     * @memberOf ng.questionService.QuestionService
     * @description Function for start init and clear of QuestionService object
     */
    QuestionService.clear = function() {
        /**
         * @name questions
         * @object
         * @memberOf ng.questionService.QuestionService
         * @description Array of questions
         */
        QuestionService.questions = angular.copy(Config.questions);
        /**
         * @name answers
         * @object
         * @memberOf ng.questionService.QuestionService
         * @description Array of answers
         */
        QuestionService.answers = angular.copy(Config.answers);
        /**
         * @name facts
         * @object
         * @memberOf ng.questionService.QuestionService
         * @description Empty array for facts
         */
        QuestionService.facts = [];
        /** Set default facts ('no' for each option) */
        QuestionService.questions.forEach(function(question) {
            question.options.forEach(function(option) {
                if (option.no && QuestionService.facts.indexOf(option.no) == -1)
                    QuestionService.facts.push(option.no);
            });
        });
    };

    QuestionService.clear();

    /**
     * @name isQuestionAvailable
     * @function
     * @memberOf ng.questionService.QuestionService
     * @description Function for check availability of question
     * @param question - question-object for check
     * @returns true - if every fact in conditions is true
     * @returns false - if some of facts in condition are falsy
     */
    QuestionService.isQuestionAvailable = function(question) {
        return question.conditions.every(function(condition) {
            return QuestionService.facts.indexOf(condition) != -1;
        });
    };

    /**
     * @name chooseOption
     * @function
     * @memberOf ng.questionService.QuestionService
     * @description Function for choosing option in question. Marks option as chosen, makes 'yes'-fact of option truthy and check if some of answers becomes right one.
     * @param question - current question
     * @param option - chosen option
     */
    QuestionService.chooseOption = function(question, option) {
        switch(question.type) {
            case "OneAnswer":
                question.options.forEach(function(o) {
                    var yesIndex = QuestionService.facts.indexOf(o.yes);
                    var noIndex = QuestionService.facts.indexOf(o.no);
                    if (o == option) {
                        if (o.no && noIndex != -1) {
                            QuestionService.facts.splice(noIndex, 1);
                        }
                        if (o.yes && yesIndex == -1) {
                            QuestionService.facts.push(o.yes);
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

    /**
     * @name checkAnswers
     * @function
     * @memberOf ng.questionService.QuestionService
     * @description Function for checking if some of answers is right answer
     * @returns right answer if there is any
     * @returns undefined if there isn't
     */
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
            // TODO: implement returning of all suitable answers
        }
    };

    /**
     * @name checkAnswerNecessaryConditions
     * @function
     * @memberOf ng.questionService.QuestionService
     * @description Function for checking necessary conditions of answer
     * @params conditions - set of facts for checking
     * @returns true - if every fact is true
     * @returns false - if at least one fact is false
     */
    QuestionService.checkAnswerNecessaryConditions = function(conditions) {
        return conditions.every(function(condition) {
            return QuestionService.facts.indexOf(condition) != -1;
        });
    };

    /**
     * @name checkAnswerConditions
     * @function
     * @memberOf ng.questionService.QuestionService
     * @description Function for checking conditions of answer
     * @params conditions - array of set of facts for checking
     * @returns true - if at least one set of facts is true
     * @returns false - if all set of facts are falsy
     */
    QuestionService.checkAnswerConditions = function(conditions) {
        return conditions.some(function(condition) {
            return QuestionService.checkAnswerNecessaryConditions(condition);
        });
    };

    return QuestionService;
});