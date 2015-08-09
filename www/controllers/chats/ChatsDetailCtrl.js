(function() {
    'use strict';

    myApp.controller('ChatsDetailCtrl', function($scope,
        $state,
        $stateParams,
        ChatsService,
        socket,
        userInfo,
        UserService
    ) {

        $scope.messages = '';

        var to = '';

        console.log('in chats ctrl', userInfo);

        $scope.chats = ChatsService.all();
        $scope.remove = function(chat) {
            ChatsService.remove(chat);
        };
        
        // get hard coded chat dialog for UI adjustment.
        $scope.ChatsHistory = ChatsService.allDetails();
        console.log('scope is', $scope);
        
        $scope.viewProfile = function(userId){
        	// for testing only
        	
        	var userId = '55bf68f7d6aa8c0e229c69bb';
        	console.log("viewProfile activated");
        	
        	$state.go('tab.showProfile',{'userId': userId});
        	
        	
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
                to: to === '' ? 'testuser' : to
                // channel: $scope.activeChannel
            });
            // console.log('after emit');
            $scope.input.message = '';
        };


        socket.emit("joinserver", {
            name: currUser.user_name
        });

        socket.on('update', function(msg) {
            console.log('update msg', msg);
            $scope.ChatsHistory.push({
                            user_name: 'server',
                            message: msg,
                            timestamp: new Date().getTime()
                        });
        });

            socket.on('send', function(msg) {
            console.log('send msg', msg);
            $scope.ChatsHistory.push(msg);
        });

        
         socket.on('chatMsg', function(msgObj) {
            console.log('chat msg', msgObj);
            $scope.ChatsHistory.push(msgObj);
        });
  


    }); // end of ChatsCtrl

})();
