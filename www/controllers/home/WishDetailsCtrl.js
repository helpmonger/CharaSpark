myApp.controller('WishDetailsCtrl', function($scope, $state, $stateParams, WishService, PromiseService) {
	
	//gets the wishID from the url
	var wishID = $stateParams.wishID;

	var wishRPromise = WishService.get(wishID);
	PromiseService.getData(wishRPromise, function(data){
		if(data){	  
			console.log('the data is: ', data);
		  $scope.wish = data;
		}
	});
	
	$scope.accept = function(){
		$state.go('tab.fullfillacceptconfirm');
	}
	
})	