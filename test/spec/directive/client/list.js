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

            expect(element.scope().clientMap).toEqual({});
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();

            spyOn(element.scope(), 'getClientMap').and.returnValue([{label: 'userA'}, {label: 'userB'}]);
        });
        it('should contain label from first user', inject(function ($rootScope) {
            element.scope().init();
            $rootScope.$digest();
            expect(element.html()).toContain("userA");
        }));

        it('should contain label from second user', inject(function ($rootScope) {
            element.scope().init();
            $rootScope.$digest();
            expect(element.html()).toContain("userB");
        }));
    });

    describe('check methode', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('init', function () {
            it('should set set value from `scope.getClientMap` to `scope.clientMap`', function () {
                spyOn(element.scope(), 'getClientMap').and.returnValue([{label: 'userA'}, {label: 'userB'}]);

                element.scope().init();

                expect(element.scope().clientMap).toEqual([{label: 'userA'}, {label: 'userB'}]);
            });
        });
    });

    describe('check events', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('$stateChangeSuccess', function () {
            it('should set set value from `scope.getClientMap` to `scope.clientMap`', function () {
                spyOn(element.scope(), 'getClientMap').and.returnValue([{label: 'userA'}, {label: 'userB'}]);

                element.scope().$broadcast('$stateChangeSuccess', {});

                expect(element.scope().clientMap).toEqual([{label: 'userA'}, {label: 'userB'}]);
            });
        });
        describe('PhoneBookUpdate', function () {
            it('should set set value from `scope.getClientMap` to `scope.clientMap`', function () {
                spyOn(element.scope(), 'getClientMap').and.returnValue([{label: 'userA'}, {label: 'userB'}]);

                element.scope().$broadcast('PhoneBookUpdate', {});

                expect(element.scope().clientMap).toEqual([{label: 'userA'}, {label: 'userB'}]);
            });
        });
    });
});