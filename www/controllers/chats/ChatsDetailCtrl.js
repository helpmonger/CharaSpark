(function() {
    'use strict';

    myApp.controller('ChatsDetailCtrl', function($scope,
        $state,
        $stateParams,
        ChatsService,
        socket,
        userInfo
    ) {

        var to = '';

        console.log('in chats ctrl', userInfo);

        $scope.chats = ChatsService.all();
        $scope.remove = function(chat) {
            ChatsService.remove(chat);
        };

        $scope.chat = ChatsService.get($stateParams.chatId);

        var currUser = userInfo.user;
        //socket io stuff

        //broadcast to server
        console.log('the user is: ', currUser.user_name);
        socket.emit('user:joined', {
            name: currUser.user_name
        });


        //handle responses from server



        //send message to server

        $scope.sendMessage = function sendMessage(draft) {
            if (!draft.message || draft.message == null || typeof draft == 'undefined' || draft.length == 0) {
                return;
            }
            console.log('draft is: ', draft);
            socket.emit('send', {
                msDate: new Date().getTime(),
                message: draft.message,
                name: currUser.user_name,
                to: to === '' ? to : 'testuser'
                // channel: $scope.activeChannel
            });
            // console.log('after emit');
            $scope.input.message = '';
        };


        socket.emit("joinserver", {
            name: currUser.user_name
        });

        socket.on('update', function(msg) {
            // console.log('user:joined');
            $scope.messages.push(msg);
        });

        
         socket.on('chatMsg', function(msg) {
            // console.log('user:joined');
            $scope.messages.push(msg);
        });
  


    }); // end of ChatsCtrl

})();
