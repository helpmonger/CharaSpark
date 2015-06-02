myApp.controller('FulfillWishCtrl', function($scope,$state, WishService, $localStorage, lodash, PromiseService, LocationService) {
	// console.log('in fulfilla wish');
	$scope.goToDetails = function(wish){		
		$state.go('tab.fulfillWishDetails', { 'wishID': wish._id});		
	}


	//get the current location

	LocationService.getCurrentLocation(function(loc){
		if(loc){
			var promise = WishService.all({location: loc, radius: 10});

			PromiseService.getData(promise,  function(data){
			    if(data){
			    	console.log('successful! ', data);
			      	$scope.wishes = lodash.sortBy(data, 'createdDate').reverse();
			    }
		    });
		}
	});

	
	
})	