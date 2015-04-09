# Answer-Question structure
Questions and answers for them described in:
* /configs/answers.json
* /config/questions.json

## Question structure
Question is object with properties:
* "text": Text of question
* "type": Type of question. Could be "OneAnswer" or "MultipleAnswer"
* "conditions": Set (array) of facts, which must be true for asking the question. It allows question chaining.
* "options": Array of options for the question.

Option is object with properties:
* "text": Text of option
* "yes": fact, which becomes true when the option is chosen.
* "no": fact, which becomes true when the option isn't chosen.

## Answer structure
Answer is object with properties:
* "title": Title of answer
* "text": Description of answer
* "necessaryConditions": Set (array) of facts. Every fact in the set must be true for this answer
* "conditions": Array of sets of facts. Answer becomes suitable if at least one of the sets is truthy. Set is truthy when all of facts in the set are truthy

Fact - string describing fact

# Структура вопросов и ответов
Вопросы и ответы для программы описаны в следующих файлах:
* /configs/answers.json
* /config/questions.json

## Структура вопроса
Вопрос - это объект со следующими свойствами:
* "text": Текст вопроса
* "type": Тип вопроса. Может быть "OneAnswer" или "MultipleAnswer" в зависимости от разрешенного количества ответов
* "conditions": Набор (массив) фактов, каждый из которых должен быть правдивым для отбражения этого вопроса. Это позволяет соединять вопросы в серии.
* "options": Массив вариантов ответа на вопрос.

Вариант ответа - это объект со следующими свойствами:
* "text": Текст варианта ответа
* "yes": Факт, становящийся истинным когда этот вариант ответа выбран
* "no": Факт, становящийся истинным когда этот вариант ответа не выбран.

## Структура ответа
Ответ - это объект со следующими свойствами:
* "title": Заголовок ответа
* "text": Описание ответа
* "necessaryConditions": Набор фактов, которые должы быть истинными для правильности этого ответа
* "conditions": Массив наборов фактов. Если хотя бы один из наборов фактов истенен (все факты в нем - истина), то этот ответ - правильный.

Факт - строка, описывающая какой-либо факт.