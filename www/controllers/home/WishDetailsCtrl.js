(function() {
    'use strict';
    myApp.controller('WishDetailsCtrl', function($scope,
        $state,
        $stateParams,
        WishService,
        PromiseService) {
        //gets the wishID from the url
        var wishID = $stateParams.wishID;

        var wishRPromise = WishService.get(wishID);
        PromiseService.getData(wishRPromise, function(data) {
            if (data) {
                console.log('Wish Date is: ', data);
                $scope.wish = data;
            }
        });

        $scope.accept = function() {
            $state.go('tab.fullfillacceptconfirm');
        };

        $scope.changeStatus = function(operation, status) {
            //		console.log($scope.wish);
            if (status === 'new') {
                if (operation === 'no') {
                    $scope.wish.wishStatus = 'cancelled';
                }
            } else if (status === 'pending') {
                if (operation === 'no') {
                    $scope.wish.wishStatus = 'cancelled';
                    WishService.update($scope.wish);
                } else if (operation === 'yes') {
                    $scope.wish.wishStatus = 'proceeding';
                } else {}
            } else if (status === 'proceeding') {
                if (operation === 'no') {
                    $scope.wish.wishStatus = 'cancelled';
                    WishService.update($scope.wish);
                } else if (operation === 'yes') {
                    $scope.wish.wishStatus = 'completed';
                } else {}
            } else {

            }

            WishService.update($scope.wish);
        };

    });
})();
