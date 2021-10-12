/**
 * This is an example of a basic node.js script that performs
 * the Client Credentials oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */
var express = require('express'); // Express web server framework
var app = express();
app.use(express.static(__dirname + '/public'));

var request = require('request'); // "Request" library

var client_id = '09b2984f748247b7bcad4e504cd7a65c'; // Your client id
var client_secret = '4902813f323d40f48da01f88fed2ff17'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.get('/connor',(req,res) => {
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: 'https://api.spotify.com/v1/users/12168028487',
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, function(error, response, bod) {
        // console.log(bod);
        // res.write(JSON.stringify(bod));
        res.send(JSON.stringify(bod));
      });
    }
  });
});

app.get('/test', (req, res)=>{
  res.send("heloo")
});

console.log('Listening on 3777');
app.listen(3777);

