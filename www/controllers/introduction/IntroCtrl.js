/*
(function(){
myApp.controller('IntroCtrl', ['$scope', '$ionicModal', '$ionicSlideBoxDelegate', function ($scope, $ionicModal, $ionicSlideBoxDelegate, $state) {
		
  	$scope.aImages = [{
      	'src' : '../../img/introMakeAWish.jpg', 
      	'msg' : ''
    	}, {
        'src' : '../../img/introDonation.jpg', 
        'msg' : ''
      }
    ];
  
  
    $ionicModal.fromTemplateUrl('image-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $ionicSlideBoxDelegate.slide(0);
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hide', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
    
    $scope.$on('modal.shown', function() {
      console.log('Modal is shown!');
    });
    

    // Call this functions if you need to manually control the slides
    $scope.next = function() {
      $ionicSlideBoxDelegate.next();
    };
  
    $scope.previous = function() {
      $ionicSlideBoxDelegate.previous();
    };
    
  	$scope.goToSlide = function(index) {
      $scope.modal.show();
      $ionicSlideBoxDelegate.slide(index);
    }
    
  
    // Called each time the slide changes
    $scope.slideChanged = function(index) {
      $scope.slideIndex = index;
      if(index==1){$state.go('login');}
    };
  }
]);

})();
*/


(function(){

  myApp.controller('IntroCtrl', function ($scope, $ionicSlideBoxDelegate, $state) {
      
      $scope.aImages = [{
          'src' : '../../img/introMakeAWish.jpg', 
        }, {
          'src' : '../../img/introDonation.jpg', 
        }, {
          'src' : '../../img/introDonation.jpg', 
        }
      ];

      //click on the small round button on the buttom of the introduction, goes to the corresponding page
      $scope.navSlide = function(index) {
        $ionicSlideBoxDelegate.slide(index); //500ms transition
        //$scope.modal.show();
      }

      $scope.goLogin = function(){
        $state.go('login');
      }

    });

})();