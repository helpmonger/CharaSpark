angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope, AuthService, $state, $localStorage) {

console.log('in login');
//if logged in, go to landing
	if ($localStorage.user) {
        $state.go('tab.landing');
    }

	$scope.LogIn = function(userObj){
		// console.log('scope user is: ', userObj);
		var promise = AuthService.signin(userObj);
		promise.then(function(user, err) {
			console.log('user is: ', user);
                                  // returns a list of users
	      if(!err && user.success){
	        console.log('user is: ', user);
	        $localStorage.user = user;
	        if($localStorage.prevPage){
	        	$state.go($localStorage.prevPage);
	        	$localStorage.prevPage = '';
	        } else {
	        	$state.go('tab.landing');
	        }

	        // alert('charity email is: ' + user.emailAddress);
	        //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
	      }
	      else {
	        console.log('error is: ', err);
	        $scope.error = "invalid credentials";
	      }
	    }); //end of then

	}

 $scope.test = function(){
    	$state.go('tab.signup');
    }

})

.controller('SignupCtrl', function($scope, AuthService, $localStorage, $state) {
	// alert('we re in sign up');
    console.log($localStorage.user);
    if ($localStorage.user) {
        $state.go('tabs.landing');
    }

	$scope.SignUp = function(userObj){
		console.log('scope user is: ', userObj);
		var promise = AuthService.signup(userObj);
		promise.then(function(user, err) {
                                  // returns a list of users
	      if(!err){
	        console.log('user is: ', user);
	        $localStorage.user = user;
	        if($localStorage.prevPage){
	        	$state.go($localStorage.prevPage);
	        	$localStorage.prevPage = '';
	        } else {
	        	$state.go('tab.landing');
	        }

	        // alert('charity email is: ' + user.emailAddress);
	        //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
	      }
	      else {
	        console.log('error is: ', err);
	        $scope.error = "unable to sign up at this time";
	      }
	    }); //end of then
	}// end of sign up

})


.controller('MyWishesCtrl', function($scope, $state, WishService) {

//to-do: add redirect if user doesn't have permission;
	console.log('in wish ctrl');
	var promise = WishService.getWishesToFulfill({_id: 'jsfd'});
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


			
	// 	"101":{
	// 		'title':'Looking for Run Partner',	
	// 		'charity':'Salvation Army',
	// 		'amount':10,
	// 		'date':'4/10/15',
	// 		'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
	// 		'status':'published',
	// 		'donor':'David',
	// 		'fulfiller':''
	// 	},
	// 	"102":{
	// 		'title':'Looking for Run Partner 2',	
	// 		'charity':'Salvation Army 2',
	// 		'amount':10,
	// 		'date':'4/10/15',
	// 		'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
	// 		'status':'published',
	// 		'donor':'David',
	// 		'fulfiller':''
	// 	},
	// 	"103":{
	// 		'title':'Looking for Run Partner 3',	
	// 		'charity':'Salvation Army 3',
	// 		'amount':10,
	// 		'date':'4/10/15',
	// 		'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
	// 		'status':'published',
	// 		'donor':'David',
	// 		'fulfiller':''
	// 	}
	// }
	
	$scope.goToDetails = function(){
		//alert('in details');
		$state.go('tab.mywishdescription');
		//  {'id': '101'}
	}
	
})

.controller('MyWishDescriptionCtrl', function($scope) {
	
	$scope.aWish={
			'title':'Looking for Run Partner',	
			'charity':'Salvation Army',
			'amount':10,
			'date':'4/10/15',
			'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
			'status':'published',
			'donor':'David',
			'fulfiller':''
		}
	
})


//tab-landing

.controller('LandingCtrl', function($scope, CharityService, $state, lodash, $localStorage, $ionicLoading, WishService) {
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
		wish.charityName = 'test charity';
		console.log('the wish is: ', wish);

		// if(!$localStorage.user){ //if user is not authenticated
		// 	//direct to braintree page
		// 	console.log('!user');
		// 	$localStorage.prevPage = 'tab.tree';
		// 	$state.go('tab.relogin');
		// 	return;
		// } 
		// else {
			//create wish
			//rediret to tree for payment
				var promise = WishService.addWish(wish);
				promise.then(function(result, err) {
	                                  // returns a list of results
		      if(!err){
		        	console.log('wish successfully added: ', result);
		    	}
		    	else {
		    		$state.go('tab.tree');
		    	}
		        // if($localStorage.prevPage){
		        // 	$state.go($localStorage.prevPage);
		        // 	$localStorage.prevPage = '';
		        // } else {
		        // 	$state.go('tab.landing');
		        // }

		        // alert('charity email is: ' + user.emailAddress);
		        //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
		      //}
		      // else {
		      //   console.log('error is: ', err);
		      //   $scope.error = "invalid credentials";
		      // }
		    }); //end of then
		// } //end of else
		console.log('clicked');
		$state.go('tab.tree');
	}
  }) //end of controller

