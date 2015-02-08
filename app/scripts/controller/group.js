'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-phone-book.controller:unContactGroup
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @description
 *
 * select client/room for connection
 *
 */
angular.module('unchatbar-phone-book').controller('unContactGroup', ['$scope', '$stateParams','PhoneBook',
    function ($scope,$stateParams, PhoneBook) {
        $scope.form = {};

        /**
         * @ngdoc property
         * @name groupMap
         * @propertyOf unchatbar-phone-book.controller:unContactGroup
         * @returns {Object} map of groups
         */
        $scope.groupMap = {};

        /**
         * @ngdoc property
         * @name selectedGroup
         * @propertyOf unchatbar-phone-book.controller:unContactGroup
         * @returns {String} name of group
         */
        $scope.selectedGroup = '';

        /**
         * @ngdoc methode
         * @name getGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @params {String} peerId id of client
         * @description
         *
         * get user and groups
         *
         */
        $scope.getGroup = function () {
            $scope.groupMap = PhoneBook.getGroupMap();
            if ($scope.selectedGroup && !$scope.groupMap[$scope.selectedGroup]) {
                $scope.setGroup('');
            }
        };

        /**
         * @ngdoc methode
         * @name setGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @params {String} peerId id of client
         * @description
         *
         * select room for group chat
         *
         */
        $scope.setGroup = function (roomId) {
            $scope.selectedGroup = roomId;
        };

        /**
         * @ngdoc methode
         * @name createGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * create new group
         *
         */
        $scope.createGroup = function () {
            PhoneBook.addGroup($scope.form.newGroupName);
            $scope.form.newGroupName = '';
        };


        /**
         * @ngdoc methode
         * @name removeGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @params  {String} roomId id of room
         * @description
         *
         * remove group from phone book list
         *
         */
        $scope.removeGroup = function (roomId) {
            PhoneBook.removeGroup(roomId);
        };

        //____
        /**
         * @ngdoc methode
         * @name addUserToGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @params {String} user id of client
         * @description
         *
         * add new user to group
         *
         */
        $scope.addUserToGroup = function(){
            if($scope.selectedGroup) {
                PhoneBook.updateGroup($scope.selectedGroup,$scope.groupMap[$scope.selectedGroup]);
            }
        };

        /**
         * @ngdoc methode
         * @name addUserToGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @params {String} user id of client
         * @description
         *
         * add new user to group
         *
         */
        $scope.removeUserFromGroup = function(){
            if($scope.selectedGroup) {
                PhoneBook.updateGroup($scope.selectedGroup,$scope.groupMap[$scope.selectedGroup]);
            }
        };


        /**
         * @ngdoc methode
         * @name init
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * init controller
         *
         */
        $scope.init = function() {
            $scope.getGroup();
            $scope.selectedGroup = $stateParams.groupId || '';
            if ($stateParams.groupId) {
                $scope.setGroup($stateParams.groupId);
            }
        };

        $scope.$on('$stateChangeSuccess',function(){
            $scope.init();
        });

        $scope.$on('PhoneBookUpdate', function () {
            $scope.getGroup();
        });

    }
]);