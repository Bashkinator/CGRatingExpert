'use strict';

describe('Controllers', function() {

    beforeEach(module('app'));

    describe('appController', function() {

        var scope, appController;

        beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            appController = $controller('appController', {
                $scope: scope
            });
        }));

        // this test should pass
        it('angularHello should be defined', function() {
            expect(scope.angularHello).toBeDefined();
        });

        // and this one shouldn't
        it('angularHello should be equal Blablabla', function() {
            expect(scope.angularHello).toEqual('Blablabla');
        });
    });


});