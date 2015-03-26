'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-contact'));

    var phoneBookCTRL, stateParams, scope, PhoneBookService, state, DataConnectionService;

    beforeEach(inject(function ($controller, $rootScope, $state, PhoneBook, DataConnection) {
        PhoneBookService = PhoneBook;
        stateParams = {};
        scope = $rootScope.$new();
        state = $state;
        DataConnectionService = DataConnection;
        phoneBookCTRL = function () {
            $controller('unContactGroup', {
                $scope: scope,
                $state: state,
                $stateParams: stateParams,
                PhoneBook: PhoneBookService,
                DataConnection: DataConnectionService
            });
        };
    }));


    describe('check methode', function () {

        describe('getGroupList', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getGroupMap').and.returnValue(
                    {'userGroupId': 'test'}
                );

            });

            it('should return value from `PhoneBook.getGroupMap`', function () {
                scope.getGroupList();
                expect(scope.groupList).toEqual(['test']);
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
                scope.getGroup();
                expect(scope.group).toEqual({'userGroupId': 'test'});
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

            it('should call `PhoneBook.addGroup` with `$scope.PhoneBook.addGroup and empty array', function () {
                scope.newGroupName = 'newGroup';
                scope.createGroup();

                expect(scope.newGroupName).toBe('');
            });


            it('should not call `PhoneBook.addGroup` when `scope.newGroupName` is empty', function () {
                scope.newGroupName = '';
                scope.createGroup();

                expect(PhoneBookService.addGroup).not.toHaveBeenCalled();
            });

        });

        describe('removeGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(state, 'go').and.returnValue(true);
                spyOn(DataConnectionService, 'send').and.returnValue(true);
                spyOn(PhoneBookService, 'removeGroup').and.returnValue(true);
                spyOn(PhoneBookService, 'getGroup').and.returnValue({users: [{id: 'userId'}]});

            });
            it('should call `DataConnection.sendRemoveGroup` with `user-id`,empty text,`removeGroup`, and roomId', function () {
                scope.removeGroup('roomId');
                expect(DataConnectionService.send).toHaveBeenCalledWith(
                    'userId', '', 'removeGroup', {roomId: 'roomId'}
                );
            });

            it('should call `PhoneBook.send` with roomId', function () {
                scope.removeGroup('roomId');
                expect(PhoneBookService.removeGroup).toHaveBeenCalledWith('roomId');
            });

            it('should call `$state.go` with `chat`', function () {
                scope.removeGroup('userPeerId');

                expect(state.go).toHaveBeenCalledWith('contact');
            });
        });

        describe('update', function () {

            beforeEach(function () {
                phoneBookCTRL();
                spyOn(DataConnectionService, 'send').and.returnValue(true);
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
            });

            it('should call `DataConnection.sendRemoveGroup` with `user-id`,empty text,`updateGroup`, and roomId', function () {
                scope.group ={
                        name: 'room',
                        users: [{id: 'userA'}]
                    };

                stateParams.groupId = 'roomId';
                scope.update();
                expect(DataConnectionService.send).toHaveBeenCalledWith(
                    'userA', '', 'updateGroup', {
                        roomId: 'roomId', group: {
                            name: 'room',
                            users: [{id: 'userA'}]
                        }
                    }
                );
            });


            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                scope.group ={
                    name: 'room'
                };
                stateParams.groupId = 'roomId';
                scope.update('roomId');

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });

            it('should not call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is empty', function () {
                stateParams.groupId = '';
                scope.update('roomId');

                expect(DataConnectionService.send).not.toHaveBeenCalled();
            });
        });

        describe('removeUserFromGroup', function () {

            beforeEach(function () {
                phoneBookCTRL();
                spyOn(DataConnectionService, 'send').and.returnValue(true);
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
            });

            it('should call `DataConnection.sendRemoveGroup` with `user-id`,empty text,`updateGroup`, and roomId', function () {
                scope.group ={
                    name: 'room',
                    users: [{id: 'userA'}]
                };
                stateParams.groupId = 'roomId';
                scope.removeUserFromGroup();
                expect(DataConnectionService.send).toHaveBeenCalledWith(
                    'userA', '', 'updateGroup', {
                        roomId: 'roomId', group: {
                            name: 'room',
                            users: [{id: 'userA'}]
                        }
                    }
                );
            });


            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                scope.group ={
                    name: 'room'
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

                expect(DataConnectionService.send).not.toHaveBeenCalled();
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
                scope.getClientMap();
                expect(scope.clientMap).toEqual({'userGroupId': 'test'});
            });
        });

    });
});
