(function(){
'use strict'

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




	//tab-landing





	.controller('DashCtrl', function($scope) {})


	.controller('ChangePasswordCtrl', function($scope){

	});

})();


