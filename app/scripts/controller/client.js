'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-phone-book.controller:unContactClient
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @require MessageText
 * @description
 *
 * select client/room for connection
 *
 */
angular.module('unchatbar-phone-book').controller('unContactClient', ['$scope','$state', '$stateParams', 'PhoneBook',
    'MessageText',
    function ($scope,$state, $stateParams, PhoneBook,MessageText) {

        $scope.form = {};

        /**
         * @ngdoc property
         * @name clientMap
         * @propertyOf unchatbar-phone-book.controller:unContactClient
         * @returns {Object} map of all client
         */
        $scope.clientMap = {};

        /**
         * @ngdoc property
         * @name clientMap
         * @propertyOf unchatbar-phone-book.controller:unContactClient
         * @returns {Object} map of all client
         */
        $scope.client = {};

        /**
         * @ngdoc property
         * @name selectedUser
         * @propertyOf unchatbar-phone-book.controller:unContactClient
         * @returns {String} name of selcted user
         *
         */
        $scope.selectedUser = '';

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
            $scope.clientMap = PhoneBook.getClientMap();
            if ($scope.selectedUser && !$scope.clientMap[$scope.selectedUser]) {
                $scope.setClient('');
            }
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
            $scope.client = PhoneBook.getClient($scope.selectedUser);
        };


        /**
         * @ngdoc methode
         * @name setClient
         * @methodOf unchatbar-phone-book.controller:unContactClient
         * @params {String} peerId id of client
         * @description
         *
         * select room for single client chat
         *
         */
        $scope.setClient = function (peerId) {
            MessageText.setRoom('user', peerId);
            $scope.selectedUser = peerId;
            $scope.getClient();
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
            PhoneBook.removeClient(peerId);
            if($scope.selectedUser === peerId) {
                $state.go('chat');
            }
        };

        /**
         * @ngdoc methode
         * @name init
         * @methodOf unchatbar-phone-book.controller:unContactClient
         * @description
         *
         * init controller
         *
         */
        $scope.init = function () {
            $scope.getClientMap();
            $scope.selectedUser = $stateParams.clientId || '';
            if ($stateParams.clientId) {
                $scope.setClient($stateParams.clientId);
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $scope.init();
        });

        $scope.$on('PhoneBookUpdate', function () {
            $scope.getClientMap();
            $scope.getClient();
        });
    }
]);