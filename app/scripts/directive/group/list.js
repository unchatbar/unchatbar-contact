'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactGroupList
 * @restrict E
 * @description
 *
 * list of all groups
 *
 */
angular.module('unchatbar-contact').directive('unContactGroupList', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'views/unchatbar-contact/group/list.html',
            controller: 'unContactGroup',
            link : function(scope){
                /**
                 * @ngdoc property
                 * @name groupMap
                 * @propertyOf unchatbar-contact.directive:unContactGroupList
                 * @returns {Object} map of groups
                 */
                scope.groupMap = {};

                /**
                 * @ngdoc methode
                 * @name init
                 * @methodOf unchatbar-contact.directive:unContactGroupList
                 * @description
                 *
                 * init directive
                 *
                 */
                scope.init = function(){
                    scope.groupMap = scope.getGroupMap();
                };

                scope.$on('$stateChangeSuccess',function(){
                    scope.init();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.init();
                });
            }
        };
    }
]);

