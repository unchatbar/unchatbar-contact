'use strict';
/**
 * @ngdoc overview
 * @name unchatbar-contact
 * @description
 * # unchatbar-contact-connection
 *
 * Main module of the application.
 */
angular.module('unchatbar-contact').run(['$rootScope', 'PhoneBook', 'Profile','DataConnection',
    function ($rootScope, PhoneBook, Profile,DataConnection) {
        PhoneBook.initStorage();
        $rootScope.$on('ConnectionGetMessage_updateProfile', function (event, data) {
            PhoneBook.updateClient(data.peerId, data.message.meta.profile);
        });

        $rootScope.$on('ConnectionGetMessage_updateGroup', function (event, data) {
            PhoneBook.copyGroupFromPartner(data.message.meta.roomId, data.message.meta.group);
        });

        $rootScope.$on('ConnectionGetMessage_removeGroup', function (event, data) {
            PhoneBook.removeGroupByClient(data.peerId, data.message.meta.roomId);
        });

        $rootScope.$on('BrokerPeerConnection', function (event, data) {
            if(PhoneBook.addClient(data.connection.peer, {label: data.connection.peer})) {
                DataConnection.send(data.connection.peer,  'updateProfile', {profile: Profile.get()});
            }
        });

        $rootScope.$on('profileUpdate', function (event, data) {
            _.forEach( PhoneBook.getClientMap(), function (user) {
                DataConnection.send(user.id, 'updateProfile', {profile: Profile.get()});
            });
        });

        $rootScope.$on('BrokerPeerOpen', function (event, data) {
            _.forEach( PhoneBook.getClientMap(), function (user) {
                DataConnection.send(user.id,  'ping', {profile: Profile.get()});
            });
        });


        $rootScope.$on('BrokerPeerCall', function (event, data) {
            PhoneBook.addClient(data.client.peer, data.client.metadata.profile);
        });

    }
]);
