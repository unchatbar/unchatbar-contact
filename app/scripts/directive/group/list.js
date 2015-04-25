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
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/group/list.html';
            },
            scope: {
                customTemplateUrl: '@'
            },
            controller: 'unContactGroup',
            link : function(scope){

                scope.$on('$stateChangeSuccess',function(){
                    scope.getGroupList();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.getGroupList();

                });

                scope.getGroupList();
            }
        };
    }
]);

