import React, { Component } from "react";


class LoginPage extends React.Component {
	render() {
		return (
			<div style={{ backgroundImage: 'url(https://s17.postimg.org/z057sw1lb/landing-background.jpg)', backgroundPosition: 'center', backgorundRepeat: 'no-repeat', backgroundSize: 'cover', position: 'fixed', height: '100%', width: '100%'}}>

        <h1 style={{padding:'20px 40px', 'font-size':'50px', margin:'0 auto', maxWidth: 900, textAlign: 'center', display: 'block', color: '#FFFFFF', letterSpacing: 1, paddingTop: 300}}>search music and curate your own playlist based on your mood</h1>

        <button onClick={ () => window.location='https://accounts.spotify.com/authorize?client_id=6f49983391014a5a99a289c59c92d0af&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=3125606776'} style={{padding:'20px 50px', 'font-size':'16px', margin:'0 auto', textAlign: 'center', display: 'block', textTransform: 'uppercase', backgroundColor: '#5A66E3', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 2, border: 0, cursor: 'pointer', marginTop: 20}}>Sign Up</button>
			</div>
		)
	};
}

export default LoginPage;
