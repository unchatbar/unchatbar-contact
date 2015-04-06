'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-contact.controller:unContactGroup
 * @require $scope
 * @require $stateParams
 * @require PhoneBook
 * @require DataConnection
 * @description
 *
 * group controller
 *
 */
angular.module('unchatbar-contact').controller('unContactGroup', ['$scope', '$state', '$stateParams', 'PhoneBook', 'DataConnection',
    function ($scope, $state, $stateParams, PhoneBook, DataConnection) {

        /**
         * @ngdoc property
         * @name groupList
         * @propertyOf unchatbar-contact.controller:unContactGroup
         * @returns {Array} map of groups
         */
        $scope.groupList = $scope.groupList || [];

        /**
         * @ngdoc property
         * @name groupItem
         * @propertyOf unchatbar-contact.controller:unContactGroup
         * @returns {Object} selected group
         */
        $scope.group = $scope.group || {};


        /**
         * @ngdoc property
         * @name clientMap
         * @propertyOf unchatbar-contact.controller:unContactGroup
         * @returns {Object} map of all clients
         */
        $scope.clientMap = $scope.clientMap || {};

        /**
         * @ngdoc methode
         * @name getGroupList
         * @methodOf unchatbar-contact.controller:unContactGroup
         * @description
         *
         * get all groups
         *
         */
        $scope.getGroupList = function () {
            $scope.groupList = [];
            _.forEach(PhoneBook.getGroupMap(), function (group) {
                $scope.groupList.push(group);
            });
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
            $scope.group = PhoneBook.getGroup($stateParams.groupId);
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
            if ($scope.newGroupName) {
                PhoneBook.addGroup($scope.newGroupName);
                $scope.newGroupName = '';
            }
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
            _.forEach(PhoneBook.getGroup(roomId).users, function (user) {
                DataConnection.send(user.id, 'removeGroup', {roomId: roomId});
            });
            PhoneBook.removeGroup(roomId);
            $state.go('contact');
        };

        /**
         * @ngdoc methode
         * @name update
         * @methodOf unchatbar-contact.controller:unContactGroup
         * @description
         *
         * update group
         *
         */
        $scope.update = function () {
            if ($stateParams.groupId) {
                var group = $scope.group;
                _.forEach(group.users, function (user) {
                    DataConnection.send(user.id, 'updateGroup',
                        {
                            roomId: $stateParams.groupId,
                            group: group

                        }
                    );
                });
                PhoneBook.updateGroup($stateParams.groupId, group);
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
        $scope.removeUserFromGroup = function () {
            if ($stateParams.groupId) {
                var group = $scope.group;
                _.forEach(group.users, function (user) {
                    DataConnection.send(user.id, 'updateGroup',
                        {
                            roomId: $stateParams.groupId,
                            group: group

                        }
                    );
                });
                PhoneBook.updateGroup($stateParams.groupId, group);
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
            $scope.clientMap = PhoneBook.getClientMap();
        };
    }
]);