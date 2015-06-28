(function() {
    'use strict';

    myApp.controller('HomeCtrl', function($scope,
        CharityService,
        $state,
        lodash,
        $localStorage,
        $ionicLoading,
        WishService,
        DonationService,
        StorageService,
        PromiseService,
        LocationService) {

        console.log('in home ctrl');
        //---------- get current user info ---------------

        var user = StorageService.getCurrentUser();

        if (user) {
            // console.log('in home ctrl and the user is: ', user);
            // ---------- declare variables needed by $scope ---------------

            $scope.wish = {};

            $scope.donation = {
                amount: null,
            };

            $scope.charity = {
                selectedCharity: '',
            };

            // ---------- populates variables needed by page ---------------

            //populates the location
            var locPromise = LocationService.getCurrentLocation();
            PromiseService.getData(locPromise, function(data) {
                if (data) {
                    //populates charities for dropdown
                    var charityPromise = CharityService.all({
                        location: data,
                        radius: 10
                    });

                    PromiseService.getData(charityPromise, function(data) {
                        if (data) {
                            $scope.charities = lodash.sortBy(data, 'name');
                        }
                    });
                }
            });

            //populates the user's wishes
            var wishPromise = WishService.findWishesFromUser(user.user._id);
            PromiseService.getData(wishPromise, function(data) {
                if (data) {
                    $scope.wishes = lodash.sortBy(data, 'createdDate').reverse();
                }
            });

            console.log('wishes ', $scope.wishes);

            //populates the location
            var locPromise = LocationService.getCurrentLocation();
            PromiseService.getData(locPromise, function(data) {
                if (data) {
                    $scope.loc = data;
                    console.log('the loc is: ', $scope.loc);
                }
            });

            // //get geo location
            // console.log('loc is: ', currLoc);

            $scope.MakeAWish = function() {
                $scope.wish.location = $scope.loc;
                // console.log('geo loc is: ', currLoc);
                $scope.donation._charity = $scope.wish._charity;

                console.log('the wish is: ', $scope.wish);

                var wishCPromise = WishService.add($scope.wish);

                PromiseService.getData(wishCPromise, function(wishData) {
                    if (wishData) {
                        console.log('wish successfully created');
                        console.log('wish id is: ', wishData._id);
                        //associated the wish id to the donation
                        $scope.donation._wish = wishData._id;

                        //add the donation
                        var donationPromise = DonationService.add($scope.donation);
                        PromiseService.getData(donationPromise, function(donationData) {
                            if (donationData) {

                                console.log('donation successfully created');
                                console.log('donation id is: ', donationData._id);
                                //update the wish with the donationID
                                wishData._donation = donationData._id;
                                var wishUPromise = WishService.update(wishData);
                                PromiseService.getData(wishUPromise, function(wishData2) {
                                    if (wishData2) {
                                        console.log('the wish has been updated.');
                                        $state.go('tab.tree', {
                                            'donationID': donationData._id
                                        });
                                    }
                                }); //end of PromiseService
                            } //end of if(donationData)
                        });
                    }
                });

            }; //end of make a wish

            //transitions to the wish details page
            $scope.goToDetails = function(wish) {
                // save wish object to the localStorage for the next page using
                // $localStorage.wish = wish;
                $state.go('tab.wishDetails', {
                    'wishID': wish._id
                });
            };

            $scope.showCharity = function(charity) {
                alert('qq');
            };

        } //end of if(user)

        $scope.doRefresh = function() {
            //populates the user's wishes
            console.log('refreshing...');
            var wishPromise = WishService.findWishesFromUser(user.user._id);
            PromiseService.getData(wishPromise, function(data) {
                if (data) {
                    $scope.wishes = lodash.sortBy(data, 'createdDate').reverse();
                }
                $scope.$broadcast('scroll.refreshComplete');
            });

        };

    }); //end of controller

})();
