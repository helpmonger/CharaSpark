(function() {
    'use strict';

    myApp.controller('FulfillWishDetailsCtrl', function($scope,
        CharityService,
        StorageService,
        $stateParams,
        WishService,
        PromiseService) {

        var user = StorageService.getCurrentUser();
        if (user) {
            $scope.wishAccepted = false;

            var wishID = $stateParams.wishID;

            var wishRPromise = WishService.get(wishID);
            PromiseService.getData(wishRPromise, function(data) {
                if (data) {
                    console.log('Wish Date is: ', data);
                    $scope.wish = data;
                }
            });
        };

        $scope.Accept = function() {
            //updates the wish status to accepted
            if (user && user.user) {
                var promise = WishService.update({
                    '_id': wishID,
                    'wishStatus': 'pending',
                    _fulfiller: user.user._id
                });

                PromiseService.getData(promise, function(data) {
                    if (data) {
                        console.log('successfuly updated wish');
                        $scope.wishAccepted = true;
                    }
                });
            }
        };
        
    });
})();
