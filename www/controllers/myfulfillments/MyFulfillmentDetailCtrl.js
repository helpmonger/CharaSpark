(function() {
    'use strict';

    myApp.controller('MyFulfillmentDetailCtrl', function($scope,
        $state,
        $stateParams,
        PromiseService,
        WishService,
        WishStatusService) {

        var localWishID = $stateParams.wishID;
        //console.log('my fulfillment description of wish id = ', localWishID);
        var wishRPromise = WishService.get(localWishID);
        PromiseService.getData(wishRPromise, function(data) {
            if (data) {
                console.log('the data is: ', data);
                $scope.wish = data;
                $scope.showCancel = WishStatusService.canFulfillerCancelWish(data);
                $scope.showContactInfo = WishStatusService.canFulfillerHaveContactInfo(data);
            }
        });

        $scope.Cancel = function() {
            $scope.wish.wishStatus = 'aborted';
            WishService.update($scope.wish);
            $state.go('tab.myfulfillments');
        };

    });

})();
