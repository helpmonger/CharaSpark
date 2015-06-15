(function() {
    'use strict';

    myApp.controller('TreeCtrl', function($scope,
        $state,
        $braintree,
        TreeService,
        $localStorage,
        DonationService,
        $stateParams,
        PromiseService,
        $ionicLoading) {

        // --------------hard coded credit card info ------------------
        $scope.creditCard = {};
        $scope.paymentComplete = false;
        $scope.donationAmt = $localStorage.donationAmt;
        $scope.creditCard.number = '4111111111111111';
        $scope.creditCard.expirationDate = '10/18';

        // -------------- get the donation from route ------------------

        var localDonationID = $stateParams.donationID;

        var promise = DonationService.get(localDonationID);
        PromiseService.getData(promise, function(data) {
            if (data) {
                $scope.donationAmt = data.amount;
            }
        });

        var client;

        var startup = function() {
            $braintree.getClientToken().success(function(token) {
                client = new $braintree.api.Client({
                    clientToken: token
                });
                console.log('got client!');
            });
        };

        $scope.GoToWish = function() {
            $state.go('tab.home');
        };

        $scope.payButtonClicked = function() {

            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });

            client.tokenizeCard({
                number: $scope.creditCard.number,
                expirationDate: $scope.creditCard.expirationDate
            }, function(err, nonce) {

                var form = {
                    amount: $localStorage.donationAmt,
                    nounce: nonce
                };
                // console.log('nonce is ', nonce);
                // console.log('form is ', form);
                // - Send nonce to your server (e.g. to make a transaction)

                var treePromise = TreeService.makePayment(form);

                PromiseService.getData(treePromise, function(data) {
                    if (data && data.success) {
                        $scope.paymentComplete = true;
                        $ionicLoading.hide();
                        // console.log('state params = ', $stateParams);
                        var localDonationID = $stateParams.donationID;
                        // console.log('localDonationID = ', localDonationID);
                        //get donationID from wishId
                        var donationPromise = DonationService.update({
                            '_id': localDonationID,
                            'paidDate': new Date()
                        });

                        PromiseService.getData(donationPromise, function(data) {
                            if (data) {
                                console.log('successfuly updated donation');
                            }
                        });
                    }
                });

            }); //end of tokenize card
        }; //end of pay button click

        startup();

        //close sth
    }); // end of TreeCtrl
})();
