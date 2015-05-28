myApp.controller('WishDetailsCtrl', function($scope,$state, $localStorage, $stateParams) {
	
	
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