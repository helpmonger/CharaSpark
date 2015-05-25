//Fullfillments data needs to be updated to Fullfillments.
myApp.controller('MyFullfillmentsCtrl', function($scope, $state, $localStorage) {
	$scope.wishes=
		{
			
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