'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-contact.directive:unContactGroupAdd
 * @restrict E
 * @description
 *
 * add new group
 *
 */
angular.module('unchatbar-contact').directive('unContactGroupAdd', [
    function () {
        return {
            restrict: 'E',
            replace: false,
            templateUrl: function(element,scope){
                return scope.customTemplateUrl || 'views/unchatbar-contact/group/add.html';
            },
            scope : {
                customTemplateUrl: '@'
            },
            controller: 'unContactGroup'
        };
    }
]);

