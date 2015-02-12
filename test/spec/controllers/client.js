'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-contact'));

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

    describe('check methode', function () {

        describe('getClientMap', function () {
            it('should return from `PhoneBook.getClientMap`', function () {
                phoneBookCTRL();

                spyOn(PhoneBookService, 'getClientMap').and.returnValue(
                    {'peerIdUser': 'test'}
                );

                expect(scope.getClientMap()).toEqual({'peerIdUser': 'test'});
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
                expect(scope.getClient()).toEqual({'peerIdUser': 'test'});
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
