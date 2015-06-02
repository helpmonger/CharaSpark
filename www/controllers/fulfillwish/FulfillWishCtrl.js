myApp.controller('FulfillWishCtrl', function($scope,$state, WishService, $localStorage, PromiseService, LocationService) {
	// console.log('in fulfilla wish');
	$scope.goToDetails = function(wish){
		alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.wishdescription');
		//  {'id': '101'}
	}


	//get the current location

	LocationService.getCurrentLocation(function(loc){
		if(loc){
			var promise = WishService.all({location: loc, radius: 10});

			PromiseService.getData(promise,  function(data){
			    if(data){
			    	console.log('successful! ', data);
			      $scope.wishes = data
			    }
		    });
		}
	});

	
	
})	