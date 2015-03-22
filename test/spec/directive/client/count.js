describe('Directive: unContactClientcount', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/client/count.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/client/count.html');
        $templateCache.put("views/unchatbar-contact/client/count.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-client-count></un-contact-client-count>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));
    describe('check init', function () {
        it('it should be an empty object', function () {
            var element = build();
            expect(element.isolateScope().userCount).toEqual(0);
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();

            element.isolateScope().userCount = "5 users";
        });
        it('should contain label `5 users`', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("5 users");
        }));


    });

});