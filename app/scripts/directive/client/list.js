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
            replace: true,
            templateUrl:'views/unchatbar-contact/client/list.html',
            controller: 'unContactClient',
            link : function(scope){
                /**
                 * @ngdoc property
                 * @name clientMap
                 * @propertyOf unchatbar-contact.directive:unContactClientList
                 * @returns {Object} list of clients
                 */
                scope.clientMap = {};

                /**
                 * @ngdoc methode
                 * @name init
                 * @methodOf unchatbar-contact.directive:unContactClientList
                 * @description
                 *
                 * init directive
                 *
                 */
                scope.init = function(){
                    scope.clientMap = scope.getClientMap();
                };

                scope.$on('$stateChangeSuccess', function () {
                    scope.init();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.init();
                });
            }
        };
    }
]);

