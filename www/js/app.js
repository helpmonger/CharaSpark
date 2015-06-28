// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var myApp = angular.module('starter', ['ionic',
        'starter.services',
        'starter.directives',
        'restangular',
        'ngLodash',
        'braintree-angular',
        'ngStorage',
        'ngMessages',
        'ui.router'
    ])
    .constant('clientTokenPath', 'http://localhost:8080/api/token')
    .run(function($ionicPlatform, $localStorage, $interval) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                window.StatusBar.styleLightContent();
            }
        });

        $interval(function() {
            delete localStorage["location"];
            // delete all the required localStorage variables by specifying their keys
        }, 1000 * 60 * 1); //delets all location localStorage vars afer 1 minute
    })

.config(function($stateProvider, $urlRouterProvider, RestangularProvider, $ionicConfigProvider) {

    RestangularProvider.setDefaultHeaders({
        'Content-Type': 'application/json'
    });
    RestangularProvider.setBaseUrl('http://localhost:8080/api');

    // $ionicConfigProvider.views.maxCache(0);

    //application/x-www-form-urlencoded; charset=UTF-8
    // RestangularProvider.setBaseUrl('https://api.justgiving.com/ab7113a9/v1/charity');
    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    //landing page with intro and login options
        .state('landing', {
        url: '/landing',
        templateUrl: 'templates/home/landing.html',
        controller: 'LandingCtrl'
    })

    // Allows the user to login
    .state('login', {
        url: '/login',
        templateUrl: 'templates/auth/login.html',
        controller: 'LoginCtrl',
        // cache: false

    })

    //Allows the user to register
    .state('register', {
        url: '/register',
        templateUrl: 'templates/auth/register.html',
        controller: 'RegisterCtrl'

    })

    //Allows the user to retrieve password via the registed email
    .state('retrievePassword', {
        url: '/retrievePassword',
        templateUrl: 'templates/auth/retrievePassword.html',
        controller: 'RetrievePasswordCtrl'

    })

    // parent state of all tabs
    // abstract means that this state itself cannot be navigated to
    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        controller: 'TabCtrl'
    })

    // the default page after logging in
    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/home.html',
                controller: 'HomeCtrl'
            }
        },
        // cache: false,
        resolve: {
            // userInfo: function(StorageService) {
            //   var user = StorageService.getCurrentUser();
            //   console.log('resolved ', user)
            //   return user;
            // },
            // wishInfo: function(StorageService, WishService) {
            //     var user = StorageService.getCurrentUser();
            //     // console.log('the user info is: ', user.user);
            //     return WishService.findWishesFromUser(user.user._id);
            // },
            // currLoc: function(LocationService) {
            //     return LocationService.getCurrentLocation();
            // }
        } //end of resolve
    })

    //page showing details of the user's own wishes
    .state('tab.wishDetails', {
        url: '/wishDetails/:wishID',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/wishDetails.html',
                controller: 'WishDetailsCtrl'
            }
        }
    })

    //page where user enters payment info
    .state('tab.tree', {
        url: '/tree/:donationID',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/tree.html',
                controller: 'TreeCtrl'
            }
        }
    })

    .state('tab.fulfillawish', {
        url: '/fulfillawish',
        views: {
            'tab-fulfillawish': {
                templateUrl: 'templates/fulfillawish/fulfillawish.html',
                controller: 'FulfillWishCtrl'
            }
        }
        // cache: false,
    })

    .state('tab.fulfillWishDetails', {
        url: '/fulfillWishDetails/:wishID',
        views: {
            'tab-fulfillawish': {
                templateUrl: 'templates/fulfillawish/fulfillWishDetails.html',
                controller: 'FulfillWishDetailsCtrl'
            }
        }
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

    .state('tab.acceptconfirm', {
        url: '/acceptconfirm',
        views: {
            'tab-landing': {
                templateUrl: 'templates/acceptconfirm.html',
                controller: 'AcceptConfirmCtrl'
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

    .state('tab.myfulfillments', {
        url: '/myfulfillments',
        views: {
            'tab-myfulfillments': {
                templateUrl: 'templates/fulfillments/myfulfillments.html',
                controller: 'MyFulfillmentsCtrl'
            }
        },
        // cache: false,
    })

    .state('tab.myfulfillmentdetail', {
        url: '/myfulfillmentdetail/:wishID',
        views: {
            'tab-myfulfillments': {
                templateUrl: 'templates/fulfillments/myfulfillmentdetail.html',
                controller: 'MyFulfillmentDetailCtrl'
            }
        }
    })

    .state('tab.fulfillacceptconfirm', {
        url: '/fulfillacceptconfirm',
        views: {
            'tab-fulfillawish': {
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
        },
        // cache: false,
        resolve: {
            userInfo: function(StorageService) {
                var user = StorageService.getCurrentUser();
                console.log('resolved ', user);
                return user;
            }
        } //end of resolve
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
