(function() {
    'use strict';

    myApp.controller('ChatsCtrl', function($scope,
        $state,
        $stateParams,
        ChatsService,
        socket,
        StorageService
    ) {

        var currUser = StorageService.getCurrentUser();
        console.log('in chats ctrl');

        $scope.chats = ChatsService.all();
        $scope.remove = function(chat) {
            ChatsService.remove(chat);
        };

        $scope.chat = ChatsService.get($stateParams.chatId);


        //socket io stuff

        //broadcast to server
        socket.emit('user:joined', {
            name: currUser.user_name
        });

        //handle responses from server

        socket.on('message:received', function messageReceived(message) {
            console.log('message is: ' + message);
            $scope.messages.push(message);
        });

        socket.on('user:joined', function(user) {
            console.log('user:joined');
            $scope.messages.push(user);
        });


        //send message to server

        $scope.sendMessage = function sendMessage(draft) {
            if (!draft.message || draft.message == null || typeof draft == 'undefined' || draft.length == 0) {
                return;
            }
            console.log('before emit');
            socket.emit('message:send', {
                message: draft.message,
                name: currUser.user_name,
                // channel: $scope.activeChannel
            });
            console.log('after emit');
            $scope.input.message = '';
        };


    }); // end of ChatsCtrl

})();
