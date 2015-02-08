'use strict';

describe('Controller: phoneBook', function () {

    beforeEach(module('unchatbar-phone-book'));

    var phoneBookCTRL, stateParams, scope, PhoneBookService;

    beforeEach(inject(function ($controller, $rootScope, PhoneBook) {
        PhoneBookService = PhoneBook;
        stateParams = {};
        scope = $rootScope.$new();

        phoneBookCTRL = function () {
            $controller('unContactClient', {
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
            it('should call `$scope.getClient`', function () {
                spyOn(scope, 'getClient').and.returnValue(true);
                scope.init();
                expect(scope.getClient).toHaveBeenCalled();
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

        describe('getClient', function () {
            beforeEach(function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'getClientMap').and.returnValue(
                    {'peerIdUser': 'test'}
                );
            });
            it('should set `$scope.clientMap` to return value from `PhoneBook.getClientMap`', function () {
                scope.getClient();

                expect(scope.clientMap).toEqual({'peerIdUser': 'test'});
            });
        });

        describe('setClient', function () {
            it('should set `$scope.selectedUser` object from `$scope.clientMap` ', function () {
                phoneBookCTRL();

                scope.setClient('peerId');

                expect(scope.selectedUser).toBe('peerId');
            });

        });

        describe('removeClient', function () {
            it('should call `PhoneBookService.removeClient` with peerId', function () {
                phoneBookCTRL();
                spyOn(PhoneBookService, 'removeClient').and.returnValue(true);

                scope.removeClient('userPeerId');

                expect(PhoneBookService.removeClient).toHaveBeenCalledWith('userPeerId');
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
                spyOn(scope, 'getClient').and.returnValue(true);
                scope.$broadcast('PhoneBookUpdate', {connection: {peer: 'conId', 'send': 'function'}});

                expect(scope.getClient).toHaveBeenCalled();
            });

        });
    });


});
