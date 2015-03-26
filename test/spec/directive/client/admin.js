describe('Directive: unContactClientAdmin', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/client/admin.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/client/admin.html');
        $templateCache.put("views/unchatbar-contact/client/admin.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-client-admin></un-contact-client-admin>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            element.scope().client = {id: 'clientId',label: 'userA'};

        });
        it('should contain label of user', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("clientId");
        }));
    });



});