.controller('TreeCtrl', function($scope, $localStorage, $state, $braintree, TreeService){
            console.log('donation amt is: ' + $localStorage.donationAmt);
            $scope.donationAmt = $localStorage.donationAmt;
          $localStorage.donationAmt = $localStorage.donationAmt;
            

            var client;
                $scope.creditCard = {
                  number: '',
                  expirationDate: ''
                };

            var startup = function() {
              $braintree.getClientToken().success(function(token) {
                client = new $braintree.api.Client({
                  clientToken: token
                });
              });
            }

            $scope.payButtonClicked = function(){
              client.tokenizeCard({
                number: $scope.creditCard.number,
                expirationDate: $scope.creditCard.expirationDate
              }, function (err, nonce) {
                
                var form = {amount: $localStorage.donationAmt,
                            nounce: nonce};
                // console.log('nonce is ', nonce);
                // console.log('form is ', form);
                // - Send nonce to your server (e.g. to make a transaction) 
                
                var promise = TreeService.makePayment(form);

                 promise.then(function(paymentComplete, err) {
                                  // returns a list of users
                  if(!err && paymentComplete.success){
                    console.log('paymentComplete is: ', paymentComplete);
                    $scope.paymentComplete = paymentComplete;
                    $state.go('tab.acceptconfirm');
                    // alert('charity email is: ' + clientToken.emailAddress);
                    //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
                  }
                  else {
                    console.log('error making payment: ', err);
                  }
                }) //end of then

              });
            }; //end of pay button click
  
             startup();
             
	//close sth
	})// end of TreeCtrl



//tab-fullfillawish
.controller('FullfillaWishCtrl', function($scope,$state, WishService) {
	
	var promise = WishService.getWishesToFulfill({_id: 'jsfd'});
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

		 $scope.wishes={
			
			"101":{
				'title':'Fulfill 111 for Run Partner',	
				'charity':'Salvation Army',
				'amount':10,
				'date':'4/10/15',
				'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
				'status':'published',
				'donor':'David',
				'fulfiller':'',
				'distance':1.5
			},
			"102":{
				'title':'Looking for Run Partner 2',	
				'charity':'Salvation Army 2',
				'amount':10,
				'date':'4/10/15',
				'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
				'status':'published',
				'donor':'David',
				'fulfiller':'',
				'distance':2.2
			},
			"103":{
				'title':'Looking for Run Partner 3',	
				'charity':'Salvation Army 3',
				'amount':10,
				'date':'4/10/15',
				'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
				'status':'published',
				'donor':'David',
				'fulfiller':'',
				'distance': 4
			}
		})

	$scope.goToDetails = function(){
		//alert('in details');
		$state.go('tab.wishdescription');
		//  {'id': '101'}
	}
	
})	

.controller('WishDescriptionCtrl', function($scope,$state) {
	$scope.aWish={
		'title':'Looking for Run Partner',	
		'charity':'Salvation Army',
		'amount':10,
		'date':'4/10/15',
		'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
		'status':'published',
		'donor':'David',
		'fulfiller':''
	}
	$scope.accept = function(){
		//alert('in details');
		$state.go('tab.fullfillacceptconfirm');
		//  {'id': '101'}
	}
	
})	

//Fullfillments data needs to be updated to Fullfillments.
.controller('MyFullfillmentsCtrl', function($scope, $state) {
	$scope.wishes={
			
			"101":{
				'title':'Looking for Run Partner',	
				'charity':'Salvation Army',
				'amount':10,
				'date':'4/10/15',
				'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
				'status':'published',
				'donor':'David',
				'fulfiller':''
			},
			"102":{
				'title':'Looking for Run Partner 2',	
				'charity':'Salvation Army 2',
				'amount':10,
				'date':'4/10/15',
				'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
				'status':'published',
				'donor':'David',
				'fulfiller':''
			},
			"103":{
				'title':'Looking for Run Partner 3',	
				'charity':'Salvation Army 3',
				'amount':10,
				'date':'4/10/15',
				'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
				'status':'published',
				'donor':'David',
				'fulfiller':''
			}
		}
	$scope.goToDetails = function(){
		//alert('in details');
		$state.go('tab.myfullfillmentdescription');
		//  {'id': '101'}
	}
})

.controller('MyFullfillmentDescriptionCtrl', function($scope) {
	
	$scope.aWish={
			'title':'Looking for Run Partner',	
			'charity':'Salvation Army',
			'amount':10,
			'date':'4/10/15',
			'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
			'status':'published',
			'donor':'David',
			'fulfiller':''
		}
	
})

.controller('DashCtrl', function($scope) {})

.controller('AccountCtrl', function($scope,$state, $localStorage) {


	// console.log('in account ctrl');
	// console.log('acct user is: ', $localStorage.user);
	// if(!$localStorage.user){ //if user is not authenticated
	// 		//direct to braintree page
	// 		console.log('!user');
	// 		$localStorage.prevPage = 'tab.account';
	// 		console.log('redirect');
	// 		$state.go('tab.relogin');
	// 		return;
	// 	}


	$scope.settings = {
			enableFriends: true
    }
  
	$scope.changePassword = function(){
		//alert('in details');
		$state.go('tab.changepassword');
		//  {'id': '101'}
	}

	$scope.logOff = function(){
		$localStorage.user = '';
		$state.go('tab.relogin');
	}

})

.controller('TabLoginCtrl', function($scope) {})

.controller('ReloginCtrl', function($scope,$state, $localStorage) {
	if(!$localStorage.user){ //if user is not authenticated
		//direct to braintree page
		console.log('!user');
		$localStorage.prevPage = 'tab.account';
		console.log('redirect');
		$state.go('tab.relogin');
		return;
	}
})

.controller('ChangePasswordCtrl', function($scope){

});


