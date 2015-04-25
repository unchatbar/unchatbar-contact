'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactClientSelected
 * @restrict E
 * @description
 *
 * selected client
 *
 */
angular.module('unchatbar-contact').directive('unContactClientSelected', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/client/selected.html';
            },
            scope : {
                customTemplateUrl: '@'
            },
            controller: 'unContactClient',
            link : function(scope){

                function updateScope (){
                    scope.getClient();
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

