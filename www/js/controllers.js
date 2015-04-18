angular.module('starter.controllers', [])


.controller('LandingCtrl', function($scope, CharityService, lodash, $state, $localStorage) {
  
  //populates the list of charities
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
  // }); end of promise 

	$scope.MakeAWish = function(){
		//var donationAmt
		//var charityName

		// if($localStorage.user && $localStorage.user.auth_token){ //if user is authenticated
		// 	//direct to braintree page
		// }

		$state.go('tab.tree');
	}
  }); //end of promise
})

.controller('TreeCtrl', function($scope, $localStorage, $braintree, Restangular){
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
                
                  var promise2 = Restangular.oneUrl('test', 'http://localhost:8080/api').customPOST($.param(form), "processPayment", form, 
                                {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"});

                 promise2.then(function(clientToken, err) {
                                  // returns a list of users
                  if(!err){
                    console.log('clientToken is: ', clientToken);
                    $scope.clientToken = clientToken;
                    alert('charity email is: ' + clientToken.emailAddress);
                    //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
                  }
                  else {
                    console.log('error is: ', err);
                  }
                }) //end of then

              });
            }; //end of pay button click
  
             startup();

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
