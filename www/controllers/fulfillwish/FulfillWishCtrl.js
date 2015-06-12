(function() {
    'use strict';
    myApp.controller('FulfillWishCtrl', function($scope,
        $state,
        WishService,
        $localStorage,
        lodash,
        PromiseService,
        LocationService) {
        //populates the location
        var locPromise = LocationService.getCurrentLocation();
        PromiseService.getData(locPromise, function(data) {
            if (data) {
                var promise = WishService.all({
                    location: data,
                    radius: 10
                });

                PromiseService.getData(promise, function(data) {
                    if (data) {
                        console.log('successful! ', data);
                        $scope.wishes = lodash.sortBy(data, 'createdDate').reverse();
                    }
                });
            }
        });

    });
})();
