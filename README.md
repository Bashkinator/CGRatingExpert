# CGRatingExpert
Вебсайт, позволяющий определить возрастной рейтинг игры на основании ответов на вопросы согласно [Федеральному закону от 29.12.2010 N 436-ФЗ (ред. от 14.10.2014) «О защите детей от информации, причиняющей вред их здоровью и развитию»](http://www.consultant.ru/document/cons_doc_LAW_169775/)

## Использование
Отдельной установки не требует.

Для запуска надо открыть файл [dist/index.html](dist/index.html).

IE<9 не поддерживается

## Сборка, документация и тесты

### Внешние зависимости
* [Git](http://git-scm.org/)
* [Node и npm](http://nodejs.org/)

### Описание вопросов и ответов
* [Вопросы](configs/questions.json)
* [Ответы](configs/answers.json)
* [Описание формата](./Answer-QuestionStructure.md)

### Сборка
1. Установка зависимостей - npm install
2. Сборка в папку build - npm run build

Сборка c запуском локального веб-сервера (приложение будет доступно по адресу http://127.0.0.1:8000) выполняется командой npm run start.

Также по команде npm run start соберется документация в папку 'docs'

### Документация
Для сборки документации необходимо выполнить команду npm run docs.

Документация будет находиться в виде вебстраницы в папке 'docs'.

### Тесты
Для того чтобы запустить серию модульных тестов необходимо выполнить команду npm run unit-test.

После выполнения будет создан отчет о покрытии кода в папке 'tests/unit/out/coverage'.
