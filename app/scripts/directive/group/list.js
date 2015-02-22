'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactGroupList
 * @restrict E
 * @description
 *
 * list of all groups
 *
 */
angular.module('unchatbar-contact').directive('unContactGroupList', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl:'views/unchatbar-contact/group/list.html',
            controller: 'unContactGroup',
            link : function(scope){

                scope.$on('$stateChangeSuccess',function(){
                    scope.getGroupMap();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.getGroupMap();

                });

                scope.getGroupMap();
            }
        };
    }
]);

