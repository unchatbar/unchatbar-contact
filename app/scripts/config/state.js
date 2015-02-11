'use strict';
angular.module('unchatbar-phone-book')
    .config(['$stateProvider','$locationProvider',
        function ($stateProvider,$locationProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('layoutChat', {
                    abstract: true,
                    templateUrl: 'views/unchatbar-phone-book/index.html'

                })
                .state('contact', {
                    parent: 'layoutChat',
                    url: '/contact'
                })
                .state('contact.client', {
                    parent: 'contact',
                    url: '/user/{clientId}'


                })
                .state('contact.group', {
                    parent: 'contact',
                    url: '/group/{groupId}'

                });
        }
    ]);