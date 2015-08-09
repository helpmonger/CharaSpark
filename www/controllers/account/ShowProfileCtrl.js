(function() {
    'use strict';

    myApp.controller('ShowProfileCtrl', function($scope,
        $state,
        StorageService,
        DonationService,
        userInfo) {

        console.log('in showprofile ctrl');
        // assign the user value from localStorage to local scope
        // var user = ;
        $scope.user = userInfo.user;

        //StorageService.getCurrentUser().user;
        // console.log('user in storage: ', user.user);


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
