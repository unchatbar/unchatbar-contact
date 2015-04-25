'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactGroupCount
 * @restrict E
 * @description
 *
 * list of all groups
 *
 */
angular.module('unchatbar-contact').directive('unContactGroupCount', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/group/count.html';
            },
            controller: 'unContactGroup',
            scope: {
                additionClass : '=',
                customTemplateUrl: '@'
            },
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

