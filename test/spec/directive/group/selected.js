describe('Directive: unContactGroupSelected', function () {
    var build = function () {
    };

    beforeEach(module('test/mock/views/unchatbar-contact/group/selected.html'));
    beforeEach(module('unchatbar-contact'));

    beforeEach(inject(function ($compile, $rootScope, $templateCache) {
        var template = $templateCache.get('test/mock/views/unchatbar-contact/group/selected.html');
        $templateCache.put("views/unchatbar-contact/group/selected.html",
            template
        );
        build = function () {
            var element = $compile("<un-contact-group-selected></un-contact-group-selected>")($rootScope);
            $rootScope.$digest();
            return element;
        };
    }));



    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            element.scope().group = {label: 'groupA'};
            element.scope().clientMap = {
                userA: {
                    label: 'labelUserA'
                },
                userB: {
                    label: 'labelUserB'
                }
            };
        });
        it('should contain label of group', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("groupA");
        }));

        it('should contain label of first user from getClientMap', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("labelUserA");
        }));

        it('should contain label of first user from getClientMap', inject(function ($rootScope) {

            $rootScope.$digest();
            expect(element.html()).toContain("labelUserB");
        }));
    });


});