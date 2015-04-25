'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactGroupAdmin
 * @restrict E
 * @description
 *
 * selected group
 *
 */
angular.module('unchatbar-contact').directive('unContactGroupAdmin', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/group/admin.html';
            },
            scope : {
                customTemplateUrl: '@'
            },
            controller: 'unContactGroup',
            link: function (scope) {

                function updateScope() {
                    scope.getGroup();
                    scope.getClientMap();
                }

                scope.$on('$stateChangeSuccess', function () {
                    updateScope();
                    scope.adminFormGroup.$setPristine();
                });

                scope.setFormDirty = function(){
                    scope.adminFormGroup.$dirty = true;
                };

                scope.$on('PhoneBookUpdate', function () {
                    updateScope();
                });

                updateScope();
            }
        };
    }
]);

