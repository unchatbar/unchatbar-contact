describe('Directive: unContactGroupcount', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/group/count.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/group/count.html');
        $templateCache.put("views/unchatbar-contact/group/count.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-group-count></un-contact-group-count>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));


    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            element.isolateScope().groupList = [{label: 'userA'}, {label: 'userB'}];
        });
        it('should contain label from first user', inject(function ($rootScope) {
            $rootScope.$digest();

            expect(element.html()).toContain("2 user");
        }));

    });



});