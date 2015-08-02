angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put("templates/acceptconfirm.html","<ion-view view-title=Congrats!><ion-content class=padding><div class=\"list card\"><h4>Congratulations! You can now find your new wish in \"My Wishes\" tab.</h4><div class=\"item item-input\"><button type=button class=button-success ng-click=GoToWish()>Go To My Wishes</button></div></div></ion-content></ion-view>");
$templateCache.put("templates/tabs.html","<ion-tabs class=\"tabs-icon-top tabs-color-active-assertive\"><ion-tab title=Home icon-off=ion-ios-heart-outline icon-on=ion-ios-heart href=#/tab/home><ion-nav-view name=tab-home></ion-nav-view></ion-tab><ion-tab title=\"Fulfill a Wish\" icon-off=ion-ios-people-outline icon-on=ion-ios-people href=#/tab/fulfillawish><ion-nav-view name=tab-fulfillawish></ion-nav-view></ion-tab><ion-tab title=\"My Fulfillments\" icon-off=ion-ios-cloud-download-outline icon-on=ion-ios-cloud-download href=#/tab/myfulfillments><ion-nav-view name=tab-myfulfillments></ion-nav-view></ion-tab><ion-tab title=Account icon-off=ion-ios-gear-outline icon-on=ion-ios-gear href=#/tab/account><ion-nav-view name=tab-account></ion-nav-view></ion-tab><ion-tab title=Chats icon-off=ion-ios-chatboxes-outline icon-on=ion-ios-chatboxes href=#/tab/chats><ion-nav-view name=tab-chats></ion-nav-view></ion-tab></ion-tabs>");
$templateCache.put("templates/account/account.html","<ion-view view-title=Account><ion-nav-title><span>Account</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content><div class=list><ul class=list><li class=item ng-model=user.user_name>Username: {{user.user_name}}</li><li class=item ng-model=user.email>Email: {{user.email}}</li><li class=item>Total Donated: {{totalDonation | currency}}</li></ul><button type=button class=\"button button-block button-positive\" ng-click=editProfile()>Edit Profile</button> <button type=button class=\"button button-block button-positive\" ng-click=logOff()>Log Out</button></div></ion-content></ion-view>");
$templateCache.put("templates/account/changepassword.html","<ion-view view-title=\"Change Password\"><ion-content class=padding><form ng-submit=ChangeIt()><label class=\"item item-input item-stacked-label\"><span class=input-label>Old Password</span> <input type=text placeholder=\"enter your old password\" ng-model=pass.oldPass></label> <label class=\"item item-input item-stacked-label\"><span class=input-label>New Password</span> <input type=text placeholder=\"enter your new password\" ng-model=pass.pass1></label> <label class=\"item item-input item-stacked-label\"><span class=input-label>Confirm New Password</span> <input type=text placeholder=\"enter your new password again\" ng-model=pass.pass2></label> <label class=\"item item-input\"><span class=error>{{errorMsg}}</span></label> <label class=\"item item-input\"><button class=\"button button-block button-positive\">Submit</button></label></form></ion-content></ion-view>");
$templateCache.put("templates/account/editprofile.html","<ion-view view-title=\"Edit Profile\"><ion-content class=padding><div class=list><label class=\"item item-input\"><span class=input-label>User Name:</span> <input name=username type=text ng-model=user.user_name ng-readonly=true></label> <label class=\"item item-input\"><span class=input-label>Email:</span> <input name=email type=text ng-model=user.email required></label><div><button ng-click=goChangePassword()>Change Password</button></div><label class=\"item item-input\"><button class=\"button button-block button-positive\" ng-click=updateProfile()>Update</button></label></div></ion-content></ion-view>");
$templateCache.put("templates/auth/login.html","<ion-view view-title=\"Log In\" class=login-background><ion-content class=padding><form name=login ng-submit=Login() novalidate><div class=list><label class=\"item item-input\"><span class=input-label>User Name</span> <input name=username type=text placeholder=\"enter your username\" ng-model=user.username required></label> <label class=\"item item-input\"><span class=input-label>Password</span> <input type=password placeholder=\"enter your password\" ng-model=user.password required></label> <label class=\"item item-input\" ng-show=error><span class=error>Invalid credentials</span></label> <label class=\"item item-input\"><button type=submit class=\"button button-charaspark button-outline\" ng-disabled=login.$invalid><b>Sign in</b></button></label> <label class=\"item item-input\"><button type=button class=\"button button-clear button-charaspark\" ng-click=retrievePassword()>Forgot password</button></label> <label class=\"item item-input\"><button type=submit class=\"button button-charaspark button-outline\"><b>Facebook Login</b></button></label> <label class=\"item item-input\"><button type=button class=\"button button-clear button-charaspark\" ng-click=register()>Sign Up</button></label></div></form></ion-content></ion-view>");
$templateCache.put("templates/auth/register.html","<ion-view view-title=Register><ion-content class=padding><form name=register ng-submit=Register() novalidate><div class=list><label class=\"item item-input\"><span class=input-label>User Name</span> <input type=text placeholder=\"User name\" ng-model=user.username minlength=6 required></label> <label class=\"item item-input\"><span class=input-label>Email</span> <input name=email type=email placeholder=Email ng-model=user.email minlength=6 required></label> <label class=\"item item-input\" ng-show=\"register.email.$dirty && register.email.$invalid\"><p class=help-block>Please enter a proper email.</p></label> <label class=\"item item-input\"><span class=input-label>Enter Password</span> <input type=password name=password ng-model=user.password placeholder=password required></label> <label class=\"item item-input\"><span class=input-label>Repeat Password</span> <input name=password_confirm type=password ng-model=user.password_confirm placeholder=\"repeat password\" validate-equals=password></label> <label class=\"item item-input\" ng-show=\"register.password_confirm.$dirty && register.password_confirm.$invalid\"><p class=help-block>please match the passwords.</p></label> <label class=\"item item-input\"><button type=submit class=\"button button-block button-positive\" ng-disabled=register.$invalid>Sign Up</button></label></div></form></ion-content></ion-view>");
$templateCache.put("templates/auth/retrievePassword.html","<ion-view view-title=\"Retrieve Password\"><ion-content class=padding><form name=retrievePassword ng-submit=vm.RetrievePassword() novalidate><div class=list><label class=\"item item-input\"><span class=input-label>Email:</span> <input name=email type=email placeholder=Email ng-model=vm.email minlength=6 required></label> <label class=\"item item-input\" ng-show=\"retrievePassword.email.$dirty && retrievePassword.email.$invalid\"><p class=help-block>Please enter a valid email.</p></label> <label class=\"item item-input\"><button type=submit class=\"button button-block button-positive\" ng-disabled=retrievePassword.$invalid>Reset</button></label></div></form></ion-content></ion-view>");
$templateCache.put("templates/chats/chat-detail.html","<ion-view id=userMessagesView cache-view=false view-title=\"<i class=\'icon ion-chatbubble user-messages-top-icon\'></i> <div class=\'msg-header-username\'>{{toUser.username=\'mzdu\'}}</div>\"><ion-content class=padding><ion-list><ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"message in ChatsHistory\" type=item-text-wrap><h2>{{message.user_name}}</h2><p>{{message.message}}</p><p>{{message.timestamp}}</p><i class=\"icon ion-chevron-right icon-accessory\"></i><ion-option-button class=button-assertive ng-click=remove(chat)>Delete</ion-option-button></ion-item></ion-list></ion-content><form name=sendMessageForm ng-submit=sendMessage(input) novalidate><ion-footer-bar class=\"bar-stable item-input-inset message-footer\" keyboard-attach><label class=item-input-wrapper><textarea ng-model=input.message value placeholder=\"Send {{toUser.username}} a message...\" required minlength=1 maxlength=1500 msd-elastic></textarea></label><div class=footer-btn-wrap><button class=\"button button-icon icon ion-android-send footer-btn\" type=submit ng-disabled=\"!input.message || input.message === \'\'\"></button></div></ion-footer-bar></form></ion-view>");
$templateCache.put("templates/chats/tab-chats.html","<ion-view view-title=Chats><ion-content><ion-list><ion-item class=\"item-remove-animate item-avatar item-icon-right\" ng-repeat=\"chat in chats\" type=item-text-wrap href=#/tab/chats/{{chat.id}}><img ng-src={{chat.face}}><h2>{{chat.name}}</h2><p>{{chat.lastText}}</p><i class=\"icon ion-chevron-right icon-accessory\"></i><ion-option-button class=button-assertive ng-click=remove(chat)>Delete</ion-option-button></ion-item></ion-list></ion-content></ion-view>");
$templateCache.put("templates/directives/isUserNameUnique.html","<div style=float:right ng-class=user.isUserNameUnique>{{user.isUserNameUnique}}</div>");
$templateCache.put("templates/directives/wishDetail.html","<div style=float:left><h3>{{wish.title}}</h3>Donated To: <b>{{wish._charity.name }}</b><br>Description: {{wish.description }}<br>Wish Maker: {{wish._wishMaker.user_name }}<br>{{wish.createdDate|date: \"short\" }}<br>Paid Date: {{wish._donation.paidDate | date: \"short\"}}</div><div style=float:right ng-class=wish.wishStatus>{{wish.wishStatus}}</div>");
$templateCache.put("templates/directives/wishSummary.html","<div class=item-content ng-class=wish.wishStatus><div style=float:left>Wish title: {{wish.title}}<br>Charity: {{wish._charity.name}}<br>Amount: {{wish._donation.amount| currency}}<br>Date: {{wish.createdDate|date: \"short\" }}</div><div style=float:right><span ng-class=wish.wishStatus>{{wish.wishStatus}}</span></div></div>");
$templateCache.put("templates/fulfillawish/fulfillWishDetails.html","<ion-view view-title><ion-nav-title><span>Fulfill a Wish</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content class=padding><div class=\"list card\" ng-hide=wishAccepted><div wish-detail></div></div><div class=\"list card\" ng-hide=wishAccepted><span><button class=\"button button-positive\" type=button ng-click=Accept()>Accept</button></span> <span><a class=\"button button-assertive\" type=button ui-sref=tab.fulfillawish>Cancel</a></span></div><div class=\"list card\" ng-show=wishAccepted><p><font size=4>Congratulations! Your request has been sent to the wish maker. You will be notified once your help is accepted. Check back soon!<br>Click below to go to my fulfillments tab</font></p><div class=\"item item-input\"><a class=\"button button-positive\" ui-sref=tab.myfulfillments>Go To My Fulfillments</a></div></div></ion-content></ion-view>");
$templateCache.put("templates/fulfillawish/fulfillawish.html","<ion-view view-title><ion-nav-title><span>Fulfill a Wish</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content class=padding><ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=doRefresh()></ion-refresher><div class=list><label class=\"item item-radio\" ng-repeat=\"wish in wishes\" ng-click=goToDetails(wish)><input type=radio name=wishgroup><div wish-summary></div></label></div></ion-content></ion-view>");
$templateCache.put("templates/fulfillments/fulfillacceptconfirm.html","");
$templateCache.put("templates/fulfillments/myfulfillmentdetail.html","<ion-view view-title><ion-nav-title><span>My fulfillments</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content class=padding><div class=\"list card\"><div wish-detail></div></div><div class=\"list card\" ng-show=showContactInfo><p>Wish Maker\'s contact: {{wish._fulfiller.email}}</p></div><div class=\"list card\" ng-show=showCancel><button class=\"button button-positive\" style=float:left ng-click=Cancel()>Cancel</button></div></ion-content></ion-view>");
$templateCache.put("templates/fulfillments/myfulfillments.html","<ion-view view-title><ion-nav-title><span>My fulfillments</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content class=padding><ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=doRefresh()></ion-refresher><div class=list><label class=\"item item-radio\" ng-repeat=\"wish in wishes\" ng-click=goToDetails(wish)><input type=radio name=wishgroup><div wish-summary></div></label></div></ion-content></ion-view>");
$templateCache.put("templates/home/dash.html","<ion-view view-title=Dashboard><ion-content class=padding><div class=\"list card\"><div class=\"item item-divider\">Show Information</div><div class=\"item item-body\"><div>Show your information here.</div></div></div></ion-content></ion-view>");
$templateCache.put("templates/home/home.html","<ion-view ion-title=CharaSpark><ion-nav-title><span>Make A Wish</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content class=padding scroll=false><br><h3>Make A Difference Today</h3><form name=wishForm ng-submit=MakeAWish() novalidate><label class=\"item item-input\"><span class=input-label>Wish Title</span><br><input type=text name=wishTitle placeholder=\"Walk my dog\" ng-model=wish.title required></label> <label class=\"item item-input\" ng-show=\"wishForm.wishTitle.$dirty && wishForm.wishTitle.$error.required\"><span class=error>Wish Title is required</span></label> <label class=\"item item-input\"><span class=input-label>Wish Detail</span> <input type=text name=wishDesc placeholder=\"Friendly and beautiful dog\" ng-model=wish.description required></label> <label class=\"item item-input\" ng-show=\"wishForm.wishDesc.$dirty && wishForm.wishDesc.$error.required\"><span class=error>Wish Detail is required</span></label><label class=\"item item-input item-select\"><div class=input-label>Select Charity</div><select ng-model=wish._charity required><option ng-repeat=\"charity in charities\" value={{charity._id}}>{{charity.name}}</option></select></label> <label class=\"item item-input\"><span class=input-label>Donation Amount:</span> $<input type=text name=donationAmt placeholder=10 ng-pattern=\"/^[0-9]\\d*(\\.\\d+)?$/\" ng-model=donation.amount required></label> <label class=\"item item-input\" ng-show=\"wishForm.donationAmt.$dirty && wishForm.donationAmt.$error.required\"><span class=error>Donation amount is required</span></label> <label class=\"item item-input\" ng-show=\"wishForm.donationAmt.$dirty && wishForm.donationAmt.$error.pattern\"><span class=error>Donation amount must be a positive decimal</span></label><button type=submit class=\"button button-block button-positive\" ng-disabled=wishForm.$invalid>Make a Wish</button></form><br><h3>My Wishes</h3><ion-scroll zooming=true direction=y style=\"height: 500px\"><ion-refresher pulling-text=\"Pull to refresh...\" on-refresh=doRefresh()></ion-refresher><div class=list><label class=\"item item-radio\" ng-repeat=\"wish in wishes\" ng-click=goToDetails(wish)><input type=radio name=wishgroup><div wish-summary></div></label></div></ion-scroll></ion-content></ion-view>");
$templateCache.put("templates/home/landing.html","<ion-view view-title=\"Chara Spark\"><ion-content class=padding><div class=\"list card\"><div class=\"item item-body\"><p>This is some place holder text that will be replaced with something totally awesome.</p><div class=\"item item-image\"><img src=../../img/charasparklogin.png></div><button ng-click=facebookLogin() class=\"button button-block button-positive\">Facebook Sign In</button> <button ng-click=googleLogin() class=\"button button-block button-assertive\">Google Sign In</button> <button ng-click=emailLogin() class=\"button button-block button-energized\">Email Sign In</button></div></div></ion-content></ion-view>");
$templateCache.put("templates/home/tree.html","<ion-view view-title=\"Brain Tree\"><ion-content><form id=checkout><div class=list ng-hide=paymentComplete><label class=\"item item-input\"><span class=input-label>Credit Card Number</span><input type=text ng-model=creditCard.number></label> <label class=\"item item-input\"><span class=input-label>Expiration</span><input type=text ng-model=creditCard.expirationDate></label></div><div class=\"row row-middle\" ng-hide=paymentComplete><div class=\"col col-center\"><button class=\"button button-positive\" ng-click=payButtonClicked()>Pay ${{donationAmt}}</button></div></div><div class=\"list card\" ng-show=paymentComplete><h4>Congratulations! You can now find your new wish in \"My Wishes\" tab.</h4><div class=\"item item-input\"><a class=\"button button-positive\" ui-sref=tab.home>Go To My Wishes</a></div></div></form></ion-content></ion-view>");
$templateCache.put("templates/home/wishDetails.html","<ion-view view-title={{wish.title}}><ion-content class=padding><div class=\"list card\"><div wish-detail></div></div><div class=\"list card\"><span ng-show=showConfirm style=clear:both><button class=\"button button-positive\" ng-click=\"showCompleteOrConfirm(\'yes\',wish.wishStatus)\">Confirm</button></span> <span ng-show=showComplete style=clear:both><button class=\"button button-positive\" ng-click=\"showCompleteOrConfirm(\'yes\',wish.wishStatus)\">Complete</button></span> <span ng-show=showCancel><button class=\"button button-positive\" ng-click=\"cancel(\'no\', wish.wishStatus)\">Cancel</button></span></div></ion-content></ion-view>");
$templateCache.put("templates/introduction/intro.html","<ion-view><ion-content class=has-header><div class=card><div class=\"item item-text-wrap\"><div class=button-bar><a class=button ng-click=openModal()>Show images from start</a></div></div></div><script id=image-modal.html type=text/ng-template><div class=\"modal image-modal transparent\"> <!--this will enable click and close image function ng-click=\"closeModal()\"> --> <ion-slide-box on-slide-changed=\"slideChanged(index)\" show-pager=\"false\"> <ion-slide ng-repeat=\"oImage in aImages\"> <img ng-src=\"{{oImage.src}}\" class=\"fullscreen-image\" /> <!--<p class=\"info\">{{oImage.msg}}</p> --> </ion-slide> </ion-slide-box> </div></script></ion-content></ion-view>");
$templateCache.put("templates/wishes/mywishes.html","<ion-view view-title=\"My Wishes\"><ion-nav-title><span>My Wishes</span> <img src=./img/charaspark_logo_400.png height=50% style=\"float:left; margin-top: 13px\"></ion-nav-title><ion-content class=padding><div class=list><label class=\"item item-radio\" ng-repeat=\"wish in wishes\" ng-click=goToDetails(wish)><input type=radio name=wishgroup><div class=item-content>{{wish.title}}<br>{{wish.charity}} {{wish.amount | currency}} {{wish.date}}</div><i class=\"radio-icon ion-checkmark\"></i></label></div></ion-content></ion-view>");}]);