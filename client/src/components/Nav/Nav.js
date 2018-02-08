import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {

};

const Nav = props => (
  <AppBar
    title="Reaction Radio"
    iconElementLeft = {<img src='https://s17.postimg.org/yqqotn75b/logo2.png' alt="Logo"
      style={{
        height: '80px',
        marginTop: '-8px',
        marginLeft: '-8px'
      }}
    />}
    iconElementRight={
      <div>
        <FlatButton
          label="Search"
          onClick={() => props.handlePageChange("Home")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}} />
        <FlatButton
          label="Playlist"
          onClick={() => props.handlePageChange("Playlist")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}} />
      </div>
    }
    style={{
      backgroundColor: 'transparent',
      height: '80px',
      color: 'black'
    }}
  />
);


export default Nav;
