(function() {
    'use strict';
    myApp.controller('FulfillWishCtrl', function($scope,
        $state,
        WishService,
        $localStorage,
        lodash,
        PromiseService,
        currLoc) {
       
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
           
    })
})();
