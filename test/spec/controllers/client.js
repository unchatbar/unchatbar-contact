'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-contact'));

    var phoneBookCTRL, stateParams, scope, PhoneBookService, state, DataConnectionService;

    beforeEach(inject(function ($controller, $rootScope, $state, PhoneBook, DataConnection) {
        PhoneBookService = PhoneBook;
        stateParams = {};
        DataConnectionService = DataConnection;
        state = $state;
        scope = $rootScope.$new();

        phoneBookCTRL = function () {
            $controller('unContactClient', {
                $scope: scope,
                $stateParams: stateParams,
                $state: state,
                PhoneBook: PhoneBookService

            });
        };
    }));

    describe('check methode', function () {

        describe('getClientMap', function () {
            beforeEach(function () {
                phoneBookCTRL();

                spyOn(PhoneBookService, 'getClientMap').and.returnValue(
                    {
                        peerIdUser: {name: 'test'},
                        peerIdUserA: {name: 'userA'}
                    }

                );

                spyOn(DataConnectionService, 'getOpenConnectionMap').and.returnValue(
                    {'peerIdUser': {name:'test'}}
                );

            });
            it('should set `$scope.clientMap` to return value from `PhoneBook.getClientMap`', function () {
                scope.getClientMap();

                expect(scope.clientMap).toEqual(
                    {
                        peerIdUser: {name: 'test',online : true},
                        peerIdUserA: {name: 'userA', online: false}
                    }
                );
            });

            it('should set `$scope.clientOnlineMap` to return value from `PhoneBook.getClientOnlineMap`', function () {
                scope.getClientMap();
                expect(scope.clientOnlineMap).toEqual( {'peerIdUser': {name:'test'}});
            });


        });

        describe('getClient', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getClient').and.returnValue(
                    {'peerIdUser': 'test'}
                );
            });
            it('should call `PhoneBook.getClientMap` with `$stateParams.clientId` ', function () {
                stateParams.clientId = 'clientId';
                scope.getClient();

                expect(PhoneBookService.getClient).toHaveBeenCalledWith('clientId');
            });
            it('should return value from `PhoneBook.getClientMap`', function () {
                scope.getClient();
                expect(scope.client).toEqual({'peerIdUser': 'test'});
            });
        });

        describe('removeClient', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'removeClient').and.returnValue(true);
                spyOn(state, 'go').and.returnValue(true);
            });
            it('should call `PhoneBookService.removeClient` with peerId', function () {
                scope.removeClient('userPeerId');

                expect(PhoneBookService.removeClient).toHaveBeenCalledWith('userPeerId');
            });

            it('should call `state.go` when peerId is equal `$stateParams.clientId`', function () {
                stateParams.clientId = 'userPeerId';
                scope.removeClient('userPeerId');

                expect(state.go).toHaveBeenCalledWith('contact');
            });

            it('should not call `state.go` when peerId is not equal `$stateParams.clientId`', function () {
                stateParams.clientId = 'otherUserPeerId';
                scope.removeClient('userPeerId');

                expect(state.go).not.toHaveBeenCalled();
            });
        });
    });


});
