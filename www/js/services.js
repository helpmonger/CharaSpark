angular.module('starter.services', [])


.factory('AuthService', function(Restangular, lodash){

  // var baseUrl = 'http://charasparkservices.herokuapp.com/api';
  var baseUrl = 'http://localhost:8080/api';
  Restangular.setBaseUrl(baseUrl);
  // var baseOptin = Restangular.all('api/');

  return {
       
          // POST: /api/login
          // logs the user in
          login: function (form) {
              return Restangular.all('login').post(form);
          },
          // POST: /api/register
          // registers the user
          register: function (form) {
              return Restangular.all('register').post(form);
          },
        } //end of return
})





.factory('UserService', function(TokenRestangular){

  return {
          // GET: /user
          // returns all users
          all: function (form) {
            return TokenRestangular.all('user').getList();
          },

          // Put: /user/:userID
          // updates a single user
          update: function (form) {
              return TokenRestangular.all('user', form._id).customPut(form); 
          },

          // GET: /user/:userID
          // returns a specific user
          get: function(userID) {
            return TokenRestangular.one('user', userID).get();
          },
        } //end of return
})

.factory('WishService', function(TokenRestangular, lodash){

  return {

          add: function (form) {
            console.log('in add');
              return TokenRestangular.all('Wish').post(form);
          },
          all: function (form) {
        	  return TokenRestangular.all('Wish').getList();
          },
          update: function (form) {
              return TokenRestangular.one('Wish', form._id).customPut(form); 
          },
          get: function() {
            return TokenRestangular.one('Wish', wishID).get();
          },
          findWishesFromUser: function(userID){
            return TokenRestangular.all('Wish').one('User', userID).getList();
          },
          findWishesFromFulfiller: function(fulfillerID){
            return TokenRestangular.all('Wish').one('fulfiller',fulfillerID).get();
          }

        } //end of return
})


.factory('DonationService', function(TokenRestangular, lodash){

  // var baseUrl = 'http://localhost:8080/api';
  // Restangular.setBaseUrl(baseUrl);

  return {
          add: function (form) {           
              return TokenRestangular.all('donation').post(form);            
          },
          all: function () {
              return TokenRestangular.all('donation').getList();
          },
          update: function (form) {          
              var userId = form._id; 
              return TokenRestangular.one('donation', userId).customPut(form); 
          },
          get: function (donationID) {
              return TokenRestangular.one('donation', donationID).get();
          },
          findDonationsFromUser: function(userID){
            return TokenRestangular.all('donation').one('user',userID).get();
          },
          findDonationsFromCharity: function(charityID){
            //console.log(form._id);
            return TokenRestangular.all('donation').one('charity',charityID).get();
          }
        } //end of return
})



.factory('CharityService', function(TokenRestangular, lodash){

  // var baseUrl = 'http://localhost:8080/api';
  // Restangular.setBaseUrl(baseUrl);

  return {
          add: function (form) {           
              return TokenRestangular.all('charity').post(form);            
          },
          all: function () {
              return TokenRestangular.all('charity').getList();
          },
          update: function (form) {           
              return TokenRestangular.one('charity', form._id).customPut(form); 
          },
          get: function (charityID) {
              return TokenRestangular.one('charity', charityID).get();
          },
        } //end of return
})


.factory('TreeService', function(Restangular, lodash){

  return {

          makePayment: function (form) {
            var baseUrl = 'http://charasparkservices.herokuapp.com/api';
            Restangular.setBaseUrl(baseUrl);
              return Restangular.all('processPayment').customPOST($.param(form), "", form, 
                        {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"});
            
          },
         
        } //end of return
})

.factory('ResponseService', function($state){

  return {

          handleResponse: function(response){
                  if(response.status == 401){
                    console.log('going to login...');
                    $state.go('login');
                  } else {
                    console.log("Error with status code", response.status);
                  }
                  return null;
                
          },
         
        } //end of return
})

//this aims to make consuming promises easier by taking care of all the error handling
//to begin, just pass the promise, and a callback function. 
// 
.factory('PromiseService', function($state, StorageService){
  console.log('in promise service');
  return {

          getData: function(promise, callback){
            promise.then(function(data, err) {
            // returns a list of users
            if(!err){
                callback(data);
            }
            else {
              console.log('error is: ', err);
              callback(null);
            }
                
          }, function(response){
              if(response.status == 401){ //401 = expired Authorization
                //need to reset local storage to prevent auto-redirect
                StorageService.resetCurrentUser(); 
                return $state.go('login');
              } else {
                callback(null);
                console.log('response error ', response);
              }
          }); //end of promise.then
        }, //end of getData
         
      } //end of return
})


.factory('StorageService', function($localStorage) {

  return {
    getCurrentUser: function() {
      var user = $localStorage.user;
      if(user && user.exp >= new Date()){
        return user;
      }
    },
    setCurrentUser: function(user) {
      $localStorage.user = user;
      //makes the token expire in 15 minutes
      $localStorage.user.exp = new Date().getTime() + 15*60000;
    },
    resetCurrentUser: function() {
      $localStorage.user = '';
    },
 } //end of return 

})

.factory("TokenRestangular", ["Restangular", "$localStorage", function (Restangular, $localStorage) {
        return Restangular.withConfig(function (RestangularConfigurer) {
        // Set access token in header.
        var accessToken = '';
        var user = $localStorage.user;
        if(user != null && user.token != null){
          accessToken = user.token;
        }
        console.log('accessToken is: ', accessToken);
        RestangularConfigurer.setDefaultHeaders({Authorization: 'Bearer '+ accessToken});
        RestangularConfigurer.setBaseUrl('http://localhost:8080/api');
    });
}]);





