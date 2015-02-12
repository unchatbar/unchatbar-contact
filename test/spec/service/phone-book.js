'use strict';

describe('Serivce: phoneBook', function () {
    var BrokerService, rootScope, sessionStorage, PhoneBookService;
    beforeEach(module('unchatbar-contact'));


    beforeEach(inject(function ($rootScope, MessageText, Broker, $sessionStorage, PhoneBook) {
        rootScope = $rootScope;
        BrokerService = Broker;
        sessionStorage = $sessionStorage;
        PhoneBookService = PhoneBook;
    }));

    describe('check methode', function () {

        describe('initStorage', function () {
            var sessionStorage = {};
            beforeEach(inject(function ($sessionStorage) {
                sessionStorage = $sessionStorage;
                spyOn(sessionStorage, '$default').and.returnValue({phoneBook: {test: 'data'}});
                PhoneBookService.initStorage();
            }));
            it('should call `$sessionStorage.$default` with object', function () {
                expect(sessionStorage.$default).toHaveBeenCalledWith({
                    phoneBook: {
                        user: {},
                        groups: {}
                    }
                });
            });
            it('should set  `MessageTextService._storage` return value from `$sessionStorage.$default`', function () {
                expect(PhoneBookService._storagePhoneBook).toEqual({test: 'data'});
            });
        });

        describe('addClient', function () {
            it('should set id and label to `_storagePhoneBook.user`', function () {
                PhoneBookService._storagePhoneBook.user = {};

                PhoneBookService.addClient('peerId', {label: 'testLabel'});

                expect(PhoneBookService._storagePhoneBook.user).toEqual(
                    {
                        peerId: {
                            id: 'peerId',
                            label: 'testLabel'
                        }
                    }
                );
            });
            it('should not set id and label to `_storagePhoneBook.user`', function () {
                PhoneBookService._storagePhoneBook.user = {peerId: 'user'};

                PhoneBookService.addClient('peerId', 'testLabel');

                expect(PhoneBookService._storagePhoneBook.user).toEqual(
                    {
                        peerId: 'user'
                    }
                );
            });
            it('should call `PhoneBook._sendUpdateEvent`', function () {
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.addClient('peerId', 'testLabel');

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });
        });

        describe('updateClient', function () {
            it('should change  label from `_storagePhoneBook.user`', function () {
                PhoneBookService._storagePhoneBook.user = {'peerId': {label: 'changeMe'}};

                PhoneBookService.updateClient('peerId', 'testLabel');

                expect(PhoneBookService._storagePhoneBook.user).toEqual(
                    {
                        peerId: {
                            label: 'testLabel',
                            id: 'peerId'
                        }
                    }
                );
            });
            it('should call `PhoneBook._sendUpdateEvent`', function () {
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.updateClient('peerId', 'testLabel');

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });
        });

        describe('getClient', function () {
            it('should return single user `_storagePhoneBook.user`', function () {
                PhoneBookService._storagePhoneBook.user = {'testId': 'xx'};
                expect(PhoneBookService.getClient('testId')).toBe('xx');
            });
        });

        describe('getClientMap', function () {
            it('should return all users from `_storagePhoneBook.user`', function () {
                PhoneBookService._storagePhoneBook.user = {'testId': 'xx'};
                expect(PhoneBookService.getClientMap()).toEqual({'testId': 'xx'});
            });
        });

        describe('removeClient', function () {
            it('should remove single user fro `_storagePhoneBook.user`', function () {
                PhoneBookService._storagePhoneBook.user = {'testId': 'xx', testIdNoRemove: 'aa'};

                PhoneBookService.removeClient('testId');

                expect(PhoneBookService._storagePhoneBook.user).toEqual({testIdNoRemove: 'aa'});
            });

            it('should call `PhoneBook._sendUpdateEvent`', function () {
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.removeClient('peerId');

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });
        });

        describe('copyGroupFromPartner', function () {
            beforeEach(function () {
                spyOn(BrokerService, 'getPeerId').and.returnValue('peerId');

            });
            it('should remove group, when user is not in userGroup list', function () {
                spyOn(PhoneBookService, 'addClient').and.returnValue(false);
                PhoneBookService._storagePhoneBook.groups = {
                    peerId: {
                        editable: false,
                        label: 'test'
                    }
                };

                PhoneBookService.copyGroupFromPartner('peerId', {label: 'test', users: ['otherpeerId']});

                expect(PhoneBookService._storagePhoneBook.groups).toEqual({});
            });

            it('should set id and label to `_storagePhoneBook.user`', function () {
                spyOn(PhoneBookService, 'addClient').and.returnValue(false);
                PhoneBookService._storagePhoneBook.groups = {};

                PhoneBookService.copyGroupFromPartner('peerId', {label: 'test', users: [{id: 'peerId'}]});

                expect(PhoneBookService._storagePhoneBook.groups).toEqual(
                    {
                        peerId: {
                            editable: false,
                            label: 'test',
                            users: [{id: 'peerId'}]
                        }
                    }
                );
            });

            it('should call `PhoneBook._sendUpdateEvent`', function () {
                spyOn(PhoneBookService, 'addClient').and.returnValue(false);
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.copyGroupFromPartner('peerId', {users: [{id: 'peerId'},{id : 'peerId'}]});

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });

            describe('add user to phonebook', function () {
                beforeEach(function () {
                    spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                });
                it('should call `PhoneBook.addClient` with user id' , function(){
                    spyOn(PhoneBookService, 'addClient').and.returnValue(false);
                    PhoneBookService.copyGroupFromPartner('peerId', {users: [{id: 'userId'},{id : 'peerId'}]});
                    expect(PhoneBookService.addClient).toHaveBeenCalledWith('userId',{});
                });
                it('should not call `Broker.connect` with user id, when user was in phonebook' , function(){
                    spyOn(PhoneBookService, 'addClient').and.returnValue(false);
                    spyOn(BrokerService, 'connect').and.returnValue(true);

                    PhoneBookService.copyGroupFromPartner('peerId', {users: [{id: 'userId'},{id : 'peerId'}]});
                    expect(BrokerService.connect).not.toHaveBeenCalled();
                });
                it('should call `Broker.connect` with user id, when user was not in phonebook' , function(){
                    spyOn(PhoneBookService, 'addClient').and.returnValue(true);
                    spyOn(BrokerService, 'connect').and.returnValue(true);

                    PhoneBookService.copyGroupFromPartner('peerId', {users: [{id: 'userId'},{id : 'peerId'}]});
                    expect(BrokerService.connect).toHaveBeenCalled();
                });
            });
        });

        describe('copyGroupFromPartner', function () {
            describe('client has no peer id', function () {
                beforeEach(function () {
                    spyOn(BrokerService, 'getPeerId').and.returnValue('');
                    it('it should store nothing', function () {
                        PhoneBookService._storagePhoneBook.groups = {};

                        PhoneBookService.addGroup('groupName', ['users']);

                        expect(PhoneBookService._storagePhoneBook.groups).toEqual({});
                    });
                });
            });
            describe('client has peer id', function () {
                beforeEach(function () {
                    spyOn(BrokerService, 'getPeerId').and.returnValue('peerId');
                    spyOn(PhoneBookService, 'createNewGroupId').and.returnValue('groupId');

                });

                it('should set id and label to `_storagePhoneBook.user`', function () {
                    PhoneBookService._storagePhoneBook.groups = {};

                    PhoneBookService.addGroup('groupName');

                    expect(PhoneBookService._storagePhoneBook.groups).toEqual(
                        {
                            groupId: {
                                label: 'groupName',
                                users: [{id: 'peerId'}],
                                owner: 'peerId',
                                editable: true,
                                id: 'groupId'
                            }
                        }
                    );
                });

                it('should call `PhoneBook._sendUpdateEvent`', function () {
                    spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                    PhoneBookService.addGroup('groupName');

                    expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
                });
            });

        });

        describe('getGroup', function () {
            it('should return single group `_storagePhoneBook.group`', function () {
                PhoneBookService._storagePhoneBook.groups = {'testId': 'xx'};
                expect(PhoneBookService.getGroup('testId')).toBe('xx');
            });
        });

        describe('updateGroup', function () {
            it('should remove single user from `_storagePhoneBook.group`', function () {
                PhoneBookService._storagePhoneBook.groups = {'testId': {name: 'oldroom'}};

                PhoneBookService.updateGroup('testId', {name: 'newRoomId'});

                expect(PhoneBookService._storagePhoneBook.groups).toEqual({'testId': {name: 'newRoomId'}});
            });

            it('should call `PhoneBook._sendUpdateEvent`', function () {
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.updateGroup('peerId');

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });
        });

        describe('removeGroup', function () {
            it('should remove single user from `_storagePhoneBook.group`', function () {
                PhoneBookService._storagePhoneBook.groups = {'testId': 'xx', testIdNoRemove: 'aa'};

                PhoneBookService.removeGroup('testId');

                expect(PhoneBookService._storagePhoneBook.groups).toEqual({testIdNoRemove: 'aa'});
            });

            it('should call `PhoneBook._sendUpdateEvent`', function () {
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.removeGroup('peerId');

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });
        });


        describe('removeGroupByClient', function () {
            describe('client-peer is owner of group', function () {
                it('should remove group from `_storagePhoneBook.group`', function () {
                    PhoneBookService._storagePhoneBook.groups = {'roomId': {owner: 'theOwner', testIdNoRemove: 'aa'}};

                    PhoneBookService.removeGroupByClient('theOwner', 'roomId');

                    expect(PhoneBookService._storagePhoneBook.groups).toEqual({});
                });
            });
            describe('client-peer is not htr owner of group', function () {
                it('should remove client from `_storagePhoneBook.group.users`', function () {
                    PhoneBookService._storagePhoneBook.groups = {
                        'roomId': {
                            owner: 'theOwner',
                            testIdNoRemove: 'aa',
                            users: [{id: 'noRemove'}, {id: 'onlyUser'}, {id: 'noRemoveAlso'}]
                        }
                    };

                    PhoneBookService.removeGroupByClient('onlyUser', 'roomId');

                    expect(PhoneBookService._storagePhoneBook.groups).toEqual({
                        'roomId': {
                            owner: 'theOwner',
                            testIdNoRemove: 'aa',
                            users: [{id: 'noRemove'}, {id: 'noRemoveAlso'}]
                        }
                    });
                });
            });

            it('should call `PhoneBook._sendUpdateEvent`', function () {
                PhoneBookService._storagePhoneBook.groups = {'roomId': {owner: 'XX', testIdNoRemove: 'aa'}};
                spyOn(PhoneBookService, '_sendUpdateEvent').and.returnValue(true);

                PhoneBookService.removeGroupByClient('theOwner', 'roomId');

                expect(PhoneBookService._sendUpdateEvent).toHaveBeenCalled();
            });
        });

        describe('getGroupMap', function () {
            it('should return all groups from `_storagePhoneBook.groups`', function () {
                PhoneBookService._storagePhoneBook.groups = {'testId': 'xx'};
                expect(PhoneBookService.getGroupMap()).toEqual({'testId': 'xx'});
            });
        });

        describe('_sendUpdateEvent', function () {
            it('should call `$rootScope.$broadcast` with `PhoneBookUpdate` ', function () {
                spyOn(rootScope, '$broadcast').and.returnValue(true);
                PhoneBookService._sendUpdateEvent();

                expect(rootScope.$broadcast).toHaveBeenCalledWith('PhoneBookUpdate', {});

            });
        });
    });
});