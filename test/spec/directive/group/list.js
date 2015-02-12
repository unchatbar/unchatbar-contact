describe('Directive: unContactGroupList', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/group/list.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/group/list.html');
        $templateCache.put("views/unchatbar-contact/group/list.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-group-list></un-contact-group-list>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));


    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            element.scope().groupMap = [{label: 'userA'}, {label: 'userB'}];
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