(function() {
    'use strict';

    myApp.controller('EditProfileCtrl', function($scope,
        $state,
        UserService,
        StorageService) {
    	
        $scope.goChangePassword = function() {
            $state.go('tab.changepassword');
            //  {'id': '101'}
        };
        
        var user = StorageService.getCurrentUser();
        $scope.user = user.user;
        
        // update user profile
        $scope.updateProfile = function(){
        	UserService.update($scope.user);
        	$state.go('tab.account');
        }

    }); // end of EditProfileCtrl

})();
