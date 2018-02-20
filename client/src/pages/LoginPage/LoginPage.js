import React from "react";
import NavClean from "../../components/NavClean";
import './styles.css';

	// Creating Redirect URL
	const BASE_URL = 'https://accounts.spotify.com/authorize?client_id=';
	const CLIENT_ID = '6f49983391014a5a99a289c59c92d0af';
	const REDIRECT_PARAM = '&redirect_uri=';

	// IF USING LOCALHOST, USE THIS URL
	const REDIRECT_URI = encodeURIComponent('http://localhost:3000/home');

	// IF USING HEORKU, USE THIS URL
	// const REDIRECT_URI = encodeURIComponent('https://reaction-radio.herokuapp.com/home/');

	const SCOPE = '&scope=playlist-modify-public';
	const RESPONSE_TYPE = '&response_type=token'
	const STATE = '&state=3125606776';

	const REDIRECT_URL = BASE_URL + CLIENT_ID + REDIRECT_PARAM + REDIRECT_URI + SCOPE + RESPONSE_TYPE + STATE;

class LoginPage extends React.Component {

	render() {
		return (
			<div>
  				<div>
  					<NavClean />
  				</div>
	  			<div className="background">
	    			<h1>search music and curate your own playlist based on your mood</h1>
	    			<button className="login-button" onClick={ () => window.location=REDIRECT_URL}>Log In</button>
	    			<span className="spotify-callout">
	    				<p>Powered by</p> <img src="https://s17.postimg.org/rjpi4vcv3/Spotify_logo_with_text.svg.png" alt="Spotify" />
	    			</span>
	  			</div>
			</div>
		)
	};
}

export default LoginPage;

