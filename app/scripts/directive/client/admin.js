'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactClientAdmin
 * @restrict E
 * @description
 *
 * selected client
 *
 */
angular.module('unchatbar-contact').directive('unContactClientAdmin', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl:'views/unchatbar-contact/client/admin.html',
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

