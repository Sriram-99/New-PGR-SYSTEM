var sid = "ACb23656d214ed1989d5c7cf9dcbb2217e";
var auth_token = "e26490cc068e1adac650caba1b5d301d";

var twilio = require("twilio")(sid, auth_token);

twilio.messages
  .create({
    from: "+18507263676",
    to: "+919689031798",
    body: "this is a testing message",
  })
  .then(function(res) {console.log("message has sent!");})
  .catch(function(err)  {
    console.log(err);
  });