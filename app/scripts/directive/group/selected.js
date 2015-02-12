'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactGroupSelected
 * @restrict E
 * @description
 *
 * selected group
 *
 */
angular.module('unchatbar-contact').directive('unContactGroupSelected', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'views/unchatbar-contact/group/selected.html',
            controller: 'unContactGroup',
            link : function(scope){

                /**
                 * @ngdoc property
                 * @name groupItem
                 * @propertyOf unchatbar-contact.directive:unContactGroupSelected
                 * @returns {Object} selected group
                 */
                scope.groupItem = {};

                /**
                 * @ngdoc property
                 * @name clientMap
                 * @propertyOf unchatbar-contact.directive:unContactGroupSelected
                 * @returns {Object} map of all clients
                 */
                scope.clientMap = {};

                /**
                 * @ngdoc methode
                 * @name init
                 * @methodOf unchatbar-contact.directive:unContactGroupSelected
                 * @description
                 *
                 * init directive
                 *
                 */
                scope.init =  function(){
                    scope.groupItem = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                };

                scope.$on('$stateChangeSuccess',function(){
                    scope.groupItem = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.groupItem = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                });
            }
        };
    }
]);

