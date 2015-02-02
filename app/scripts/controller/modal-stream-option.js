'use strict';

/**
 * @ngdoc controller
 * @name  unchatbar-phone-book.controller:streamOption
 * @require $scope
 * @require Stream
 * @description
 *
 * display streams
 *
 */
angular.module('unchatbar-phone-book').controller('modalStreamOption', ['$scope', '$modalInstance',
    function ($scope, $modalInstance) {

        $scope.videoCall = function () {
            $modalInstance.close({
                video: true,
                audio: true
            });
        };

        $scope.audiCall = function () {
            $modalInstance.close({
                video: false,
                audio: true
            });
        };
    }
]);