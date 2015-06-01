//Fullfillments data needs to be updated to Fullfillments.

myApp.controller('MyFulfillmentsCtrl', function($scope, $state, WishService, StorageService) {
console.log('in MyFullfillmentsCtrl');
	var user = StorageService.getCurrentUser();
		console.log('the user id is: ', user.user._id);
	if(user)
	{   console.log('user = ', user);
		var promise = WishService.findWishesFromFulfiller(user.user._id);
		promise.then(function(wishes,err){
			if(!err){
		      $scope.wishes = wishes;
		      console.log('wishes ', $scope.wishes);
		    }
		    else {
		      console.log('error is: ', err);
		    }
		});
	}

	
	$scope.goToDetails = function(wish){
		$state.go('tab.myfulfillmentdescription',{'wishID': wish._id});
	}
})