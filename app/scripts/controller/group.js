'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-contact.controller:unContactGroup
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @require MessageText
 * @description
 *
 * group controller
 *
 */
angular.module('unchatbar-contact').controller('unContactGroup', ['$scope', '$state','$stateParams','PhoneBook','MessageText',
    function ($scope,$state,$stateParams, PhoneBook,MessageText) {

        /**
         * @ngdoc methode
         * @name getGroup
         * @methodOf unchatbar-contact.controller:unContactGroup
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
         * @methodOf unchatbar-contact.controller:unContactGroup
         * @description
         *
         * get selected group
         *
         */
        $scope.getGroup = function () {
            return PhoneBook.getGroup($stateParams.groupId);
        };

        /**
         * @ngdoc methode
         * @name createGroup
         * @methodOf unchatbar-contact.controller:unContactGroup
         * @description
         *
         * add new group
         *
         */
        $scope.createGroup = function () {
            PhoneBook.addGroup($scope.newGroupName);
        };


        /**
         * @ngdoc methode
         * @name removeGroup
         * @methodOf unchatbar-contact.controller:unContactGroup
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
         * @methodOf unchatbar-contact.controller:unContactGroup
         * @description
         *
         * add new user to group
         *
         */
        $scope.addUserToGroup = function(){
            if($stateParams.groupId) {
                var groups = $scope.getGroupMap();
                var users =groups[$stateParams.groupId].users;
                MessageText.sendGroupUpdateToUsers(users,groups[$stateParams.groupId]);
                PhoneBook.updateGroup($stateParams.groupId,groups[$stateParams.groupId]);
            }
        };

        /**
         * @ngdoc methode
         * @name addUserToGroup
         * @methodOf unchatbar-contact.controller:unContactGroup
         * @params {String} user id of client
         * @description
         *
         * remove user from group
         *
         */
        $scope.removeUserFromGroup = function(){
            if($stateParams.groupId) {
                var groups = $scope.getGroupMap();
                var users = PhoneBook.getGroup($stateParams.groupId).users;
                MessageText.sendGroupUpdateToUsers(users,groups[$stateParams.groupId]);
                PhoneBook.updateGroup($stateParams.groupId,groups[$stateParams.groupId]);
            }
        };

        /**
         * @ngdoc methode
         * @name getClientMap
         * @methodOf unchatbar-contact.controller:unContactGroup
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