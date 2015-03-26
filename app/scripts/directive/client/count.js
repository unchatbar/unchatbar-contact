'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactCount
 * @restrict E
 * @description
 *
 * client list
 *
 */
angular.module('unchatbar-contact').directive('unContactClientCount', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl:'views/unchatbar-contact/client/count.html',
            controller: 'unContactClient',
            scope: {
                clientFilter : '=',
                additionClass : '='
            },
            link : function(scope){
                /**
                 * @ngdoc property
                 * @name userCount
                 * @methodOf unchatbar-contact.directive:unContactCount
                 * @description
                 *
                 * count of clients
                 *
                 */
                scope.userCount = 0;

                /**
                 * @ngdoc methode
                 * @name init
                 * @methodOf unchatbar-contact.directive:unContactCount
                 * @description
                 *
                 * init directive
                 *
                 */
                function updateScope (){
                    scope.getClientMap();
                    scope.userCount = _.filter(scope.clientList, scope.clientFilter).length;

                }

                scope.$on('$stateChangeSuccess', function () {
                    updateScope();
                });

                scope.$on('PhoneBookUpdate', function () {
                    updateScope();
                });

                scope.$on('dataConnectionOpen', function () {
                    updateScope();
                });

                scope.$on('dataConnectionClose', function () {
                    updateScope();
                });

                updateScope();
            }
        };
    }
]);

