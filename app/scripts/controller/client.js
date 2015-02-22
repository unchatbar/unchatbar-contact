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
         * @ngdoc property
         * @name clientMap
         * @propertyOf unchatbar-contact.controller:unContactClient
         * @returns {Object} list of clients
         */
        $scope.clientMap = $scope.clientMap || {};

        /**
         * @ngdoc property
         * @name client
         * @propertyOf unchatbar-contact.directive:unContactClientSelected
         * @returns {Object} selected aclient
         */
        $scope.client = $scope.client || {};

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
            $scope.clientMap = PhoneBook.getClientMap();
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
            $scope.client = PhoneBook.getClient($stateParams.clientId);
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