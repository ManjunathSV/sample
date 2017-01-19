var {defineSupportCode} = require('cucumber');

defineSupportCode(function({Given, When, Then}) {
  When('I request the url \'/\'', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'done');
  });

  Then('I should get the response with version number', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'done');
  });

})