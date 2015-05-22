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



.factory('WishService', function(Restangular, lodash){

  var baseUrl = 'http://localhost:8080/api';
  Restangular.setBaseUrl(baseUrl);

  return {

          add: function (form) {
              return Restangular.all('Wish').post(form);
          },
          all: function (form) {
              return Restangular.all('Wish').getList();
          },
          update: function (form) {
              return Restangular.one('Wish', form._id).customPut(form); 
          },
          get: function() {
            return Restangular.one('Wish', wishID).get();
          }
        } //end of return
})


.factory('CharityService', function(Restangular, lodash){

  var baseUrl = 'http://localhost:8080/api';
  Restangular.setBaseUrl(baseUrl);

  return {
          add: function (form) {           
              return Restangular.all('charity').post(form);            
          },
          all: function () {
              return Restangular.all('charity').getList();
          },
          update: function (form) {           
              return Restangular.one('charity', form._id).customPut(form); 
          },
          get: function (charityID) {
              return Restangular.one('charity', charityID).get();
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
});

