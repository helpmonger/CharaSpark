(function() {
    'use strict';

    myApp.controller('LoginCtrl', function($scope,
        AuthService,
        $state,
        StorageService) {

        console.log('in login');
        //if logged in, go to landing
        if (StorageService.getCurrentUser()) {
            console.log('redirecting to home...');
            $state.go('tab.home', {}, {
                reload: true
            });
        }

        $scope.user = {};

        $scope.Login = function() {
            var promise = AuthService.login($scope.user);
            promise.then(function(user, err) {
                // console.log('user is: ', user);
                // returns a list of users
                if (!err && user.token) {
                    // console.log('user is: ', user);
                    StorageService.setCurrentUser(user);
                    // $state.go('tab.home');
                    console.log('reloading home state');
                    $state.go('tab.home', {}, {
                        reload: true
                    });
                } else {
                    console.log('error is: ', err);
                    $scope.error = err;
                }
                return;
            }, function(response) {
                // if(parseInt(response) > 201){
                console.log('error login!');
                $scope.error = 'invalid credentials';
                // }
            }); //end of then

        };

        $scope.register = function() {
            $state.go('register');
        }

    })

    .controller('RegisterCtrl', function($scope,
        AuthService,
        $state,
        StorageService) {
        // alert('we re in sign up');
        //true prevents the user from being redirected to the login page
        if (StorageService.getCurrentUser(true)) {
            console.log('redirecting to home...');
            $state.go('tab.home');
        }

        $scope.user = {};

        $scope.Register = function() {

            console.log('scope user is: ', $scope.user);
            var promise = AuthService.register($scope.user);
            promise.then(function(user, err) {
                // returns a list of users
                if (!err) {
                    console.log('user is: ', user);
                    StorageService.setCurrentUser(user);
                    $state.go('tab.home', {}, {
                        reload: true
                    });
                } else {
                    console.log('error is: ', err);
                    $scope.error = 'unable to sign up at this time';
                }
            }); //end of then
        } // end of sign up

    })
})();
