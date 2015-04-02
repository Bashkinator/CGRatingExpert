'use strict';


describe('my app', function() {

    browser.get('index.html');

    it('should load', function() {
        expect(browser.getTitle()).toBe('My App');
    });

    it('should show two labels', function() {
        expect(element.all(by.css('p')).count()).toEqual(2);
        expect(element.all(by.css('img')).count()).toEqual(1);
        expect(element(by.id('hello')).getInnerHtml()).toEqual('Hello, World!');
        expect(element(by.id('hello-angular')).getInnerHtml()).toEqual('And good morning to Angular!');
        expect(element(by.id('hello-angular')).getInnerHtml()).toEqual('Blablablabla'); // should fail
    });

});
