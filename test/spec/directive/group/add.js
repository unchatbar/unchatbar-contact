describe('Directive: unContactGroupAdd', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/group/add.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope,$templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/group/add.html');
        $templateCache.put("views/unchatbar-contact/group/add.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-group-add></un-contact-group-add>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));
    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        it('should contain label from first user', inject(function ($rootScope) {
            $rootScope.$digest();
            expect(element.html()).toContain("add new Group");
        }));
    });
});