describe('Directive: unContactClientSelected', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/client/selected.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/client/selected.html');
        $templateCache.put("views/unchatbar-contact/client/selected.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-client-selected></un-contact-client-selected>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            element.scope().client = {id: 'XX',label: 'userA'};

        });
        it('should contain label of user', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("userA");
        }));
    });



});