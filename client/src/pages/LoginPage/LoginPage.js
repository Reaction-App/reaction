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
	//const REDIRECT_URI = encodeURIComponent('https://reaction-music.herokuapp.com/home/callback');

	// Spotify scopes: https://developer.spotify.com/web-api/using-scopes/

	const SCOPE = '&scope=user-read-private%20user-read-email%20playlist-modify-public';
	const RESPONSE_TYPE = '&response_type=token'
	const STATE = '&state=3125606776';

	const REDIRECT_URL = BASE_URL + CLIENT_ID + REDIRECT_PARAM + REDIRECT_URI + SCOPE + RESPONSE_TYPE + STATE;

class LoginPage extends React.Component {

	render() {
		return (

			<div style={{ backgroundImage: 'url(https://s17.postimg.org/z057sw1lb/landing-background.jpg)', backgroundPosition: 'center', backgorundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'fixed', height: '100%', width: '100%'}}>

        <h1 style={{padding:'20px 40px', 'font-size':'50px', margin:'0 auto', maxWidth: 900, textAlign: 'center', display: 'block', color: '#FFFFFF', letterSpacing: 1, paddingTop: 300}}>search music and curate your own playlist based on your mood</h1>

        <button onClick={ () => window.location=REDIRECT_URL} style={{padding:'20px 50px', 'font-size':'16px', margin:'0 auto', textAlign: 'center', display: 'block', textTransform: 'uppercase', backgroundColor: '#5A66E3', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 2, border: 0, cursor: 'pointer', marginTop: 20}}>Sign Up</button>
			</div>
		)
	};
}

export default LoginPage;
