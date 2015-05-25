//Fullfillments data needs to be updated to Fullfillments.
myApp.controller('MyFullfillmentsCtrl', function($scope, $state, $localStorage) {

	$scope.wishes = //$localStorage.wishes;
		{
			
		       "101":{				
				'_wishMaker':'Daniel',
				'_fulfiller':'Lydia',
				'_charity':'Salvation Army',
				'title':'Meal Partner',	
				'description':'I\'m new to the city. Is there anyone who want to come and hangout with me? I\'ll pay.',
				'wishStatus':'Cancelled',
				'createdDate':'4/10/15',
				'location':[28.222222,39.999999],
				'startDate':'4/10/15',
				'expireDate':'5/10/15'
			},
	        	"102":{
				'_wishMaker':'Daniel',
				'_fulfiller':'Lydia',
				'_charity':'Salvation Army',
				'title':'Laptop Needs To Be Fixed',	
				'description':'My laptop is broken. I feel bad. Can somebody help?',
				'wishStatus':'Cancelled',
				'createdDate':'4/11/15',
				'location':[28.222222,39.999999],
				'startDate':'4/11/15',
				'expireDate':'5/11/15'
			}

		}
	
	$scope.goToDetails = function(wish){
		//alert('in details');
		$localStorage.wish = wish;
		$state.go('tab.myfullfillmentdescription');
	}
})