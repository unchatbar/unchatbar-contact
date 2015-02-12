'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-contact.controller:unContactClient
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @description
 *
 * client controller
 *
 */
angular.module('unchatbar-contact').controller('unContactClient', ['$scope','$state', '$stateParams', 'PhoneBook',
    function ($scope,$state, $stateParams, PhoneBook) {

        /**
         * @ngdoc methode
         * @name getClientMap
         * @methodOf unchatbar-contact.controller:unContactClient
         * @params {String} peerId id of client
         * @description
         *
         * get user and groups
         *
         */
        $scope.getClientMap = function () {
            return PhoneBook.getClientMap();
        };

        /**
         * @ngdoc methode
         * @name getClient
         * @methodOf unchatbar-contact.controller:unContactClient
         * @description
         *
         * get client data
         *
         */
        $scope.getClient = function () {
            return PhoneBook.getClient($stateParams.clientId);
        };


        /**
         * @ngdoc methode
         * @name removeClient
         * @methodOf unchatbar-contact.controller:unContactClient
         * @params  {String} peerId id of client
         * @description
         *
         * remove client from phone book list
         *
         */
        $scope.removeClient = function (peerId) {
            var redirect = $stateParams.clientId === peerId ? true : false;
            PhoneBook.removeClient(peerId);
            if(redirect) {
                $state.go('contact');
            }
        };

    }
]);