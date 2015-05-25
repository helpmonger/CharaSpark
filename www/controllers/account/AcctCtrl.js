myApp.controller('AccountCtrl', function($scope,$state, $localStorage) {

	$scope.settings = {
			enableFriends: true
    }
    
    $scope.totalDonation = 10;

	$scope.changePassword = function(){
		//alert('in details');
		$state.go('tab.changepassword');
		//  {'id': '101'}
	}

	$scope.logOff = function(){
		$localStorage.user = '';
		$state.go('login', {}, { reload: true });
	}

	var promise = WishService.findDonationsFromUser();
	promise.then(function(results,err){
		if(!err){
	      $scope.donations = results;
	      console.log('donations ', $scope.donations);
	    }
	    else {
	      console.log('error is: ', err);
	    }
	});
})
