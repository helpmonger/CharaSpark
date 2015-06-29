(function() {
    'use strict';

    myApp.controller('EditProfileCtrl', function($scope,
        $state,
        UserService,
        StorageService) {
    	
        $scope.changePassword = function() {
            //alert('in details');
            $state.go('tab.changepassword');
            //  {'id': '101'}
        };
        
        var user = StorageService.getCurrentUser();
        $scope.user = user.user;
        
        // update user profile
        $scope.updateProfile = function(){
//        	console.log($scope.user);
        	UserService.update($scope.user);
        	
        }

    }); // end of EditProfileCtrl

})();
