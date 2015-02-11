'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-phone-book.directive:unContactClientList
 * @restrict E
 * @description
 *
 * client list
 *
 */
angular.module('unchatbar-phone-book').directive('unContactClientList', [
    function () {
        return {
            restrict: 'E', //E = element, A = attribute, C = class, M = comment
            replace: true,
            templateUrl:'views/unchatbar-phone-book/client/list.html',
            controller: 'unContactClient',
            link : function(scope){
                scope.clientMap = scope.getClientMap();

                scope.$on('$stateChangeSuccess', function () {
                    scope.clientMap = scope.getClientMap();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.clientMap = scope.getClientMap();
                });
            }
        };
    }
]);

