import React, { Component } from "react";


class LoginPage extends React.Component {
	render() {
		return (
			<div>
				<button onClick={ () => window.location='https://accounts.spotify.com/authorize?client_id=6f49983391014a5a99a289c59c92d0af&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=3125606776'} style={{padding:'20px', 'font-size':'50px', 'margin-top':'20px'}}>Click here to login to Spotify</button>
			</div>
		)
	};
}

export default LoginPage;