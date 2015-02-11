'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-phone-book.directive:unContactGroupList
 * @restrict E
 * @description
 *
 * save client connections , for recall
 *
 */
angular.module('unchatbar-phone-book').directive('unContactGroupList', [
    function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl:'views/unchatbar-phone-book/group/list.html',
            controller: 'unContactGroup',
            link : function(scope){
                /**
                 * @ngdoc property
                 * @name groupMap
                 * @propertyOf unchatbar-phone-book.controller:unContactGroup
                 * @returns {Object} map of groups
                 */
                scope.groupMap = [];

                scope.init = function(){
                    scope.groupMap = scope.getGroupMap();
                };

                scope.$on('$stateChangeSuccess',function(){
                    scope.groupMap = scope.getGroupMap();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.groupMap = scope.getGroupMap();
                });
            }
        };
    }
]);

