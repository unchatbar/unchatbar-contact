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
                .state('chat', {
                    parent: 'layoutChat',
                    url: '/chat'
                })
                .state('chat.client', {
                    url: '/user/{clientId}',
                    parent: 'chat'

                })
                .state('chat.group', {
                    url: '/group/{groupId}',
                    parent: 'chat'
                });
        }
    ]);