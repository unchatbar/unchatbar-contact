'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-phone-book.controller:unContactGroup
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @require MessageText
 * @description
 *
 * select client/room for connection
 *
 */
angular.module('unchatbar-phone-book').controller('unContactGroup', ['$scope', '$state','$stateParams','PhoneBook','MessageText',
    function ($scope,$state,$stateParams, PhoneBook,MessageText) {

        /**
         * @ngdoc methode
         * @name getGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * get all groups
         *
         */
        $scope.getGroupMap = function () {
            return PhoneBook.getGroupMap();
        };

        /**
         * @ngdoc methode
         * @name getGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * get selected group
         *
         */
        $scope.getGroup = function () {
            return PhoneBook.getGroupMap($stateParams.groupId);
        };

        /**
         * @ngdoc methode
         * @name createGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * add new group
         *
         */
        $scope.createGroup = function () {
            PhoneBook.addGroup($scope.form.newGroupName);
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
            MessageText.sendRemoveGroup(roomId,PhoneBook.getGroup(roomId).users);
            PhoneBook.removeGroup(roomId);
            $state.go('contact');
        };

        /**
         * @ngdoc methode
         * @name addUserToGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * add new user to group
         *
         */
        $scope.addUserToGroup = function(){
            if($stateParams.groupId) {
                var users = $scope.groupMap[$stateParams.groupId].users;
                MessageText.sendGroupUpdateToUsers(users,$scope.groupMap[$stateParams.groupId]);
                PhoneBook.updateGroup($stateParams.groupId,$scope.groupMap[$stateParams.groupId]);
            }
        };

        /**
         * @ngdoc methode
         * @name addUserToGroup
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @params {String} user id of client
         * @description
         *
         * remove user from group
         *
         */
        $scope.removeUserFromGroup = function(){
            if($stateParams.groupId) {
                var users = PhoneBook.getGroup($stateParams.groupId).users;
                MessageText.sendGroupUpdateToUsers(users,$scope.groupMap[$stateParams.groupId]);
                PhoneBook.updateGroup($stateParams.groupId,$scope.groupMap[$stateParams.groupId]);
            }
        };

        /**
         * @ngdoc methode
         * @name getClientMap
         * @methodOf unchatbar-phone-book.controller:unContactGroup
         * @description
         *
         * get all clients
         *
         */
        $scope.getClientMap = function () {
            return PhoneBook.getClientMap();
        };
    }
]);