// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic',
                            'starter.services',
                            // 'starter.directives',
                            'restangular',
                            'ngLodash',
                            'braintree-angular',
                            'ngStorage',
                            'ngMessages',
                            'ui.router',
                            ])
.constant('clientTokenPath', 'http://charasparkservices.herokuapp.com/api/token')
.run(function($ionicPlatform, $localStorage) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

  RestangularProvider.setDefaultHeaders({'Content-Type': 'application/json'});
  //application/x-www-form-urlencoded; charset=UTF-8
  // RestangularProvider.setBaseUrl('https://api.justgiving.com/ab7113a9/v1/charity');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html",
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:

//intro page


.state('landing', {
    url: '/landing',
        templateUrl: 'templates/home/landing.html',
        controller: 'LandingCtrl'
  })

// make a wish
.state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/home/home.html',
        controller: 'HomeCtrl'
      }
    }
  })

// Login 
.state('login', {
    url: '/login',    
        templateUrl: 'templates/auth/login.html',
        controller: 'LoginCtrl'
      
  })  
  
  //make a payment with braintree
  .state('tab.tree', {
      url: "/tree",
      views: {
        'tab-landing': {
          templateUrl: "templates/home/tree.html",
          controller: 'TreeCtrl'
        }
      }
    })
  
.state('signup', {
    url: '/signup',
    templateUrl: 'templates/auth/signup.html',
    controller: 'SignupCtrl'
        
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/home/dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.fullfillawish', {
    url: '/fullfillawish',
    views: {
      'tab-fullfillawish': {
        templateUrl: 'templates/fulfillawish/fulfillawish.html',
        controller: 'FulfillWishCtrl'
      }
    }
  })   


  .state('tab.wishdescription', {
    url: '/wishdescription',
    views: {
      'tab-fullfillawish': {
        templateUrl: 'templates/fulfillawish/wishdescription.html',
        controller: 'WishDescriptionCtrl'
      }
    }
  })    

  
  .state('tab.acceptconfirm', {
    url: '/acceptconfirm',
    views: {
      'tab-landing': {
        templateUrl: 'templates/acceptconfirm.html',
        controller: 'AcceptConfirmCtrl'
      }
    }
  })  
  
   .state('tab.mywishdescription', {
     url: '/mywishdescription/',
     views: {
       'tab-home': {
         templateUrl: 'templates/wishes/mywishdescription.html',
         controller: 'MyWishDescriptionCtrl'
       }
     }
   }) 

  // .state('tab.mywishes', {
  //   url: '/mywishes',
  //   views: {
  //     'tab-mywishes': {
  //       templateUrl: 'templates/wishes/mywishes.html',
  //       controller: 'MyWishesCtrl'
  //     }
  //   }
  // })  

   
  
  .state('tab.myfullfillments', {
    url: '/myfullfillments',
    views: {
      'tab-myfullfillments': {
        templateUrl: 'templates/fulfillments/myfullfillments.html',
        controller: 'MyFullfillmentsCtrl'
      }
    }
  })  

  .state('tab.myfullfillmentdescription', {
    url: '/myfullfillmentdescription',
    views: {
      'tab-myfullfillments': {
        templateUrl: 'templates/fulfillments/myfulfillmentdescription.html',
        controller: 'MyFullfillmentDescriptionCtrl'
      }
    }
  })    
  
    .state('tab.fullfillacceptconfirm', {
    url: '/fullfillacceptconfirm',
    views: {
      'tab-fullfillawish': {
        templateUrl: 'templates/fulfillments/fulfillacceptconfirm.html',
        controller: ''
      }
    }
  }) 

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
  
  .state('tab.changepassword', {
	    url: '/changepassword',
	    views: {
	      'tab-account': {
	        templateUrl: 'templates/account/changepassword.html',
	        controller: 'ChangePasswordCtrl'
	      }
	    }
	  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/landing');

});
