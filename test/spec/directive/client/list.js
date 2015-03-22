describe('Directive: unContactClientList', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/client/list.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/client/list.html');
        $templateCache.put("views/unchatbar-contact/client/list.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-client-list></un-contact-client-list>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));
    describe('check init', function () {
        it('it should be an empty object', function () {
            var element = build();
            expect(element.isolateScope().clientList).toEqual([]);
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();

            element.isolateScope().clientList = [{label: 'userA'}, {label: 'userB'}];
        });
        it('should contain label from first user', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("userA");
        }));

        it('should contain label from second user', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("userB");
        }));
    });

});