(function() {
    'use strict';
    myApp.controller('WishDetailsCtrl', function($scope,
        $state,
        $stateParams,
        WishService,
        WishStatusService,
        PromiseService,
        $ionicPopup) {
        //gets the wishID from the url
        var wishID = $stateParams.wishID;

        var wishRPromise = WishService.get(wishID);
        PromiseService.getData(wishRPromise, function(data) {
            if (data) {
                console.log('Wish Date is: ', data);
                $scope.wish = data;
                $scope.showCancel = WishStatusService.canWishmakerCancelWish(data);
                $scope.showConfirm = WishStatusService.canWishmakerConfirmWish(data);
                $scope.showComplete = WishStatusService.canWishmakerCompleteWish(data);
            }
        });

        $scope.accept = function() {
            $state.go('tab.fulfillacceptconfirm');
        };

        /* 
            Change the wish status 
            param: operation: 'yes', 'no'; status: could be any of the wishStatus
        */
        $scope.changeStatus = function(operation, status) {
            //		console.log($scope.wish);
            if (status === 'new') {
                if (operation === 'no') {
                    $scope.wish.wishStatus = 'cancelled';
                }
            } else if (status === 'pending') {
                if (operation === 'no') {
                    $scope.wish.wishStatus = 'cancelled';
                    WishService.update($scope.wish);
                } else if (operation === 'yes') {
                    $scope.wish.wishStatus = 'proceeding';
                } else {}
            } else if (status === 'proceeding') {
                if (operation === 'no') {
                    $scope.wish.wishStatus = 'cancelled';
                    WishService.update($scope.wish);
                } else if (operation === 'yes') {
                    $scope.wish.wishStatus = 'completed';
                } else {}
            } else {

            }

            WishService.update($scope.wish);
        };
    /* 
    To show confirmation window for the button "Complete" or "Confirm"
    param: operation: 'yes', 'no'; status: could be any of the wishStatus
    */
    $scope.showCompleteOrConfirm = function(operation, status) {
        var promptMsg = '';
       if(status == 'proceeding') {
            promptMsg = 'Are you sure you want to mark the wish as completed?';
        }else{
            promptMsg = 'Are you sure you want to confirm?';
        } 
       
       var confirmPopup = $ionicPopup.confirm({
            title: 'Confirmation',
            template: promptMsg
       });
       confirmPopup.then(function(res) {
         if(res) {
            //invoke changeStatus to actually change status
           $scope.changeStatus(operation,status);
           console.log('OK dokey');
         } else {
           console.log('Do nothing');
         }
       });
    };
    
    /* 
    To show confirmation window for the button "Cancel"
    param: operation: 'yes', 'no'; status: could be any of the wishStatus
    */
    $scope.showCancel = function(operation, status) {
       var promptMsg = 'Are you sure to cancel?';
       
       var confirmPopup = $ionicPopup.confirm({
            title: 'Confirmation',
            template: promptMsg
       });
       confirmPopup.then(function(res) {
         if(res) {
           $scope.changeStatus(operation,status);
           console.log('OK dokey');
         } else {
           console.log('Do nothing');
         }
       });
    };

    });
})();
