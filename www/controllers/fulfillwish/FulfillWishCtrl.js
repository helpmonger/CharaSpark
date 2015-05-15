myApp.controller('FulfillWishCtrl', function($scope,$state, WishService, $localStorage) {
	
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

		//  $scope.wishes=[
		
		// 	{	'id': '103',
		// 		'title':'Wedding Accompany',	
		// 		'charity':'Salvation Army',
		// 		'amount':5,
		// 		'date':'4/10/15',
		// 		'description':'I\'m going to a friend\'s wedding next Saturday, but I hate to be there alone. Looking for a female to come with me',
		// 		'status':'new',
		// 		'donor':'David',
		// 		'fulfiller':'',
		// 		'distance':1.5
		// 	},
		// 	{	'id': '104',
		// 		'title':'Resume Help',	
		// 		'charity':'Learning for Life',
		// 		'amount':5,
		// 		'date':'4/10/15',
		// 		'description':'Can somebody help with reviewing my resume? Any suggestions welcome!',
		// 		'status':'new',
		// 		'donor':'David',
		// 		'fulfiller':'',
		// 		'distance':2.2
		// 	},

		// ];

	$scope.goToDetails = function(wish){
		alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.wishdescription');
		//  {'id': '101'}
	}
	
})	