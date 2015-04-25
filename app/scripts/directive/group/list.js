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
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-contact/group/list.html';
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

