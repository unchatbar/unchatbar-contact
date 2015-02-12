'use strict';
/**
 * @ngdoc overview
 * @name unchatbar-contact
 * @description
 * # unchatbar-contact-connection
 *
 * Main module of the application.
 */
angular.module('unchatbar-contact').run(['$rootScope', 'PhoneBook',
    function ($rootScope, PhoneBook) {
        PhoneBook.initStorage();
        $rootScope.$on('ConnectionGetMessageprofile', function (event, data) {
            PhoneBook.updateClient(data.peerId, data.message.profile.label || '');
        });

        $rootScope.$on('ConnectionGetMessageupdateUserGroup', function (event, data) {
            PhoneBook.copyGroupFromPartner(data.message.group.id, data.message.group);
        });

        $rootScope.$on('ConnectionGetMessageremoveGroup', function (event, data) {
            PhoneBook.removeGroupByClient(data.peerId, data.message.roomId);
        });

        $rootScope.$on('BrokerPeerConnection', function (event, data) {
            PhoneBook.addClient(data.connection.peer, {label: data.connection.peer});
        });

        $rootScope.$on('BrokerPeerCall', function (event, data) {
            PhoneBook.addClient(data.client.peer, data.client.metadata.profile);
        });

    }
]);
