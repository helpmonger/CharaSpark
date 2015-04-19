angular.module('starter.services', [])


.factory('CharityService', function(Restangular, lodash){

Restangular.setBaseUrl('https://api.justgiving.com/ab7113a9/v1/charity');
  

  return {
    all: function() {
      return Restangular.all('search').customGET("");
    },
    get: function(charityID){
      var userInfo;
      var promise2 = Restangular.oneUrl('test', 'https://api.justgiving.com/ab7113a9/v1/charity/53').get();
       promise2.then(function(charInfo, err) {
        // returns a list of users
        if(!err){
          console.log('charInfo is: ', charInfo);
          userInfo = charInfo;
          alert('charity email is: ' + charInfo.emailAddress);
          //lodash.sortBy(charInfo.charitySearchResults, 'name');; // first Restangular obj in list: { id: 123 }
        }
        else {
          console.log('error is: ', err);
        }
      });
       return userInfo;
    } //end get
  };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  return {
    all: function() {
      return chats;
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
}) //end of chats service


.factory('AuthService', function(Restangular, lodash){

  var baseUrl = 'http://charasparkservices.herokuapp.com/api';
  Restangular.setBaseUrl(baseUrl);
  // var baseOptin = Restangular.all('api/');



  // POST /accounts/123/messages?param=myParam with the body of name: "My Message"
  // account.customPOST({name: "My Message"}, "messages", {param: "myParam"}, {})

  return {
          signin: function (form) {
              return Restangular.all('LogIn').customPOST($.param(form), "", form, 
                        {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"});
            
          },
          signup: function (form) {

              return Restangular.all('SignUp').customPOST($.param(form), "", form, 
                        {'Content-Type': "application/x-www-form-urlencoded; charset=UTF-8"});
             //end of signup
          },
        } //end of return
});


