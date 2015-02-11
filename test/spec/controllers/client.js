'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-phone-book'));

    var phoneBookCTRL, stateParams, scope, PhoneBookService, MessageTextService,state;

    beforeEach(inject(function ($controller, $rootScope,$state, PhoneBook,MessageText) {
        PhoneBookService = PhoneBook;
        stateParams = {};
        state = $state;
        scope = $rootScope.$new();
        MessageTextService = MessageText;
        phoneBookCTRL = function () {
            $controller('unContactClient', {
                $scope: scope,
                $stateParams: stateParams,
                $state : state,
                PhoneBook: PhoneBookService,
                MessageText: MessageTextService,
            });
        };
    }));

    describe('check init', function () {
        beforeEach(function () {
            phoneBookCTRL();
        });
        it('should set `$scope.clientMap` to empty object', function () {
            expect(scope.clientMap).toEqual({});
        });

        it('should set `$scope.selectedUser` to empty string', function () {
            expect(scope.selectedUser).toBe('');
        });

    });
    describe('check methode', function () {
        describe('init', function () {
            beforeEach(function () {
                phoneBookCTRL();
            });
            it('should call `$scope.getClientMap`', function () {
                spyOn(scope, 'getClientMap').and.returnValue(true);
                scope.init();
                expect(scope.getClientMap).toHaveBeenCalled();
            });
            describe('$stateParams.clientId is set', function () {
                beforeEach(function () {
                    spyOn(scope, 'setClient').and.returnValue(true);
                    stateParams.clientId = 'testPeer';
                });
                it('should call `$scope.setClient` with `$stateParams.clientId`', function () {
                    scope.init();

                    expect(scope.setClient).toHaveBeenCalledWith('testPeer');
                });
            });
        });

        describe('getClientMap', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getClientMap').and.returnValue(
                    {'peerIdUser': 'test'}
                );
            });
            it('should set `$scope.clientMap` to return value from `PhoneBook.getClientMap`', function () {
                scope.getClientMap();

                expect(scope.clientMap).toEqual({'peerIdUser': 'test'});
            });
        });

        describe('getClient', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getClient').and.returnValue(
                    {'peerIdUser': 'test'}
                );
                scope.selectedUser = 'clientId';
            });
            it('should set `$scope.clientMap` to return value from `PhoneBook.getClientMap`', function () {
                scope.getClient();

                expect(PhoneBookService.getClient).toHaveBeenCalledWith('clientId');
            });
            it('should set `$scope.clientMap` to return value from `PhoneBook.getClientMap`', function () {
                scope.getClient();

                expect(scope.client).toEqual({'peerIdUser': 'test'});
            });
        });

        describe('setClient', function () {
            beforeEach(function(){
                spyOn(MessageTextService, 'setRoom').and.returnValue(true);
                phoneBookCTRL();
                spyOn(scope, 'getClient').and.returnValue(true);

            });
            it('should call `MessageText.setRoom` with `user` and peerId', function () {
                scope.setClient('peerId');

                expect(MessageTextService.setRoom).toHaveBeenCalledWith('user', 'peerId');
            });
            it('should call `MessageText.setRoom` with `user` and peerId', function () {
                scope.setClient('peerId');

                expect(scope.getClient).toHaveBeenCalled();
            });
            it('should set `$scope.selectedUser` object from `$scope.clientMap` ', function () {
                phoneBookCTRL();

                scope.setClient('peerId');

                expect(scope.selectedUser).toBe('peerId');
            });

        });

        describe('removeClient', function () {
            beforeEach(function(){
                phoneBookCTRL();
                spyOn(PhoneBookService, 'removeClient').and.returnValue(true);
                spyOn(state, 'go').and.returnValue(true);
            });
            it('should call `PhoneBookService.removeClient` with peerId', function () {
                scope.removeClient('userPeerId');

                expect(PhoneBookService.removeClient).toHaveBeenCalledWith('userPeerId');
            });

            it('should call `state.go` when peerId is equal selected user', function () {
                scope.selectedUser = 'userPeerId';
                scope.removeClient('userPeerId');

                expect(state.go).toHaveBeenCalledWith('chat');
            });

            it('should not call `state.go` when peerId is not equal selected user', function () {
                scope.selectedUser = 'otherUserPeerId';
                scope.removeClient('userPeerId');

                expect(state.go).not.toHaveBeenCalled();
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
                spyOn(scope, 'getClientMap').and.returnValue(true);
                spyOn(scope, 'getClient').and.returnValue(true);
            });
            it('should add connection to  `$scope.clientList`', function () {

                scope.$broadcast('PhoneBookUpdate', {connection: {peer: 'conId', 'send': 'function'}});

                expect(scope.getClient).toHaveBeenCalled();
            });

            it('should add connection to  `$scope.clientList`', function () {

                scope.$broadcast('PhoneBookUpdate', {connection: {peer: 'conId', 'send': 'function'}});

                expect(scope.getClientMap).toHaveBeenCalled();
            });

        });
    });


});
