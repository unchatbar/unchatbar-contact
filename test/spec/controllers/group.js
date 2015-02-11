'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-phone-book'));

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

                spyOn(MessageTextService, 'setRoom').and.returnValue(true);

            });
            it('should call `MessageText.setRoom` with `user` and roomId', function () {
                scope.setGroup('roomId');

                expect(MessageTextService.setRoom).toHaveBeenCalledWith('group', 'roomId');
            });


            it('should set `$scope.selectedGroup` object from `$scope.clientMap` ', function () {
                scope.setGroup('roomId');

                expect(scope.selectedGroup).toBe('roomId');
            });

        });


        describe('removeGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(state, 'go').and.returnValue(true);
                spyOn(MessageTextService, 'sendRemoveGroup').and.returnValue(true);
                spyOn(PhoneBookService, 'removeGroup').and.returnValue(true);
                spyOn(PhoneBookService,'getGroup').and.returnValue({users:[{id:'user'}]});

            });
            it('should call `MessageText.sendRemoveGroup` with roomId', function () {
                scope.removeGroup('roomId');
                expect(MessageTextService.sendRemoveGroup).toHaveBeenCalledWith('roomId',[{id:'user'}]);
            });

            it('should call `PhoneBook.removeGroup` with roomId', function () {
                scope.removeGroup('roomId');
                expect(PhoneBookService.removeGroup).toHaveBeenCalledWith('roomId');
            });

            it('should call `$state.go` with `chat`', function () {
                scope.removeGroup('userPeerId');

                expect(state.go).toHaveBeenCalledWith('chat');
            });
        });
        describe('addUserToGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(MessageTextService, 'sendGroupUpdateToUsers').and.returnValue(true);
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
            });
            it('should call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room',
                        users : ['userA']
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.addUserToGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).toHaveBeenCalledWith(['userA'], {
                    name: 'room',
                    users : ['userA']
                });
            });

            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room'
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.addUserToGroup('roomId');

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });

            it('should not call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is empty', function () {
                scope.selectedGroup = '';
                scope.addUserToGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).not.toHaveBeenCalled();
            });
        });

        describe('removeUserFromGroup', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(MessageTextService, 'sendGroupUpdateToUsers').and.returnValue(true);
                spyOn(PhoneBookService, 'updateGroup').and.returnValue(true);
                spyOn(PhoneBookService, 'getGroup').and.returnValue({users : ['userA']});

            });
            it('should call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room'
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.removeUserFromGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).toHaveBeenCalledWith(['userA'], {name: 'room'});
            });


            it('should call `PhoneBook.getGroup` with `$scope.selectedGroup` is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room'
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.removeUserFromGroup('roomId');

                expect(PhoneBookService.getGroup).toHaveBeenCalledWith('roomId');
            });

            it('should call `MessageText.updateGroup` with roomId new room Options is not empty', function () {
                scope.groupMap = {
                    roomId: {
                        name: 'room'
                    }
                };
                scope.selectedGroup = 'roomId';
                scope.removeUserFromGroup('roomId');

                expect(PhoneBookService.updateGroup).toHaveBeenCalledWith('roomId', {
                    name: 'room'
                });
            });

            it('should not call `MessageText.sendGroupUpdateToUsers` with roomId, when `$scope.selectedGroup` is empty', function () {
                scope.selectedGroup = '';
                scope.removeUserFromGroup('roomId');

                expect(MessageTextService.sendGroupUpdateToUsers).not.toHaveBeenCalled();
            });
        });

    });
    describe('check event', function () {
        describe('$stateChangeSuccess', function () {
            it('should call `$scope.init` ', function () {
                phoneBookCTRL();
                spyOn(scope, 'init').and.returnValue();

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
