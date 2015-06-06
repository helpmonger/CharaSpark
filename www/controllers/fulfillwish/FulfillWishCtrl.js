(function() {
    'use strict';
    myApp.controller('FulfillWishCtrl', function($scope,
        $state,
        WishService,
        $localStorage,
        lodash,
        PromiseService,
        currLoc) {
        // console.log('in fulfilla wish');
        $scope.goToDetails = function(wish) {
            $state.go('tab.fulfillWishDetails', {
                'wishID': wish._id
            });
        }
        //get the current location


        // LocationService.getCurrentLocation(function(loc) {
            // if (loc) {
                var promise = WishService.all({
                    location: currLoc,
                    radius: 10
                });

                PromiseService.getData(promise, function(data) {
                    if (data) {
                        console.log('successful! ', data);
                        $scope.wishes = lodash.sortBy(data, 'createdDate').reverse();
                    }
                });
            // }
        // });
    })
})();
