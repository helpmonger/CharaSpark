(function() {
    'use strict';

    myApp.controller('AccountCtrl', function($scope,
        $state,
        StorageService,
        DonationService,
        userInfo) {

        console.log('in acct ctrl');
        // assign the user value from localStorage to local scope
        // var user = ;
        $scope.user = userInfo.user;

        //StorageService.getCurrentUser().user;
        // console.log('user in storage: ', user.user);

        $scope.changePassword = function() {
            //alert('in details');
            $state.go('tab.changepassword');
            //  {'id': '101'}
        };

        $scope.logOff = function() {
            StorageService.resetCurrentUser();
            $state.go('login');
            //, {}, { reload: true });
        };

        var promise = DonationService.findDonationsFromUser($scope.user._id);
        promise.then(function(results, err) {
            if (!err) {
                $scope.donations = results;
                $scope.totalDonation = results.totalDonation;
                console.log('donations ', $scope.donations);
            } else {
                console.log('error is: ', err);
            }
        });

    }); // end of AccountCtrl

})();
