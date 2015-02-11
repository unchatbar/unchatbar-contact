'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-phone-book.directive:phoneBook
 * @restrict E
 * @description
 *
 * save client connections , for recall
 *
 */
angular.module('unchatbar-phone-book').directive('unContactGroupSelected', [
    function () {
        return {
            restrict: 'E', //E = element, A = attribute, C = class, M = comment
            replace: true,
            templateUrl:'views/unchatbar-phone-book/group/selected.html',
            controller: 'unContactGroup',
            link : function(scope){
                /**
                 * @ngdoc property
                 * @name groupMap
                 * @propertyOf unchatbar-phone-book.controller:unContactGroup
                 * @returns {Object} map of groups
                 */
                scope.group = scope.getGroup();
console.log(scope.group);
                scope.clientMap = scope.getClientMap();
                scope.$on('$stateChangeSuccess',function(){
                    scope.group = scope.getGroup();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.group = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                });
            }
        };
    }
]);

