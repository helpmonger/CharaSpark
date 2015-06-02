myApp.controller('FulfillWishDetailsCtrl', function($scope, CharityService, $localStorage, $stateParams, WishService, PromiseService) {
	
	var wishID = $stateParams.wishID;

	var wishRPromise = WishService.get(wishID);
	PromiseService.getData(wishRPromise, function(data){
		if(data){	  
			console.log('Wish Date is: ', data);
		  $scope.wish = data;
		}
	});

	$scope.Accept = function(){
		//updates the wish status to accepted 
		 var promise = WishService.update({
        	'_id':wishID,
        	'wishStatus': 'pending'
        	});

        PromiseService.getData(promise, function(data){
          if(data){
              console.log('successfuly updated wish');
            }            
        })
	}
		
// 	// trying to convert the charityId to charityName
// 	charityId = $scope.aWish._charity;
// 	var charityName = '';
// 	var promise = CharityService.get(charityId);
// 	promise.then(function(result){
// //		console.log('result is', result.name);
// 		$scope.aWish.charityName = result.name;
// 	});// end of then
	
	// trying to convert the wishMakerId to donor's name
	
	
})