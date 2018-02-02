import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {};

const Nav = () => (
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
        <FlatButton label="Playlist" href="/playlist" style={{marginTop: 14}} />
        <FlatButton label="Log Out" href="/" style={{marginTop: 14}} />
      </div>
    }
    style={{
      backgroundColor: 'white',
      height: '80px'
    }}
  />
);


export default Nav;
