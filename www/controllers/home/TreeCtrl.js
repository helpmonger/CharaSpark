(function(){
'use strict'
  
  myApp.controller('TreeCtrl', function($scope, $state, $braintree, TreeService, $localStorage, DonationService, $stateParams, PromiseService){
       

  // --------------hard coded credit card info ------------------
        $scope.creditCard = {}; 
  			$scope.paymentComplete = false;
        $scope.donationAmt = $localStorage.donationAmt;
        $scope.creditCard.number  = "4111111111111111";
  	 	  $scope.creditCard.expirationDate= "10/18";

  // -------------- get the donation from route ------------------

        var localDonationID = $stateParams.donationID;
                
        var promise = DonationService.get(localDonationID);
        PromiseService.getData(promise, function(data){
          if(data){
            $scope.donationAmt = data.amount;
          }
        });
                
        var client;
        	
        var startup = function() {
          $braintree.getClientToken().success(function(token) {
            client = new $braintree.api.Client({
              clientToken: token
            });
          });
        }

  	    $scope.GoToWish = function(){
  				$state.go('tab.home');
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

          PromiseService.getData(promise, function(data){
            if(data){
                console.log('successfuly updated donation');
              }            
          })
          
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
})();
