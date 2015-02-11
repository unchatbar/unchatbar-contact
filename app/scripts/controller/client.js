'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-phone-book.controller:unContactClient
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @description
 *
 * select client/room for connection
 *
 */
angular.module('unchatbar-phone-book').controller('unContactClient', ['$scope','$state', '$stateParams', 'PhoneBook',
    function ($scope,$state, $stateParams, PhoneBook) {

        /**
         * @ngdoc methode
         * @name getClientMap
         * @methodOf unchatbar-phone-book.controller:unContactClient
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
         * @methodOf unchatbar-phone-book.controller:unContactClient
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
         * @methodOf unchatbar-phone-book.controller:unContactClient
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