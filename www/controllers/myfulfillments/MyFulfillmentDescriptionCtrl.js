myApp.controller('MyFulfillmentDescriptionCtrl', function($scope, $stateParams) {
	
	var localWishID = $stateParams.wishID;

	var wishRPromise = WishService.get(wishID);
	PromiseService.getData(wishRPromise, function(data){
		if(data){	  
			console.log('the data is: ', data);
		  $scope.aWish = data;
		}
	});

	//$localStorage.wish;

	// {				
	// 			'_wishMaker':'Daniel',
	// 			'_fulfiller':'Lydia',
	// 			'_charity':'Salvation Army',
	// 			'title':'Meal Partner',	
	// 			'description':'I\'m new to the city. Is there anyone who want to come and hangout with me? I\'ll pay.',
	// 			'wishStatus':'Cancelled',
	// 			'createdDate':'4/10/15',
	// 			'location':[28.222222,39.999999],
	// 			'startDate':'4/10/15',
	// 			'expireDate':'5/10/15'
	// 		}
	
})