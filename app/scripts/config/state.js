'use strict';
angular.module('unchatbar-contact')
    .config(['$stateProvider','$locationProvider',
        function ($stateProvider,$locationProvider) {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('contact', {
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