(function() {
    'use strict';

    myApp.controller('ChatsDetailCtrl', function($scope,
        $state,
        $stateParams,
        ChatsService,
        socket,
        userInfo
    ) {

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

        socket.on('message:received', function messageReceived(message) {
            console.log('server says: ', message.message);
            //$scope.messages.push(message);
        });

        socket.on('user:joined', function(user) {
            console.log(user.message);
            // $scope.messages.push(user);
        });


        //send message to server

        $scope.sendMessage = function sendMessage(draft) {
            if (!draft.message || draft.message == null || typeof draft == 'undefined' || draft.length == 0) {
                return;
            }
            console.log('draft is: ', draft);
            socket.emit('message:send', {
                message: draft.message,
                name: currUser.user_name,
                // channel: $scope.activeChannel
            });
            // console.log('after emit');
            $scope.input.message = '';
        };


    }); // end of ChatsCtrl

})();
