'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-phone-book.directive:unContactClientSelected
 * @restrict E
 * @description
 *
 * selected client
 *
 */
angular.module('unchatbar-phone-book').directive('unContactClientSelected', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'views/unchatbar-phone-book/client/selected.html',
            controller: 'unContactClient',
            link : function(scope){

                scope.client = {};

                scope.init = function(){
                    scope.client = scope.getClient();
                };

                scope.$on('$stateChangeSuccess', function () {
                    scope.client = scope.getClient();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.client = scope.getClient();
                });
            }
        };
    }
]);

