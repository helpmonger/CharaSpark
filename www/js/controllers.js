angular.module('starter.controllers', [])


.controller('LoginCtrl', function($scope) {

})

.controller('SignupCtrl', function($scope) {

})

.controller('LandingCtrl', function($scope, CharityService, lodash) {
  
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

  });
  
  // }); end of promise 

	// $scope.MakeAWish = function(){

	// }
  }) //end of promise

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
