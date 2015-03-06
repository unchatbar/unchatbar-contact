'use strict';
angular.module('unchatbar-contact')
    .config(['PhoneBookProvider','BrokerProvider','LOCALSTORAGE',
        function ( PhoneBookProvider, BrokerProvider, LOCALSTORAGE) {
            BrokerProvider.setHost('0.0.0.0');
            BrokerProvider.setPort(9000);
        }]);