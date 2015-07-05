(function() {
    'use strict';

    angular.module('starter.services', [])

    .factory('AuthService', function(Restangular, lodash) {

        // var baseUrl = 'http://charasparkservices.herokuapp.com/api';
        var baseUrl = 'http://localhost:8080/api';
        Restangular.setBaseUrl(baseUrl);
        // var baseOptin = Restangular.all('api/');

        return {

            // POST: /api/login
            // logs the user in
            login: function(form) {
                return Restangular.all('login').post(form);
            },
            // POST: /api/register
            // registers the user
            register: function(form) {
                return Restangular.all('register').post(form);
            },
        }; //end of return
    })

    .factory('UserService', function(TokenRestangular) {

        return {
            // GET: /user
            // returns all users
            all: function(form) {
                return TokenRestangular.all('user').getList();
            },

            // Put: /user/:userID
            // updates a single user
            update: function(form) {
            	console.log('form is', form);
                return TokenRestangular.one('user', form._id).customPUT(form);
            },

            // GET: /user/:userID
            // returns a specific user
            get: function(userID) {
                return TokenRestangular.one('user', userID).get();
            },
        }; //end of return
    })

    .factory('WishService', function(TokenRestangular, Restangular, lodash, StorageService) {

        return {

            add: function(form) {
                console.log('the token_restangular is: ', TokenRestangular);

                return TokenRestangular.all('wish').post(form);
            },
            all: function(form) {
                //manually set the authorization because it will be overriden
                form.Authorization = StorageService.getAuthorization();
                return Restangular.all('wish').customGET("", {}, form);
            },
            update: function(form) {
                return TokenRestangular.one('wish', form._id).customPUT(form);
            },

            // GET: /wish/:wishID
            // returns a specific wish
            get: function(wishID) {
                //console.log("get wish is working");
                //console.log("wish id = ", wishID);
                return TokenRestangular.one('wish', wishID).get();
            },
            findWishesFromUser: function(userID) {
                return TokenRestangular.all('wish').one('User', userID).getList();
            },
            findWishesFromFulfiller: function(fulfillerID) {
                return TokenRestangular.all('wish').one('fulfiller', fulfillerID).get();
            }

        }; //end of return
    })

    .factory('DonationService', function(TokenRestangular, lodash) {

        // var baseUrl = 'http://localhost:8080/api';
        // Restangular.setBaseUrl(baseUrl);

        return {
            add: function(form) {
                return TokenRestangular.all('donation').post(form);
            },
            all: function() {
                return TokenRestangular.all('donation').getList();
            },
            update: function(form) {
                var donationID = form._id;
                return TokenRestangular.one('donation', donationID).customPUT(form);
            },
            get: function(donationID) {
                return TokenRestangular.one('donation', donationID).get();
            },
            findDonationsFromUser: function(userID) {
                return TokenRestangular.all('donation').one('user', userID).get();
            },
            findDonationsFromCharity: function(charityID) {
                //console.log(form._id);
                return TokenRestangular.all('donation').one('charity', charityID).get();
            }
        }; //end of return
    })

    .factory('CharityService', function(TokenRestangular, Restangular, lodash) {

        // var baseUrl = 'http://localhost:8080/api';
        // Restangular.setBaseUrl(baseUrl);

        return {
            add: function(form) {
                return TokenRestangular.all('charity').post(form);
            },
            all: function(form) {
                // return TokenRestangular.all('charity').getList();
                return Restangular.all('charity').customGET("", {}, form);
            },
            update: function(form) {
                return TokenRestangular.one('charity', form._id).customPUT(form);
            },
            get: function(charityID) {
                return TokenRestangular.one('charity', charityID).get();
            },
        }; //end of return
    })

    .factory('TreeService', function(Restangular, lodash) {

        return {
            makePayment: function(form) {
                return Restangular.all('processPayment').post(form);
            },
        }; //end of return
    })

    //this aims to make consuming promises easier by taking care of all the error handling
    //to begin, just pass the promise, and a callback function.
    .factory('PromiseService', function($state, StorageService) {
        console.log('in promise service');
        return {

            getData: function(promise, callback) {
                promise.then(function(data, err) {
                    // returns a list of users
                    if (!err) {
                        //returns the data if the data is successfully retrieved
                        callback(data);
                    } else {
                        console.log('error is: ', err);
                        callback(null);
                    }

                }, function(response) {
                    if (response.status === 401) { //401 = expired Authorization
                        //need to reset local storage to prevent auto-redirect
                        StorageService.resetCurrentUser();
                        return $state.go('login');
                    } else {
                        callback(null);
                        console.log('response error ', response);
                    }
                }); //end of promise.then
            }, //end of getData

        }; //end of return
    })

    .factory('StorageService', function($localStorage, $state) {
        // console.log('in storage service');
        return {
            getCurrentUser: function(goToRegister) {
                var user = $localStorage.user;
                if (user && user.exp >= new Date()) {
                    // console.log('getting current user... ', $localStorage.user);
                    return user;
                } else {
                    // console.log('needs to login');
                    $localStorage.user = '';
                    // $state.go('login');
                    if (goToRegister) {
                        $state.go('register', {}, {
                            reload: true
                        });
                    } else {
                        $state.go('login', {}, {
                            reload: true
                        });
                    }
                    // console.log('after logged in');
                    return null;
                }
            },
            getAuthorization: function() {
                var accessToken = '';
                var user = this.getCurrentUser();
                if (user) {
                    accessToken = user.token;
                } else {
                    return null;
                }
                // console.log('accessToken is: ', accessToken);
                return 'Bearer ' + accessToken;
            },
            setCurrentUser: function(user) {
                $localStorage.user = user;
                console.log('setting current user to : ', user);
                //makes the token expire in 30 minutes x 24 = 12 hours
                $localStorage.user.exp = new Date().getTime() + 30 * 60000 * 24;
            },
            resetCurrentUser: function() {
                console.log('resetting current user...');
                $localStorage.user = '';
                console.log('current user is ', $localStorage.user);
            },
        }; //end of return

    })

    // This service automatically adds the user's authorization to restangular's request header.
    // To begin, just inject TokenRestangular in wherever Restangular is used.
    // No other code change is needed
    .factory('TokenRestangular', ['Restangular', 'StorageService',
        function(Restangular, StorageService) {

            return Restangular.withConfig(function(RestangularConfigurer) {
                // Set access token in header.
                var auth = StorageService.getAuthorization();
                if (auth) {
                    RestangularConfigurer.setDefaultHeaders({
                        'Authorization': auth
                    });
                    RestangularConfigurer.setBaseUrl('http://localhost:8080/api');
                }
            });
        }
    ])

    .factory('LocationService', function($q, $localStorage) {
        return {
            getCurrentLocation: function() {
                var deferred = $q.defer();

                if($localStorage.location){
                    deferred.resolve($localStorage.location);
                } else {
                    var geoLoc = [];

                    var onSuccess = function(position) {
                        geoLoc.push(position.coords.latitude);
                        geoLoc.push(position.coords.longitude);
                        $localStorage.location = geoLoc;
                        deferred.resolve(geoLoc);
                    };

                    var onError = function(error) {
                        deferred.reject(error);
                    };

                    navigator.geolocation.getCurrentPosition(onSuccess, onError);

                }

                return deferred.promise;
            }
        }; //end of return

    })

    .factory('WishStatusService', function() {
        return {
            //determines if wish can be cancelled by wishFulfiller
            canFulfillerCancelWish: function(wish) {
                if (wish) {
                    return wish.wishStatus === 'pending' || wish.wishStatus === 'proceeding';
                }
                return false;
            },
            canFulfillerHaveContactInfo: function(wish) {
                if (wish) {
                    return wish.wishStatus === 'proceeding' || wish.wishStatus === 'completed' ;
                }
                return false;
            },
            
            //determine which buttons should be showed on wishDetails.html
            canWishmakerCancelWish: function(wish){
            	if (wish) {
                    return wish.wishStatus === 'new' || wish.wishStatus === 'pending' || wish.wishStatus ==='proceeding';
                }
                return false;
            },
            canWishmakerConfirmWish: function(wish){
            	if (wish) {
                    return wish.wishStatus === 'pending';
                }
                return false;
            },
            canWishmakerCompleteWish: function(wish){
            	if (wish) {
                    return wish.wishStatus === 'proceeding';
                }
                return false;
            }
        }; //end of return

    });

})();
