'use strict';
angular.module('unchatbar-phone-book')
    .config(['$stateProvider','$locationProvider',
        function ($stateProvider,$locationProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('layoutChat', {
                    abstract: true,
                    templateUrl: 'views/unchatbar-phone-book/layout/chat/index.html'
                })
                .state('chat', {
                    parent: 'layoutChat',
                    url: '/chat',
                    views: {
                        sidebar: {
                            templateUrl: 'views/unchatbar-phone-book/layout/chat/sidebar.html'
                        },
                        content: {
                            templateUrl: 'views/unchatbar-phone-book/layout/chat/content.html'
                        }

                    }
                    //templateUrl: 'views/peer/layout/chat/header.html'
                })
                .state('chat.user', {
                    url: '/user/{peerId}',
                    parent: 'chat'

                })
                .state('chat.group', {
                    url: '/group/{groupId}',
                    parent: 'chat'
                })
                .state('chat.profile', {
                    url: '/profile',
                    parent: 'layoutChat',
                    views: {
                        header: {
                            templateUrl: 'views/unchatbar-phone-book/layout/chat/header.html'
                        },
                        sidebar: {
                            templateUrl: 'views/unchatbar-phone-book/layout/chat/sidebar.html'
                        },
                        content: {
                            templateUrl: 'views/unchatbar-phone-book/profile-admin.html'
                        },
                        footer: {
                            templateUrl: 'views/unchatbar-phone-book/layout/chat/footer.html'
                        }
                    }

                });


        }
    ]);