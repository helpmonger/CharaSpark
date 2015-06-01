myApp.controller('FulfillWishCtrl', function($scope,$state, WishService, $localStorage, PromiseService) {
	// console.log('in fulfilla wish');
	$scope.goToDetails = function(wish){
		alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.wishdescription');
		//  {'id': '101'}
	}

	var promise = WishService.all();

	PromiseService.getData(promise,  function(data){
	    if(data){
	    	console.log('successful! ', data);
	      $scope.wishes = data
	    }
    });
	
})	