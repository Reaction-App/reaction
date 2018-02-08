import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {

};

const Nav = props => (
  <AppBar

    iconElementLeft = {<img src='https://s17.postimg.org/hsk8b0kpb/logo.png' alt="Logo"
      style={{
        width: '80px',
        marginTop: '-8px',
        marginLeft: '-8px'
      }}
    />}
    iconElementRight={
      <div>
        <FlatButton label="Playlist" href="/playlist" style={{marginTop: 14, fontFamily: 'Montserrat', color: '#5A66E3' }} />
        <FlatButton label="Log Out" href="/" style={{marginTop: 14, fontFamily: 'Montserrat', color: '#5A66E3'}} />
      </div>
    }
    style={{
      backgroundColor: 'transparent',
      height: '80px',
      color: 'black',
      boxShadow: 'none'
    }}
  />
);


export default Nav;
