const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const request = require('request')
const querystring = require('querystring')

const PORT = process.env.PORT || 3001;
const app = express();

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve up static assets
app.use(express.static("client/build"));

// Use apiRoutes
app.use("/api", apiRoutes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/reaction"
);

// SPOTIFY AUTHORIZATION

// Short way
// app.get('/login', function(req, res) {
//   res.redirect('https://accounts.spotify.com/authorize?client_id=6f49983391014a5a99a289c59c92d0af&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=3125606776')
// });

// Long way

// let redirect_uri = 
//   process.env.REDIRECT_URI || 
//   'http://localhost:8888/callback'

// app.get('/login', function(req, res) {
//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: process.env.SPOTIFY_CLIENT_ID,
//       scope: 'user-read-private user-read-email',
//       redirect_uri
//     }))
// })

// app.get('/callback', function(req, res) {
//   let code = req.query.code || null
//   let authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(
//         process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
//       ).toString('base64'))
//     },
//     json: true
//   }
//   request.post(authOptions, function(error, response, body) {
//     var access_token = body.access_token
//     let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
//     res.redirect(uri + '?access_token=' + access_token)
//   })
// })

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start listening
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
