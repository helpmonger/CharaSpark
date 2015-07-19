(function() {
    'use strict';

    myApp.controller('ChangePasswordCtrl', function($scope,
        $state,
        UserService,
        StorageService,
        AuthService) {
    	
    	$scope.pass= {};
    	$scope.errorMsg = "";
    	
        var user = StorageService.getCurrentUser();
        $scope.user = user.user;   
    	
        $scope.ChangeIt = function(){
        	console.log('ChangeIt activated');
        	console.log($scope.pass);
        	console.log($scope.user);
        	
        	if($scope.pass.pass1 != $scope.pass.pass2){
//        		console.log("pass1 != pass2");
        		$scope.errorMsg = "Unmatch. Please re-enter your new password.";
        	}
        	else{
//        		$scope.errorMsg = "match";
        		// check if oldPassword matches the password in db.
        		$scope.user.oldPass = $scope.pass.oldPass;
        		$scope.user.newPass = $scope.pass.pass1;
        		
        		var sth = AuthService.changePassword($scope.user);
        		$state.go('tab.account');
        	}
        	
        }
        

    }); // end of EditProfileCtrl

})();
