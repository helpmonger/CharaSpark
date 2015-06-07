(function() {
    'use strict';

        myApp.controller('TabCtrl', function($scope, $state, WishService) {

        $scope.navTitle = '<img class="title-image" src="../img/charaspark_logo_400.png" />';

            console.log('in tabCtrl')
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

    .controller('DashCtrl', function($scope) {})

    .controller('ChangePasswordCtrl', function($scope) {

    });

})();
