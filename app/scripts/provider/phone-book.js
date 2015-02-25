'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc service
 * @name unchatbar-contact.PhoneBookProvider
 * @description
 * # peer
 * config peer connection
 */
angular.module('unchatbar-contact')
    .provider('PhoneBook', function () {
        var useLocalStorage = false;

        /**
         * @ngdoc methode
         * @name setLocalStorage
         * @methodOf unchatbar-contact.PhoneBookProvider
         * @description
         *
         * use local storage for store peerId
         *
         */
        this.setLocalStorage = function () {
            useLocalStorage = true;
        };


        /**
         * @ngdoc service
         * @name unchatbar-contact.PhoneBook
         * @require $rootScope
         * @require $sessionStorage
         * @require $localStorage
         * @require Broker
         * @description
         *          *
         * phonebook
         *
         */
        this.$get = ['$rootScope', '$sessionStorage', '$localStorage', 'Broker','Profile',
            function ($rootScope, $sessionStorage, $localStorage, Broker,Profile) {

                var api =  {
                    /**
                     * @ngdoc methode
                     * @name _storagePhoneBook
                     * @propertyOf unchatbar-contact.PhoneBook
                     * @private
                     * @returns {Object} user/group storage
                     *
                     */
                    _storagePhoneBook:{
                        user: {},
                        groups: {}
                    },

                    /**
                     * @ngdoc methode
                     * @name initStorage
                     * @methodOf unchatbar-contact.PhoneBook
                     * @description
                     *
                     * init storage
                     */
                    initStorage : function(){
                        var storage = useLocalStorage ? $localStorage : $sessionStorage;
                        this._storagePhoneBook = storage.$default({
                            phoneBook: {
                                user: {},
                                groups: {}
                            }
                        }).phoneBook;

                    },

                    /**
                     * @ngdoc methode
                     * @name getClient
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} clientId peerId from client
                     * @return {Object} client object
                     * @description
                     *
                     * get client by peerId
                     *
                     */
                    getClient: function (clientId) {
                        return this._storagePhoneBook.user[clientId] || '';
                    },

                    /**
                     * @ngdoc methode
                     * @name getClientMap
                     * @methodOf unchatbar-contact.PhoneBook
                     * @return {Object} map of all clients
                     * @description
                     *
                     * get map of all clients
                     *
                     */
                    getClientMap: function () {
                        return this._storagePhoneBook.user;
                    },


                    /**
                     * @ngdoc methode
                     * @name addClient
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} id peerId from client
                     * @paranm {String} label name of client
                     * @description
                     *
                     * add new client
                     *
                     */
                    addClient: function (id, profile) {
                        var addUser = false;
                        if(!this._storagePhoneBook.user[id] &&
                            id !== Broker.getPeerId()) {
                            profile.id = id;

                            this._storagePhoneBook.user[id] = profile;
                            if(!this._storagePhoneBook.user[id].image) {
                                this._storagePhoneBook.user[id].image = Profile._getIdenticons(id);
                            }
                            addUser = true;
                        }
                        this._sendUpdateEvent();
                        return addUser;

                    },

                    /**
                     * @ngdoc methode
                     * @name updateClient
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} id peerId from client
                     * @paranm {String} label name of client
                     * @description
                     *
                     * update client
                     *
                     */
                    updateClient: function (id, profile) {
                        this._storagePhoneBook.user[id] = profile;
                        this._storagePhoneBook.user[id].id = id;
                        if(!this._storagePhoneBook.user[id].label) {
                            this._storagePhoneBook.user[id].label = id;
                        }
                        this._sendUpdateEvent();
                    },


                    /**
                     * @ngdoc methode
                     * @name getClientMap
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} id peerId from client
                     * @return {Object} map of all clients
                     * @description
                     *
                     * remove client from phone book
                     *
                     */
                    removeClient: function (id) {
                        delete this._storagePhoneBook.user[id];
                        this._sendUpdateEvent();
                    },

                    /**
                     * @ngdoc methode
                     * @name copyGroupFromPartner
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} id id of room
                     * @return {Object} option room info
                     * @description
                     *
                     * write a copy group in phonebook from owner of the group
                     *
                     */
                    copyGroupFromPartner: function (id, option) {
                        if (_.findIndex(option.users,{id: Broker.getPeerId()}) !== -1) {
                            option.editable = false;
                            this._storagePhoneBook.groups[id] = option;
                            _.forEach(this._storagePhoneBook.groups[id].users, function(user){
                                if(Broker.getPeerId() !== user.id &&
                                     this.addClient(user.id,{})) {
                                    Broker.connect(user.id);
                                }
                            }.bind(this));
                            this._sendUpdateEvent();
                        } else {
                            if(this._storagePhoneBook.groups[id]) {
                                delete this._storagePhoneBook.groups[id];
                                this._sendUpdateEvent();
                            }
                        }
                    },

                    /**
                     * @ngdoc methode
                     * @name addGroup
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} name name of group
                     * @description
                     *
                     * add new group
                     *
                     */
                    addGroup: function (name) {
                        var peerId = Broker.getPeerId();
                        var user = [{id : Broker.getPeerId()}];
                        if (peerId) {
                            var id = this.createNewGroupId();
                            this._storagePhoneBook.groups[id] = {
                                label: name,
                                users: user,
                                image : Profile._getIdenticons(id),
                                owner: peerId,
                                editable: true,
                                id: id
                            };
                        }
                        this._sendUpdateEvent();
                    },

                    /**
                     * @ngdoc methode
                     * @name updateGroup
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} id id from group
                     * @paranm {Object} option group options
                     * @description
                     *
                     * update group, only local group update
                     *
                     */
                    updateGroup: function (id, option) {
                        this._storagePhoneBook.groups[id] = option;
                        this._sendUpdateEvent();
                    },

                    /**
                     * @ngdoc methode
                     * @name createNewGroupId
                     * @methodOf unchatbar-contact.PhoneBook
                     * @description
                     *
                     * create new unique group id
                     *
                     */
                    createNewGroupId : function() {
                        return  Broker.getPeerId() + new Date().getTime();
                    },
                    /**
                     * @ngdoc methode
                     * @name getGroup
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} groupId id of group
                     * @description
                     *
                     * get infor from a group
                     *
                     */
                    getGroup: function (groupId) {
                        return this._storagePhoneBook.groups[groupId];
                    },

                    /**
                     * @ngdoc methode
                     * @name removeGroup
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} roomId id of room
                     * @description
                     *
                     * remove group from phone book
                     *
                     */
                    removeGroup: function (roomId) {
                        delete this._storagePhoneBook.groups[roomId];
                        this._sendUpdateEvent();
                    },

                    /**
                     * @ngdoc methode
                     * @name removeGroupByClient
                     * @methodOf unchatbar-contact.PhoneBook
                     * @params {String} clientPeer client peer id
                     * @params {String} roomId id of room
                     * @description
                     *
                     * remove group from phone book only run by remove event from other clients
                     *
                     */
                    removeGroupByClient: function (clientPeer,roomId) {
                        if (this._storagePhoneBook.groups[roomId].owner === clientPeer) {
                            delete this._storagePhoneBook.groups[roomId];
                        } else {
                            var userIndex = _.findIndex(this._storagePhoneBook.groups[roomId].users,{id : clientPeer});
                            if(userIndex !== -1) {
                                this._storagePhoneBook.groups[roomId].users.splice(userIndex, 1);
                            }
                        }
                        this._sendUpdateEvent();
                    },


                    /**
                     * @ngdoc methode
                     * @name getGroupMap
                     * @methodOf unchatbar-contact.PhoneBook
                     * @return {Object} get a map of all groups from phonebook
                     * @description
                     *
                     * remove group from phone book
                     *
                     */
                    getGroupMap: function () {
                        return _.cloneDeep(this._storagePhoneBook.groups);
                    },

                    /**
                     * @ngdoc methode
                     * @name _sendUpdateEvent
                     * @methodOf unchatbar-contact.PhoneBook
                     * @description
                     *
                     * broadcast an update event
                     *
                     */
                    _sendUpdateEvent: function () {
                        /**
                         * @ngdoc event
                         * @name PhoneBookUpdate
                         * @eventOf unchatbar-contact.PhoneBook
                         * @eventType broadcast on root scope
                         * @description
                         *
                         * Broadcasted data in phonebook changed
                         *
                         */
                        $rootScope.$broadcast('PhoneBookUpdate', {});
                    }
                };

                return api;
            }
        ];
    }
);
