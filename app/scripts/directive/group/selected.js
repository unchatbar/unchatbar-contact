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
            replace: false,
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/group/selected.html';
            },
            scope: {
                customTemplateUrl: '@'
            },
            controller: 'unContactGroup',
            link: function (scope) {

                function updateScope() {
                    scope.getGroup();
                }

                scope.$on('$stateChangeSuccess', function () {
                    updateScope();
                });

                scope.$on('PhoneBookUpdate', function () {
                    updateScope();
                });

                updateScope();
            }
        };
    }
]);

