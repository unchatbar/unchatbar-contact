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
            replace: true,
            templateUrl:'views/unchatbar-contact/client/selected.html',
            controller: 'unContactClient',
            link : function(scope){
                /**
                 * @ngdoc property
                 * @name client
                 * @propertyOf unchatbar-contact.directive:unContactClientSelected
                 * @returns {Object} selected aclient
                 */
                scope.client = {};

                /**
                 * @ngdoc methode
                 * @name init
                 * @methodOf unchatbar-contact.directive:unContactClientSelected
                 * @description
                 *
                 * init directive
                 *
                 */
                scope.init = function(){
                    scope.client = scope.getClient();
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

