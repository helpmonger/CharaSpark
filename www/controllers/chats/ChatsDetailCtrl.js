(function() {
    'use strict';

    myApp.controller('ChatsDetailCtrl', function($scope,
        $state,
        $stateParams,
        $ionicScrollDelegate,
        ChatsService,
        socket,
        userInfo,
        UserService
    ) {



        $scope.messages = '';
        var viewScroll = $ionicScrollDelegate.$getByHandle('userMessageScroll');
        var to = '';

        console.log('in chats ctrl', userInfo);

        $scope.chats = ChatsService.all();
        $scope.remove = function(chat) {
            ChatsService.remove(chat);
        };

        // get hard coded chat dialog for UI adjustment.
        $scope.ChatsHistory = ChatsService.allDetails();
        console.log('scope is', $scope);

        $scope.viewProfile = function(userId) {
            // for testing only

            var userId = '55bf68f7d6aa8c0e229c69bb';
            console.log("viewProfile activated");

            $state.go('tab.showProfile', {
                'userId': userId
            });


        };

        $scope.chat = ChatsService.get($stateParams.chatId);

        var currUser = userInfo.user;
        //socket io stuff

        //broadcast to server
        console.log('the user is: ', currUser.user_name);
        socket.emit('user:joined', {
            name: currUser.user_name
        });


        socket.emit("joinserver", {
            name: currUser.user_name
        });




        //handle responses from server



        //send message to server

        $scope.sendMessage = function sendMessage(draft) {
            if (!draft.message || draft.message == null || typeof draft == 'undefined' || draft.length == 0) {
                return;
            }


            var chatMsg = {
                msDate: new Date().getTime(),
                message: draft.message,
                name: currUser.user_name,
                to: $scope.chat.name
                    //to === '' ? 'testuser' : to
                    // channel: $scope.activeChannel
            };

            console.log('chatMsg is: ', chatMsg);

            socket.emit('send', chatMsg);
            // console.log('after emit');
            $scope.input.message = '';

            keepKeyboardOpen();
            viewScroll.scrollBottom();
        };

        var footerBar = document.body.querySelector('#userMessagesView .bar-footer');
        var scroller = document.body.querySelector('#userMessagesView .scroll-content');
        var txtInput = angular.element(footerBar.querySelector('textarea'));

        function keepKeyboardOpen() {
            txtInput.one('blur', function() {
                txtInput[0].focus();
            });
        }


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
            // $scope.ChatsHistory.push(msg);
            FormatAndSendMessage(msg);
        });


        socket.on('chatMsg', function(msg) {
            console.log('chat msg', msg);
            FormatAndSendMessage(msg);
        });

        function FormatAndSendMessage(msg) {
            msg.face = "https://avatars0.githubusercontent.com/u/1282474?v=3&s=460";
            msg.user_name = currUser.user_name;
            msg.timestamp = new Date().getTime();
            $scope.ChatsHistory.push(msg);
        }



    }); // end of ChatsCtrl

})();
