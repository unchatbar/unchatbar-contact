'use strict';

/**
 * @author Lars Wiedemann
 * @ngdoc directive
 * @name unchatbar-phone-book.directive:phoneBookAdmin
 * @restrict E
 * @description
 *
 * phonebook administration
 *
 */
angular.module('unchatbar-phone-book').directive('phoneBookAdmin', [
    function () {
        return {
            restrict: 'E', //E = element, A = attribute, C = class, M = comment
            replace: true,
            templateUrl:'views/unchatbar-phone-book/book-admin.html',
            controller: 'phoneBookAdmin'
        };
    }
]);

