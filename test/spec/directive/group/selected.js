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

    describe('check init', function () {
        describe('scope.group', function () {
            it('should be an empty object', function () {
                expect(build().scope().groupItem).toEqual({});
            });
        });
        describe('scope.clientMap', function () {
            it('should be an empty object', function () {
                expect(build().scope().clientMap).toEqual({});
            });
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();
            spyOn(element.scope(), 'getGroup').and.returnValue({label: 'groupA'});
            spyOn(element.scope(), 'getClientMap').and.returnValue(
                {
                    userA: {
                        label: 'labelUserA'
                    },
                    userB: {
                        label: 'labelUserB'
                    }
                });
        });
        it('should contain label of group', inject(function ($rootScope) {
            element.scope().init();
            $rootScope.$digest();
            expect(element.html()).toContain("groupA");
        }));

        it('should contain label of first user from getClientMap', inject(function ($rootScope) {
            element.scope().init();
            $rootScope.$digest();
            expect(element.html()).toContain("labelUserA");
        }));

        it('should contain label of first user from getClientMap', inject(function ($rootScope) {
            element.scope().init();
            $rootScope.$digest();
            expect(element.html()).toContain("labelUserB");
        }));
    });

    describe('check methode', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('init', function () {
            beforeEach(function () {
                spyOn(element.scope(), 'getGroup').and.returnValue({label: 'userA'});
                spyOn(element.scope(), 'getClientMap').and.returnValue({userA: 'data', userB: 'data'});
            });
            it('should set set value from `scope.getGroup` to `scope.group`', function () {
                element.scope().init();

                expect(element.scope().groupItem).toEqual({label: 'userA'});
            });

            it('should set set value from `scope.getClientMap` to `scope.clientMap`', function () {
                element.scope().init();

                expect(element.scope().clientMap).toEqual({userA: 'data', userB: 'data'});
            });
        });
    });

    xdescribe('check events', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('$stateChangeSuccess', function () {
            beforeEach(function () {
                spyOn(element.scope(), 'getGroup').and.returnValue({label: 'userA'});
                spyOn(element.scope(), 'getClientMap').and.returnValue({userA: 'data', userB: 'data'});
            });
            it('should set set value from `scope.getGroup` to `scope.group`', function () {
                element.scope().$broadcast('$stateChangeSuccess', {});

                expect(element.scope().groupItem).toEqual({label: 'userA'});
            });

            it('should set set value from `scope.getClientMap` to `scope.clientMap`', function () {
                element.scope().$broadcast('$stateChangeSuccess', {});

                expect(element.scope().clientMap).toEqual({userA: 'data', userB: 'data'});
            });
        });
        describe('PhoneBookUpdate', function () {
            it('should set set value from `scope.getGroup` to `scope.group`', function () {
                element.scope().$broadcast('PhoneBookUpdate', {});

                expect(element.scope().groupItem).toEqual({label: 'userA'});
            });

            it('should set set value from `scope.getClientMap` to `scope.clientMap`', function () {
                element.scope().$broadcast('PhoneBookUpdate', {});

                expect(element.scope().clientMap).toEqual({userA: 'data', userB: 'data'});
            });
        });
    });

});