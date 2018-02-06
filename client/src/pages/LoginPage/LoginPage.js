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

const styles = {
	backgroundStyle: {
		backgroundImage: 'url(https://s17.postimg.org/z057sw1lb/landing-background.jpg)',
		width: "100%",
		backgroundSize: 'cover'
	},
	headingStyle: {
		padding:'20px 40px',
		'font-size':'50px',
		margin:'0 auto',
		maxWidth: 900,
		textAlign: 'center',
		display: 'block',
		color: '#FFFFFF',
		letterSpacing: 1,
		paddingTop: 300
	},
	buttonStyle: {
		padding:'20px 50px',
		'font-size':'16px',
		margin:'0 auto',
		textAlign: 'center',
		display: 'block',
		textTransform: 'uppercase',
		backgroundColor: '#5A66E3',
		color: '#FFFFFF',
		fontWeight: 'bold',
		letterSpacing: 2,
		border: 0,
		cursor: 'pointer',
		marginTop: 20,
		marginBottom: 20
	}
}


class LoginPage extends React.Component {

	render() {
		return (
			<div className="container" style={styles.backgroundStyle}>

        		<h1 style={styles.headingStyle}>search music and curate your own playlist based on your mood</h1>

        		<button onClick={ () => window.location=REDIRECT_URL} style={styles.buttonStyle}>Sign Up</button>

			</div>
		)
	};
}

export default LoginPage;
