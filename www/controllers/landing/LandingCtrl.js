myApp.controller('LandingCtrl', function($scope, $state) {

	$scope.emailLogin = function(){
		$state.go('login');
	}
})