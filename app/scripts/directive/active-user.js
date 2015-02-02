'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-phone-book.directive:activeUser
 * @restrict E
 * @description
 *
 * output active user
 *
 */
angular.module('unchatbar-phone-book').directive('activeUser', [
    function () {
        return {
            restrict: 'E', //E = element, A = attribute, C = class, M = comment
            replace: true,
            templateUrl:'views/unchatbar-phone-book/active-user.html',
            controller: 'phoneBookAdmin'
        };
    }
]);

