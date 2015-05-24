myApp.controller('HomeCtrl', function($scope, CharityService, $state, lodash, $localStorage, $ionicLoading, WishService, DonationService) {
  

$scope.wish = {
  title: '',
  description: '',
}

$scope.donation = {
  amount: null,
}


// populates variables needed by page

  //populates charities 
var promise = CharityService.all();
  promise.then(function(chars, err) {
    // returns a list of users
    if(!err){
      // console.log('list is: ', chars);
      $scope.charities = lodash.sortBy(chars, 'name');; // first Restangular obj in list: { id: 123 }
      console.log('charities ', $scope.charities);
    }
    else {
      console.log('error is: ', err);
    }

  }); // end of promise 



  //populates wishes
var promise = WishService.all();
    promise.then(function(wishes, err) {
    // returns a list of users
    if(!err){
      // console.log('list is: ', wishes);
      $scope.wishes = wishes;
      console.log('wishes ', $scope.wishes);
    }
    else {
      console.log('error is: ', err);
    }

  }); // end of promise 




  //inject methods available on page

  $scope.selectedCharity = '';

  $scope.selectCharity = function(charity){
    console.log('charity is: ', charity)
  };
  

  $scope.goToDetails = function(wish){
    alert('in details');
    $localStorage.wish = wish;
    $state.go('tab.mywishdescription');
    //  {'id': '101'}
  }

	$scope.MakeAWish = function(){

//get geo location stuff
  console.log('selected charity is: ', $scope.selectedCharity);

    var geoLoc = [];

    navigator.geolocation
      .getCurrentPosition(function(pos) {
              geoLoc.push(pos.coords.latitude);
              geoLoc.push(pos.coords.longitude);
              console.log('geoLoc is: ', geoLoc);
          });

	    $scope.wish.location = geoLoc;
	   
  		$scope.wish._charity = $scope.selectedCharity._id;
      $scope.donation._charity = $scope.selectedCharity._id;
  		console.log('the wish is: ', $scope.wish);

  				var promise = WishService.add($scope.wish);
  				promise.then(function(wishResult, wishErr) {
  	                                  
  		      if(!wishErr){
  		        	console.log('wish successfully added: ', wishResult);
                //add the donation
                //associates the wishID with donation
                $scope.donation._wish = wishResult._id;
                promise = DonationService.add($scope.donation);

                promise.then(function(donationResult, donationErr) {
                    if(!donationErr){
                      console.log('donation successfully added: ', donationResult);
                    } else {
                      console.log('error adding donation: ', donationErr)
                    }
                });

  		    	}
  		    	else {
  		    		// $state.go('tab.tree');
              console.log('error adding wish: ', wishErr)
  		    	}
  		       
  		    }); //end of then
  		// } //end of else
  		console.log('clicked');
  		$state.go('tab.tree');
	}

	

  }) //end of controller