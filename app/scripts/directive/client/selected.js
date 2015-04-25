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
            templateUrl: function(element){
                return element.attr('data-custom-template-url') || 'views/unchatbar-contact/client/selected.html';
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

