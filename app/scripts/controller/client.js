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
angular.module('unchatbar-phone-book').controller('unContactClient', ['$scope', '$stateParams', 'PhoneBook',
    'MessageText',
    function ($scope, $stateParams, PhoneBook,MessageText) {

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
         * @name selectedUser
         * @propertyOf unchatbar-phone-book.controller:unContactClient
         * @returns {String} name of selcted user
         *
         */
        $scope.selectedUser = '';

        /**
         * @ngdoc methode
         * @name getClient
         * @methodOf unchatbar-phone-book.controller:unContactClient
         * @params {String} peerId id of client
         * @description
         *
         * get user and groups
         *
         */
        $scope.getClient = function () {
            $scope.clientMap = PhoneBook.getClientMap();
            if ($scope.selectedUser && !$scope.clientMap[$scope.selectedUser]) {
                $scope.setClient('');
            }
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
            $scope.getClient();
            $scope.selectedUser = $stateParams.clientId || '';
            if ($stateParams.clientId) {
                $scope.setClient($stateParams.clientId);
            }
        };

        $scope.$on('$stateChangeSuccess', function () {
            $scope.init();
        });

        $scope.$on('PhoneBookUpdate', function () {
            $scope.getClient();
        });
    }
]);