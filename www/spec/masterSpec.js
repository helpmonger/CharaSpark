describe('user login form', function() {

    // critical
    it('ensure invalid email addresses are caught', function() {});
    it('ensure valid email addresses pass validation', function() {});
    it('ensure submitting form changes path', function() { });

    // nice-to-haves
    it('ensure client-side helper shown for empty fields', function() { });
    it('ensure hitting enter on password field submits form', function() { });

});


// ------------------- Unit testing examples -----------------------------

describe("Unit Testing Examples", function() {

  beforeEach(angular.mock.module('App'));

  it('should have a LoginCtrl controller', function() {
    expect(App.LoginCtrl).toBeDefined();
  });

  it('should have a working LoginService service', inject(['LoginService',
    function(LoginService) {
      expect(LoginService.isValidEmail).not.to.equal(null);

      // test cases - testing for success
      var validEmails = [
        'test@test.com',
        'test@test.co.uk',
        'test734ltylytkliytkryety9ef@jb-fe.com'
      ];

      // test cases - testing for failure
      var invalidEmails = [
        'test@testcom',
        'test@ test.co.uk',
        'ghgf@fe.com.co.',
        'tes@t@test.com',
        ''
      ];

      // you can loop through arrays of test cases like this
      for (var i in validEmails) {
        var valid = LoginService.isValidEmail(validEmails[i]);
        expect(valid).toBeTruthy();
      }
      for (var i in invalidEmails) {
        var valid = LoginService.isValidEmail(invalidEmails[i]);
        expect(valid).toBeFalsy();
      }

    }])
  );
});


describe("Integration/E2E Testing", function() {

  // start at root before every test is run
  beforeEach(function() {
    browser().navigateTo('/');
  });

  // test default route
  it('should jump to the /home path when / is accessed', function() {
    browser().navigateTo('#/');
    expect(browser().location().path()).toBe("/login");
  });

  it('ensures user can log in', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('email').enter('test@test.com');
    input('password').enter('password');
    element('submit').click();

    // logged in route
    expect(browser().location().path()).toBe("/dashboard");

    // my dashboard page has a label for the email address of the logged in user
    expect(element('#email').html()).toContain('test@test.com');
  });

  it('should keep invalid logins on this page', function() {
    browser().navigateTo('#/login');
    expect(browser().location().path()).toBe("/login");

    // assuming inputs have ng-model specified, and this conbination will successfully login
    input('email').enter('invalid@test.com');
    input('password').enter('wrong password');
    element('submit').click();

    expect(element('#message').html().toLowerCase()).toContain('failed');

    // logged out route
    expect(browser().location().path()).toBe("/login");

  });

});



