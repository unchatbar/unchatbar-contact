'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-contact'));

    var phoneBookCTRL, stateParams, scope, PhoneBookService, MessageTextService, state;

    beforeEach(inject(function ($controller, $rootScope, $state, PhoneBook, MessageText) {
        PhoneBookService = PhoneBook;
        stateParams = {};
        scope = $rootScope.$new();
        state = $state;
        MessageTextService = MessageText;
        phoneBookCTRL = function () {
            $controller('unContactGroup', {
                $scope: scope,
                $state: state,
                $stateParams: stateParams,
                PhoneBook: PhoneBookService,
                MessageText: MessageTextService
            });
        };
    }));


    describe('check methode', function () {

        describe('getGroupMap', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getGroupMap').and.returnValue(
                    {'userGroupId': 'test'}
                );

            });

            it('should return value from `PhoneBook.getGroupMap`', function () {
                expect(scope.getGroupMap()).toEqual({'userGroupId': 'test'});
            });
        });

        describe('getGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getGroup').and.returnValue(
                    {'userGroupId': 'test'}
                );
                stateParams.groupId = 'groupId';
            });

            it('should call `PhoneBook.getGroupMap` with `$stateParams.groupId`', function () {
                scope.getGroup();

                expect(PhoneBookService.getGroup).toHaveBeenCalledWith('groupId');
            });

            it('should return value from `PhoneBook.getGroupMap`', function () {
                expect(scope.getGroup()).toEqual({'userGroupId': 'test'});
            });
        });

        describe('createGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'addGroup').and.returnValue(true);

            });
            it('should call `PhoneBook.addGroup` with `$scope.PhoneBook.addGroup and empty array', function () {
                scope.newGroupName = 'newGroup';
                scope.createGroup();

                expect(PhoneBookService.addGroup).toHaveBeenCalledWith('newGroup');
            });

        });

        describe('removeGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(state, 'go').and.returnValue(true);
                spyOn(MessageTextService, 'sendRemoveGroup').and.returnValue(true);
                spyOn(PhoneBookService, 'removeGroup').and.returnValue(true);
                spyOn(PhoneBookService, 'getGroup').and.returnValue({users: [{id: 'user'}]});

            });
            it('should call `MessageText.sendRemoveGroup` with roomId', function () {
                scope.removeGroup('roomId');
                expect(MessageTextService.sendRemoveGroup).toHaveBeenCalledWith('roomId', [{id: 'user'}]);
            });

            it('should call `PhoneBook.removeGroup` with roomId', function () {
                scope.removeGroup('roomId');
                expect(PhoneBookService.removeGroup).toHaveBeenCalledWith('roomId');
            });

            it('should call `$state.go` with `chat`', function () {
                scope.removeGroup('userPeerId');

                expect(state.go).toHaveBeenCalledWith('contact');
            });
        });

        describe('addUserToGroup', function () {
            var mockGroups = {};
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(MessageTextService, 'sendGroupUpdateToUsers').and.returnValue(true);
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
                spyOn(scope, 'getGroupMap').and.callFake(function () {
                    return mockGroups;
                });
            });
            it('should call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is not empty', function () {
                mockGroups = {
                    roomId: {
                        name: 'room',
                        users: ['userA']
                    }
                };
                stateParams.groupId = 'roomId';
                scope.addUserToGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).toHaveBeenCalledWith(['userA'], {
                    name: 'room',
                    users: ['userA']
                });
            });

            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                mockGroups = {
                    roomId: {
                        name: 'room'
                    }
                };
                stateParams.groupId = 'roomId';
                scope.addUserToGroup('roomId');

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });

            it('should not call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is empty', function () {
                stateParams.groupId = '';
                scope.addUserToGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).not.toHaveBeenCalled();
            });
        });

        describe('removeUserFromGroup', function () {
            var mockGroups = {};
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(MessageTextService, 'sendGroupUpdateToUsers').and.returnValue(true);
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
                spyOn(PhoneBookService, 'getGroup').and.returnValue({users: ['userA']});
                spyOn(scope, 'getGroupMap').and.callFake(function () {
                    return mockGroups;
                });

            });
            it('should call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is not empty', function () {
                mockGroups = {
                    roomId: {
                        name: 'room'
                    }
                };
                stateParams.groupId = 'roomId';
                scope.removeUserFromGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).toHaveBeenCalledWith(['userA'], {name: 'room'});
            });


            it('should call `PhoneBook.getGroup` with `$scope.selectedGroup` is not empty', function () {
                mockGroups = {
                    roomId: {
                        name: 'room'
                    }
                };
                stateParams.groupId = 'roomId';
                scope.removeUserFromGroup('roomId');

                expect(PhoneBookService.getGroup).toHaveBeenCalledWith('roomId');
            });

            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                mockGroups = {
                    roomId: {
                        name: 'room'
                    }
                };
                stateParams.groupId = 'roomId';
                scope.removeUserFromGroup('roomId');

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });

            it('should not call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is empty', function () {
                stateParams.groupId = '';
                scope.removeUserFromGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).not.toHaveBeenCalled();
            });
        });

        describe('getClientMap', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getClientMap').and.returnValue(
                    {'userGroupId': 'test'}
                );

            });

            it('should return value from `PhoneBook.getClientMap`', function () {
                expect(scope.getClientMap()).toEqual({'userGroupId': 'test'});
            });
        });

    });
});
