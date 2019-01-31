import React from "react";
import AppBar from 'material-ui/AppBar';

const NavClean = props => (
  <AppBar
    iconElementLeft = {<img src='https://s17.postimg.cc/xgsvell33/logo2.png' alt="Logo"
      style={{
        height: '80px',
        marginTop: '-8px',
        marginLeft: '-8px'
      }}
    />}
    style={{
      backgroundColor: 'transparent',
      height: '80px',
      color: 'black',
      boxShadow: 'none'
    }}
  />
);


export default NavClean;
