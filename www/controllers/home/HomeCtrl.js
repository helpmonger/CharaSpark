myApp.controller('HomeCtrl', function($scope, CharityService, $state, lodash, $localStorage, $ionicLoading, WishService) {
  //populates the list of charities
  var selectedCharity = '';

  $scope.selectCharity = function(charity){
  	console.log('charity is: ', charity)
  };
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

//get geo location stuff
  var geoLoc = {
  	long: '',
  	lat: ''
  };

	navigator.geolocation
    .getCurrentPosition(function(pos) {
            geoLoc.lat = pos.coords.latitude;
            geoLoc.long = pos.coords.longitude;
            console.log('geoLoc is: ', geoLoc);
            //var result = $scope.calcDistance(-81.06333, 33.95576, long, lat);
            // console.log('result is: ' + result);
        });


	$scope.MakeAWish = function(wish){

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

	var promise = WishService.All();
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

  }) //end of controller