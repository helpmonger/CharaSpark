myApp.controller('FulfillWishCtrl', function($scope,$state, WishService, $localStorage) {
	
	$scope.goToDetails = function(wish){
		alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.wishdescription');
		//  {'id': '101'}
	}

	var promise = WishService.findWishesFromFulfiller();
	promise.then(function(wishes,err){
		if(!err){
	      $scope.wishes = wishes;
	      console.log('wishes ', $scope.wishes);
	    }
	    else {
	      console.log('error is: ', err);
	    }
	});
	
})	