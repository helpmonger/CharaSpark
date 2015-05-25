angular.module('starter.services', [])


.factory('AuthService', function(Restangular, lodash){

  // var baseUrl = 'http://charasparkservices.herokuapp.com/api';
  var baseUrl = 'http://localhost:8080/api';
  Restangular.setBaseUrl(baseUrl);
  // var baseOptin = Restangular.all('api/');

  // POST /accounts/123/messages?param=myParam with the body of name: "My Message"
  // account.customPOST({name: "My Message"}, "messages", {param: "myParam"}, {})

  return {
       
          login: function (form) {
            // - /api/login
              return Restangular.all('login').post(form);
          },
          register: function (form) {
              // - /api/register
              return Restangular.all('register').post(form);
            
          },
        } //end of return
})




.factory('WishService', function(TokenRestangular, lodash, $localStorage){


  // var baseUrl = 'http://localhost:8080/api';
  // TokenRestangular.setBaseUrl(baseUrl);
  // //TokenRestangular.set

  return {

          add: function (form) {
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
          findWishesFromUser: function(form){
            var userId = $localStorage.user.user._id;
            return TokenRestangular.all('Wish').one('User', userId).getList();
          },
          findWishesFromFulfiller: function(){
            console.log($localStorage.user.user._id);
            return TokenRestangular.all('Wish').one('fulfiller',$localStorage.user.user._id).get();
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
              return TokenRestangular.one('donation', form._id).customPut(form); 
          },
          get: function (donationID) {
              return TokenRestangular.one('donation', donationID).get();
          },
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

