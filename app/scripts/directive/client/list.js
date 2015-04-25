'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactClientList
 * @restrict E
 * @description
 *
 * client list
 *
 */
angular.module('unchatbar-contact').directive('unContactClientList', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/client/list.html';
            },
            controller: 'unContactClient',
            scope: {
                clientFilter : '=',
                customTemplateUrl : '@'
            },
            link : function(scope){

                /**
                 * @ngdoc methode
                 * @name init
                 * @methodOf unchatbar-contact.directive:unContactClientList
                 * @description
                 *
                 * init directive
                 *
                 */
                function updateScope (){
                    scope.getClientMap();
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

