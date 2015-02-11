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
            restrict: 'E',
            replace: true,
            templateUrl:'views/unchatbar-phone-book/group/selected.html',
            controller: 'unContactGroup',
            link : function(scope){
                scope.groupItem = {};

                scope.clientMap = {};

                scope.init =  function(){
                    scope.groupItem = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                };

                scope.$on('$stateChangeSuccess',function(){
                    scope.groupItem = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                });

                scope.$on('PhoneBookUpdate', function () {
                    scope.groupItem = scope.getGroup();
                    scope.clientMap = scope.getClientMap();
                });
            }
        };
    }
]);

