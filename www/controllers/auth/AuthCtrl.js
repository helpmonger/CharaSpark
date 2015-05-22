myApp.controller('LoginCtrl', function($scope, AuthService, $state, $localStorage) {

	console.log('in login');
	//if logged in, go to landing
		if ($localStorage.user) {
	        $state.go('tab.home');
	    }

		$scope.Login = function(userObj){
			// console.log('scope user is: ', userObj);
			var promise = AuthService.login(userObj);
			promise.then(function(user, err) {
				// console.log('user is: ', user);
	                                  // returns a list of users
		      if(!err && user.token){
		        console.log('user is: ', user);
		        $localStorage.user = user;
	        	$state.go('tab.home');
		      }
		      else {
		        console.log('error is: ', err);
		        $scope.error = err;
		      }
		      return;
		    }, function(response){
		    	// if(parseInt(response) > 201){
		    		console.log('error login!');
		    		$scope.error = "invalid credentials";
		    	// }
		    }); //end of then

		}


 $scope.register = function(){
    	$state.go('signup');
    }

})

.controller('SignupCtrl', function($scope, AuthService, $localStorage, $state) {
	// alert('we re in sign up');
    console.log($localStorage.user);
    if ($localStorage.user) {
        $state.go('tab.home');
    }

	$scope.SignUp = function(userObj){
		alert('clicked');
		console.log('scope user is: ', userObj);
		var promise = AuthService.register(userObj);
		promise.then(function(user, err) {
                                  // returns a list of users
	      if(!err){
	        console.log('user is: ', user);
	        $localStorage.user = user;
	        if($localStorage.prevPage){
	        	$state.go($localStorage.prevPage);
	        	$localStorage.prevPage = '';
	        } else {
	        	$state.go('tab.home');
	        }

	        // alert('charity email is: ' + user.emailAddress);
	        //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
	      }
	      else {
	        console.log('error is: ', err);
	        $scope.error = "unable to sign up at this time";
	      }
	    }); //end of then
	}// end of sign up

})