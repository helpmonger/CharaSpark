myApp.controller('HomeCtrl', function($scope, CharityService, $state, lodash, $localStorage, $ionicLoading, WishService) {
  

// populates variables needed by page

  //populates charities 
var promise = CharityService.all();
  promise.then(function(chars, err) {
    // returns a list of users
    if(!err){
      // console.log('list is: ', chars);
      $scope.charities = lodash.sortBy(chars.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
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

  var selectedCharity = '';

  $scope.selectCharity = function(charity){
    console.log('charity is: ', charity)
  };
  

  $scope.goToDetails = function(wish){
    alert('in details');
    $localStorage.wish = wish;
    $state.go('tab.mywishdescription');
    //  {'id': '101'}
  }

	$scope.MakeAWish = function(wish){

//get geo location stuff

  var geoLoc = [];

  navigator.geolocation
    .getCurrentPosition(function(pos) {
            geoLoc.push(pos.coords.latitude);
            geoLoc.lpush(pos.coords.longitude);
            console.log('geoLoc is: ', geoLoc);
            //var result = $scope.calcDistance(-81.06333, 33.95576, long, lat);
            // console.log('result is: ' + result);
        });

	    wish.geoLoc = geoLoc;
	    wish.wishstatus = 'new';
	    wish.haspaid = 'true';
		wish.charityName = 'test charity';
		console.log('the wish is: ', wish);

				var promise = WishService.addWish(wish);
				promise.then(function(result, err) {
	                                  // returns a list of results
		      if(!err){
		        	console.log('wish successfully added: ', result);
		    	}
		    	else {
		    		$state.go('tab.tree');
		    	}
		       
		    }); //end of then
		// } //end of else
		console.log('clicked');
		$state.go('tab.tree');
	}

	

  }) //end of controller