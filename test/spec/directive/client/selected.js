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
    describe('check init', function () {
        it('it should be an empty object', function () {
            expect(build().scope().client).toEqual({});
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            spyOn(element.scope(), 'getClient').and.returnValue({label: 'userA'});
        });
        it('should contain label of user', inject(function ($rootScope) {
            element.scope().init();
            $rootScope.$digest();
            expect(element.html()).toContain("userA");
        }));
    });

    describe('check methode', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('init', function () {
            it('should set set value from `scope.getClient` to `scope.client`', function () {
                spyOn(element.scope(), 'getClient').and.returnValue({label: 'userA'});

                element.scope().init();

                expect(element.scope().client).toEqual({label: 'userA'});
            });
        });
    });
    describe('check events', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('$stateChangeSuccess', function () {
            it('should set set value from `scope.getClient` to `scope.client`', function () {
                spyOn(element.scope(), 'getClient').and.returnValue({label: 'userA'});

                element.scope().$broadcast('$stateChangeSuccess',{});

                expect(element.scope().client).toEqual({label: 'userA'});
            });
        });
        describe('PhoneBookUpdate', function () {
            it('should set set value from `scope.getClient` to `scope.client`', function () {
                spyOn(element.scope(), 'getClient').and.returnValue({label: 'userA'});

                element.scope().$broadcast('PhoneBookUpdate',{});

                expect(element.scope().client).toEqual({label: 'userA'});
            });
        });
    });
});