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
    describe('check init', function () {
        it('it should be an empty object', function () {
            expect(build().scope().groupMap).toEqual({});
        });
    });

    describe('check html', function () {
        var element;
        beforeEach(function () {
            element = build();

            spyOn(element.scope(), 'getGroupMap').and.returnValue([{label: 'userA'}, {label: 'userB'}]);
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
            it('should set set value from `scope.getgroupMap` to `scope.getGroupMap`', function () {
                spyOn(element.scope(), 'getGroupMap').and.returnValue([{label: 'userA'}, {label: 'userB'}]);

                element.scope().init();

                expect(element.scope().groupMap).toEqual([{label: 'userA'}, {label: 'userB'}]);
            });
        });
    });
    describe('check events', function () {
        var element;
        beforeEach(function () {
            element = build();
        });
        describe('$stateChangeSuccess', function () {
            it('should call `scope.init()` ', function () {
                spyOn(element.scope(), 'init').and.returnValue(true);

                element.scope().$broadcast('$stateChangeSuccess', {});

                expect(element.scope().init).toHaveBeenCalled();
            });
        });
        describe('PhoneBookUpdate', function () {
            it('should call `scope.init()` ', function () {
                spyOn(element.scope(), 'init').and.returnValue(true);

                element.scope().$broadcast('$stateChangeSuccess', {});

                expect(element.scope().init).toHaveBeenCalled();
            });
        });
    });
});