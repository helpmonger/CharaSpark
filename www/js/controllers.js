myApp.controller('TabCtrl', function($scope, $state, WishService) {

    $scope.navTitle='<img class="title-image" src="../img/charaspark_logo_400.png" />';

    console.log('in tabCtrl');
	// $scope.$on('$locationChangeStart', function( event ) {
	//     var answer = confirm("Are you sure you want to leave this page?")
	//     if (!answer) {
	//         event.preventDefault();
	//     }
	// });

	// window.onbeforeunload = function (event) {
	// 	alert('before onbeforeunload');
	//   var message = 'You have closed the browser. Do you want to logout?';
 //        setTimeout('myclose=false',10);
 //        myclose=true;

	//   if (typeof event == 'undefined') {
	//     event = window.event;
	//   }
	//   if (event) {
	//     event.returnValue = message;
	//   }
	//   return message;
	//   $localStorage.user = '';
	//   // alert('quitting..');
	// }

	// window.onunload = function(event){
	// 	//alert('before onunload');
	// 	$localStorage.user = '';
	// }

})


myApp.controller('MyWishesCtrl', function($scope, $state, WishService) {

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

.controller('MyWishDescriptionCtrl', function($scope, CharityService, $localStorage) {
	
	$scope.aWish = $localStorage.wish;
	console.log('scope detail:', $scope);
	
	// trying to convert the charityId to charityName
	charityId = $scope.aWish._charity;
	var charityName = '';
	var promise = CharityService.get(charityId);
	promise.then(function(result){
//		console.log('result is', result.name);
		$scope.aWish.charityName = result.name;
	});// end of then
	
	// trying to convert the wishMakerId to donor's name
	
	
})


//tab-landing

.controller('TreeCtrl', function($scope, $state, $braintree, TreeService, $localStorage, DonationService, $stateParams){
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
                    console.log('state params = ', $stateParams);
					var localDonationID = $stateParams.donationID;
					console.log('localDonationID = ', localDonationID);
					//get donationID from wishId
                    var promise = DonationService.update({
                    	'_id':localDonationID,
                    	'paidDate':new Date()
                    	});
                    promise.then(function(results,err){
						if(!err){
					      console.log('success');
					    }
					    else {
					      console.log('error is: ', err);
					    }
					});
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


.controller('DashCtrl', function($scope) {})


.controller('ChangePasswordCtrl', function($scope){

});


