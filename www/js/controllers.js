myApp.controller('MyWishesCtrl', function($scope, $state, WishService, $localStorage) {

//to-do: add redirect if user doesn't have permission;
	console.log('in wish ctrl');
	// var promise = WishService.getWishesToFulfill({_id: 'jsfd'});
 //  	promise.then(function(wishes, err) {
 //    // returns a list of users
 //    if(!err){
 //      // console.log('list is: ', wishes);
 //      $scope.wishes = wishes;
 //      console.log('wishes ', $scope.wishes);
 //    }
 //    else {
 //      console.log('error is: ', err);
 //    }

 //  }); // end of promise 



	$scope.wishes = 
	[{ 		'id':'104',
			'title':'Autistic child needs help',
			'charity':'Disabled Living Foundation',
			'amount':4.5,
			'date':'4/19/15',
			'description': 'I have an autistic child and I want him to get online behavior training. If someone would like to accompany him with this training for 1 hour, I would be very much grateful.',
			'status':'new',
			'donor':'Lydia',
			'fulfiller':''
		},
	    {   'id':'105',
			'title':'Urgent! Need a Ride',	
			'charity':'Salvation Army',
			'amount':5,
			'date':'4/10/15',
			'description':'I\'m supposed to pick up my kids after school, but my car is suddenly broken. Is there anyone who can help?',
			'status':'new',
			'donor':'Lydia',
			'fulfiller':''
		}];

		
		
	
	
})

.controller('MyWishDescriptionCtrl', function($scope) {
	
	$scope.aWish= [
			{
			'id': '101',
			'title':'Urgent! Need a Ride',	
			'charity':'Salvation Army',
			'amount':5,
			'date':'4/10/15',
			'description':'I\'m supposed to pick up my kids after school, but my car is suddenly broken. Is there anyone who can help?',
			'status':'new',
			'donor':'Lydia',
			'fulfiller':''
		},
		
	];
	
	$scope.goToDetails = function(wish){
		//alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.mywishdescription');
		//  {'id': '101'}
	}
	
})

.controller('MyWishDescriptionCtrl', function($scope, $localStorage) {
	
	$scope.aWish = $localStorage.wish;
	// $scope.aWish={
	// 		'title':'Looking for Run Partner',	
	// 		'charity':'Salvation Army',
	// 		'amount':10,
	// 		'date':'4/10/15',
	// 		'description':'Looking for a run parter, I need a run partner on Monday, 5pm at Columbia, SC.',
	// 		'status':'published',
	// 		'donor':'David',
	// 		'fulfiller':''
	// 	}
	
})


//tab-landing



.controller('HomeCtrl', function($scope, CharityService, $state, lodash, $localStorage, $ionicLoading, WishService) {
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

.controller('TreeCtrl', function($scope, $localStorage, $state, $braintree, TreeService){
          $scope.creditCard = {}; 
			$scope.paymentComplete = false;
            // console.log('donation amt is: ' + $localStorage.donationAmt);
            $scope.donationAmt = $localStorage.donationAmt;
	          $scope.creditCard.number  = "4111111111111111";
		 	 $scope.creditCard.expirationDate= "10/18";

	  
            var client;
            	
            var startup = function() {
              $braintree.getClientToken().success(function(token) {
                client = new $braintree.api.Client({
                  clientToken: token
                });
              });
            }

	    	$scope.GoToWish = function(){
				$state.go('tab.mywishes');
			}


            $scope.payButtonClicked = function(){
              // client.tokenizeCard({
              //   number: $scope.creditCard.number,
              //   expirationDate: $scope.creditCard.expirationDate
              // }, function (err, nonce) {
                
              //   var form = {amount: $localStorage.donationAmt,
              //               nounce: nonce};
              //   // console.log('nonce is ', nonce);
              //   // console.log('form is ', form);
              //   // - Send nonce to your server (e.g. to make a transaction) 
                
              //   var promise = TreeService.makePayment(form);

              //    promise.then(function(paymentComplete, err) {
              //                     // returns a list of users
              //     if(!err && paymentComplete.success){
              //       console.log('paymentComplete is: ', paymentComplete);
                    $scope.paymentComplete = true;
                    //paymentComplete;
                    
                    // alert('charity email is: ' + clientToken.emailAddress);
                    //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
                //   }
                //   else {
                //     console.log('error making payment: ', err);
                //   }
                // }) //end of then

              // });
            }; //end of pay button click
  
             startup();
             
	//close sth
	})// end of TreeCtrl


// .controller('AcceptConfirmCtrl', function($scope) {
// 	alert('in ctrler');
// 	$scope.GoToWish = function(){
// 		$state.go('tab.mywishes');
// 	}

// })


//tab-fullfillawish


.controller('WishDescriptionCtrl', function($scope,$state, $localStorage) {
	$scope.aWish= $localStorage.wish;

	//{

	// 			'title':'Wedding Accompany',	
	// 			'charity':'Salvation Army',
	// 			'amount':5,
	// 			'date':'4/10/15',
	// 			'description':'I\'m going to a friend\'s wedding next Saturday, but I hate to be there alone. Looking for a female to come with me',
	// 			'status':'new',
	// 			'donor':'David',
	// 			'fulfiller':'',
	// 			'distance':1.5


	// }
	$scope.accept = function(){
		//alert('in details');
		$state.go('tab.fullfillacceptconfirm');
		//  {'id': '101'}
	}
	
})	

//Fullfillments data needs to be updated to Fullfillments.
.controller('MyFullfillmentsCtrl', function($scope, $state, $localStorage) {
	$scope.wishes={
			
		       "101":{
				'title':'Meal Partner',	
				'charity':'Salvation Army',
				'amount':10,
				'date':'4/10/15',
				'description':'I\'m new to the city. Is there anyone who want to come and hangout with me? I\'ll pay.',
				'status':'Cancelled',
				'donor':'Daniel',
				'fulfiller':'Lydia'
			},
	        	"102":{
				'title':'Laptop Needs To Be Fixed',	
				'charity':'Salvation Army',
				'amount':10,
				'date':'4/10/15',
				'description':'My laptop is broken. I feel bad. Can somebody help?',
				'status':'Fulfilled',
				'donor':'Daniel',
				'fulfiller':'Lydia'
			}

		}
	$scope.goToDetails = function(wish){
		//alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.myfullfillmentdescription');
	}
})

.controller('MyFullfillmentDescriptionCtrl', function($scope, $localStorage) {
	
	$scope.aWish= $localStorage.wish;

	// {
	// 			'title':'Meal Partner',	
	// 			'charity':'Salvation Army',
	// 			'amount':10,
	// 			'date':'4/10/15',
	// 			'description':'I\'m new to the city. Is there anyone who want to come and hangout with me? I\'ll pay.',
	// 			'status':'Cancelled',
	// 			'donor':'Daniel',
	// 			'fulfiller':'Lydia'
	// 	}
	
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


