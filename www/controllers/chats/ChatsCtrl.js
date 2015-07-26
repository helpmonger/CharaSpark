(function() {
    'use strict';

    myApp.controller('ChatsCtrl', function($scope,
        $state,
        $stateParams,
        ChatsService,
        socket
    ) {

        console.log('in chats ctrl');

        $scope.chats = ChatsService.all();
        $scope.remove = function(chat) {
            ChatsService.remove(chat);
        };

        $scope.chat = ChatsService.get($stateParams.chatId);

    }); // end of ChatsCtrl

})();
