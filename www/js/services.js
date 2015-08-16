(function() {
    'use strict';

    angular.module('starter.services', [])

    .factory('AuthService', function(TokenRestangular, Restangular) {

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

            forgotPassword: function(form) {
                return Restangular.all('auth').all('forgotPassword').post(form);
            },
            // POST: /api/auth/changepassword
            // change user password
            changePassword: function(form) {
                return TokenRestangular.all('auth').customPOST(form, 'changePassword');
            },
        }; //end of return
    })

    .factory('UserService', UserService)

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

    .factory('StorageService', StorageService)

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

                if ($localStorage.location) {
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
                    return wish.wishStatus === 'proceeding' || wish.wishStatus === 'completed';
                }
                return false;
            },

            //determine which buttons should be showed on wishDetails.html
            canWishmakerCancelWish: function(wish) {
                if (wish) {
                    return wish.wishStatus === 'new' || wish.wishStatus === 'pending' || wish.wishStatus === 'proceeding';
                }
                return false;
            },
            canWishmakerConfirmWish: function(wish) {
                if (wish) {
                    return wish.wishStatus === 'pending';
                }
                return false;
            },
            canWishmakerCompleteWish: function(wish) {
                if (wish) {
                    return wish.wishStatus === 'proceeding';
                }
                return false;
            }
        }; //end of return

    })

    .factory('ChatsService', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'davidhee',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'testuser',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars1.githubusercontent.com/u/1903316?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        var chatSpecific = {
            session: 0,
            messages: [{
                user_name: "mzdu",
                message: "hello",
                face: "https://avatars1.githubusercontent.com/u/1903316?v=3&s=460",
                timestamp: "1437959711613"
            }, {
                user_name: "David",
                message: "hey how are you?",
                face: "https://avatars0.githubusercontent.com/u/1282474?v=3&s=460",
                timestamp: "1437959728420"
            }, {
                user_name: "mzdu",
                message: "Fine, you?",
                face: "https://avatars1.githubusercontent.com/u/1903316?v=3&s=460",
                timestamp: "1437959751794"
            }, {
                user_name: "David",
                message: "A couple of weeks ago I came across this awesome angular-elastic directive377. I decided to integrate it into an app I am currently creating (coming out soon!). It works great with Ionic and adds that native feel to messaging similar to iMessage/Tinder. I've read that iMessage uses HTML/JS but I'm not sure on this though.",
                face: "https://avatars0.githubusercontent.com/u/1282474?v=3&s=460",
                timestamp: "1437959761898"
            }, {
                user_name: "mzdu",
                face: "https://avatars1.githubusercontent.com/u/1903316?v=3&s=460",
                message: "Nice!",
                timestamp: "1437959772737"
            }]
        };

        return {
            all: function() {
                return chats;
            },
            allDetails: function() {
                return chatSpecific.messages;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('socket', function socket($rootScope, StorageService) {
        var user = StorageService.getCurrentUser();

        var baseUrl = 'http://localhost:8080/';

        var socket = io.connect(baseUrl, {
            query: user._id
        });

        return {
            on: function(eventName, callback) {
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback) {
                socket.emit(eventName, data, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    });

    function UserService(TokenRestangular) {

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
            //POST: /user/isEmailUnique
            //returns true if email is not registered yet
            isEmailUnique: function(form) {
                return Restangular.all('user').all('isEmailUnique').post(form);
            },
            //POST: /user/isUserNameUnique
            //returns true if username is not registered yet 
            isUsernameUnique: function(form) {
                return Restangular.all('user').all('isUserNameUnique').post(form);
            }
        }; //end of return
    }

    function StorageService($localStorage, $state) {
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
            firstTimeUserCheck: function(){
                //first screen - check if a user need to see the tutorial
                console.log($localStorage['firstTime']);
                if ($localStorage['firstTime'] != "true") {
                    $localStorage['firstTime'] = "true";  
                    $state.go('intro');                 
                }
            }
        }; //end of return

    }

})();
