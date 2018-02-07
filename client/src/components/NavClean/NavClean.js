import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {

};

const NavClean = props => (
  <AppBar
    title="Reaction Radio"
    iconElementLeft = {<img src='https://s17.postimg.org/hsk8b0kpb/logo.png' alt="Logo"
      style={{
        width: '80px',
        marginTop: '-8px',
        marginLeft: '-8px'
      }}
    />}
    style={{
      backgroundColor: 'white',
      height: '80px',
      color: 'black'
    }}
  />
);


export default NavClean;
