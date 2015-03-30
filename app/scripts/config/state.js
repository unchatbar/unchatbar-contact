'use strict';
angular.module('unchatbar-contact')
    .config(['$stateProvider', '$locationProvider',
        function ($stateProvider, $locationProvider) {
            $locationProvider.html5Mode(true);

            $stateProvider
                .state('profileAdmin', {
                    url: '/profile'

                })
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

                })
                .state('channel', {
                    parent: 'contact',
                    url: '/{channel}',
                    resolve:{
                        getPeerId: ['$stateParams','PhoneBook',function( $stateParams,PhoneBook){
                            $stateParams.clientId = PhoneBook.getClientByChannel($stateParams.channel).id || null;
                            $stateParams.groupId = PhoneBook.getGroupByChannel($stateParams.channel).id || null;
                        }]

                    }
                });
        }
    ]);