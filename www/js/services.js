angular.module('starter.services', [])


.factory('CharityService', function(Restangular, lodash){

  

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

  // Some fake testing data
  

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
});
