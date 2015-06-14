(function() {
    'use strict';

    myApp.controller('MyFulfillmentDescriptionCtrl', function($scope,
    	$state,
        $stateParams,
        PromiseService,
        WishService) {

        var localWishID = $stateParams.wishID;
        //console.log('my fulfillment description of wish id = ', localWishID);
        var wishRPromise = WishService.get(localWishID);
        PromiseService.getData(wishRPromise, function(data) {
            if (data) {
                console.log('the data is: ', data);
                $scope.wish = data;
            }
        });
        
        
        $scope.Cancel = function() {
//        	console.log('cancel triggered');
        	$scope.wish.wishStatus = 'cancelled';
            WishService.update($scope.wish);
            $state.go('tab.myfulfillments');
        };
        
    });

})();
