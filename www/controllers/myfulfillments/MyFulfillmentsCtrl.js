(function() {
    'use strict';

    //Fulfillments data needs to be updated to Fulfillments.

    myApp.controller('MyFulfillmentsCtrl', function($scope,
        $state,
        lodash,
        WishService,
        StorageService,
        PromiseService) {
        //console.log('in MyFulfillmentsCtrl');
        var user = StorageService.getCurrentUser();
        //console.log('the user id is: ', user.user._id);
        if (user) { //console.log('user = ', user);
            var promise = WishService.findWishesFromFulfiller(user.user._id);
            PromiseService.getData(promise, function(data) {
                if (data) {
                    $scope.wishes = lodash.sortBy(data, 'createdDate').reverse();
                }
            });
        }

        $scope.goToDetails = function(wish) {
            //console.log('go to detail of wish ', wish._id);
            $state.go('tab.myfulfillmentdetail', {
                'wishID': wish._id
            });
        };
    });

})();
