(function() {
    'use strict';

    myApp.controller('LandingCtrl', function($scope, $state) {
        $scope.emailLogin = function() {
            $state.go('login');
        };

     //    $scope.aImages = [{
     //  	'src' : '../../img/charasparklogin.png', 
     //  	'msg' : 'Log in page logo'
    	// }];
    });

})();
