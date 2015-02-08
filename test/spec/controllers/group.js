'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-phone-book'));

    var phoneBookCTRL, stateParams, scope, PhoneBookService;

    beforeEach(inject(function ($controller, $rootScope, PhoneBook) {
        PhoneBookService = PhoneBook;
        stateParams = {};
        scope = $rootScope.$new();

        phoneBookCTRL = function () {
            $controller('unContactGroup', {
                $scope: scope,
                $stateParams: stateParams,
                PhoneBook: PhoneBookService
            });
        };
    }));

    describe('check init', function () {
        beforeEach(function () {
            phoneBookCTRL();
        });
        
        it('should set `$scope.groupMap` to empty object', function () {
            expect(scope.groupMap).toEqual({});
        });

        it('should set `$scope.selectedGroup` to empty string', function () {
            expect(scope.selectedGroup).toBe('');
        });
    });
    describe('check methode', function () {
        describe('init', function () {
            beforeEach(function () {
                phoneBookCTRL();
            });
            it('should call `$scope.getGroup`', function () {
                spyOn(scope, 'getGroup').and.returnValue(true);
                scope.init();
                expect(scope.getGroup).toHaveBeenCalled();
            });
            describe('$stateParams.groupId is set', function () {
                beforeEach(function () {
                    spyOn(scope, 'setGroup').and.returnValue(true);
                    stateParams.groupId = 'testGroup';
                });
                it('should call `$scope.setGroup` with `$stateParams.groupId`', function () {
                    scope.init();

                    expect(scope.setGroup).toHaveBeenCalledWith('testGroup');
                });
            });

        });

        describe('createGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'addGroup').and.returnValue(true);
            });
            it('should call `PhoneBook.addGroup` with `$scope.PhoneBook.addGroup and empty array', function () {
                scope.form.newGroupName = 'newGroup';
                scope.createGroup();

                expect(PhoneBookService.addGroup).toHaveBeenCalledWith('newGroup');
            });
            it('should set `$scope.newGroupName` to empty string', function () {
                scope.form.newGroupName = 'test';
                scope.createGroup('peerId');

                expect(scope.form.newGroupName).toBe('');
            });
        });

        describe('getGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getClientMap').and.returnValue(
                    {'peerIdUser': 'test'}
                );
                spyOn(PhoneBookService, 'getGroupMap').and.returnValue(
                    {'userGroupId': 'test'}
                );

            });

            it('should set `$scope.groupMap` to return value from `PhoneBook.getGroupMap`', function () {
                scope.getGroup();

                expect(scope.groupMap).toEqual({'userGroupId': 'test'});
            });

            it('should reset `$scope.selectedGroup` if selected group not in grouplist', function () {
                scope.selectedGroup = 'xx';
                spyOn(scope, 'setGroup').and.returnValue(true);
                scope.getGroup();

                expect(scope.setGroup).toHaveBeenCalled();
            });
        });

        describe('setGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                scope.groupMap = {'roomId': {label: 'testRoom'}};
            });


            it('should set `$scope.selectedUser` object from `$scope.clientMap` ', function () {
                scope.setGroup('roomId');

                expect(scope.selectedGroup).toBe('roomId');
            });

        });

        describe('removeGroup', function () {
            it('should call `PhoneBook.removeGroup` with roomId', function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'removeGroup').and.returnValue(true);

                scope.removeGroup('roomId');
                expect(PhoneBookService.removeGroup).toHaveBeenCalledWith('roomId');
            });
        });

        describe('addUserToGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
            });
            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room'
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.addUserToGroup();

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });
        });

        describe('removeUserFromGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
            });
            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room'
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.removeUserFromGroup();

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });
        });

    });
    describe('check event', function () {
        describe('$stateChangeSuccess' , function(){
            it('should call `$scope.init` ' , function(){
                phoneBookCTRL();
                spyOn(scope,'init').and.returnValue();

                scope.$broadcast('$stateChangeSuccess');

                expect(scope.init).toHaveBeenCalled();
            });
        });

        describe('PhoneBookUpdate', function () {
            beforeEach(function () {
                phoneBookCTRL();
            });
            it('should add connection to  `$scope.clientList`', function () {
                spyOn(scope, 'getGroup').and.returnValue(true);
                scope.$broadcast('PhoneBookUpdate', {connection: {peer: 'conId', 'send': 'function'}});

                expect(scope.getGroup).toHaveBeenCalled();
            });

        });
    });


});
