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
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-contact/group/selected.html';
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

