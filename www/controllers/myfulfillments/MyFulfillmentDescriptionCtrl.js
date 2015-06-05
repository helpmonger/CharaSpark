(function() {
    'use strict';

    myApp.controller('MyFulfillmentDescriptionCtrl', function($scope,
        $stateParams,
        PromiseService,
        WishService) {

        var localWishID = $stateParams.wishID;
        //console.log('my fulfillment description of wish id = ', localWishID);
        var wishRPromise = WishService.get(localWishID);
        PromiseService.getData(wishRPromise, function(data) {
            if (data) {
                console.log('the data is: ', data);
                $scope.aWish = data;
            }
        });
    })

})();
