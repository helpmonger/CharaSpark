myApp.controller('AccountCtrl', function($scope,$state, $localStorage) {

	$scope.settings = {
			enableFriends: true
    }
  
	$scope.changePassword = function(){
		//alert('in details');
		$state.go('tab.changepassword');
		//  {'id': '101'}
	}

	$scope.logOff = function(){
		$localStorage.user = '';
		$state.go('login', {}, { reload: true });
	}

})
