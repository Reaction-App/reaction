import React, { Component } from "react";

	// Creating Redirect URL
	const BASE_URL = 'https://accounts.spotify.com/authorize?client_id=';
	const CLIENT_ID = '6f49983391014a5a99a289c59c92d0af';
	const REDIRECT_PARAM = '&redirect_uri=';

	// Redirect
	// let REDIRECT_UNENCODED = process.env.REDIRECT_URL || 'http://localhost:3000/home/callback';
	// let REDIRECT_URI = encodeURIComponent(REDIRECT_UNENCODED);

	// Heroku: REDIRECT_URL set to 'https://desolate-caverns-55074.herokuapp.com/home/callback'


	// Local Redirect
	const REDIRECT_URI = encodeURIComponent('http://localhost:3000/home/callback');

	// Heroku Redirect
	// const REDIRECT_URI = encodeURIComponent('https://desolate-caverns-55074.herokuapp.com/home/callback');

	// Spotify scopes: https://developer.spotify.com/web-api/using-scopes/

	const SCOPE = '&scope=user-read-private%20user-read-email%20playlist-modify-public';
	const RESPONSE_TYPE = '&response_type=token'
	const STATE = '&state=3125606776';

	const REDIRECT_URL = BASE_URL + CLIENT_ID + REDIRECT_PARAM + REDIRECT_URI + SCOPE + RESPONSE_TYPE + STATE;

class LoginPage extends React.Component {

	render() {
		return (
			<div>
				<button onClick={ () => window.location=REDIRECT_URL} style={{padding:'20px', 'font-size':'50px', 'margin-top':'20px'}}>Click here to login to Spotify</button>
			</div>
		)
	};
}

export default LoginPage;