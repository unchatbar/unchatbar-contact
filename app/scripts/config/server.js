'use strict';

angular.module('unchatbar-phone-book')
    .config(['BrokerProvider', 'PhoneBookProvider', 'ProfileProvider', 'MessageTextProvider', 'LOCALSTORAGE',
        function (BrokerProvider,  MessageTextProvider, LOCALSTORAGE) {
            PhoneBookProvider.setLocalStorage();
        }]);