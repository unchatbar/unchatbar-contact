'use strict';
angular.module('unchatbar-phone-book')
    .config(['PhoneBookProvider','BrokerProvider','LOCALSTORAGE',
        function ( PhoneBookProvider, BrokerProvider, LOCALSTORAGE) {
            BrokerProvider.setHost('unchatbar-server.herokuapp.com');
        }]);