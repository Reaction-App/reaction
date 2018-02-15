import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import './nav.css';

// const styles = {

// };

const Nav = props => (
  <AppBar
    title="Reaction Radio"
    iconElementLeft = {<img src='https://s17.postimg.org/xgsvell33/logo2.png' alt="Logo"
      style={{
        height: '80px',
        marginTop: '-8px',
        marginLeft: '-8px'
      }}
    />}
    iconElementRight={
      <div>
        <FlatButton
          className="menu-item selected"
          label="Search"
          onClick={() => props.handlePageChange("Home")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}} />
        <FlatButton
          className="menu-item"
          label="Playlist"
          onClick={() => props.handlePageChange("Playlist")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}} />

          {/*Responsive Nav*/}
          <Toolbar className="responsive-nav">
            <ToolbarGroup firstChild={true}>
              <IconMenu
                iconButtonElement={
                  <IconButton touch={true}>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }
              >
                <MenuItem primaryText="Search" onClick={() => props.handlePageChange("Home")} />
                <MenuItem primaryText="Playlist" onClick={() => props.handlePageChange("Playlist")} />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
          {/*End Responsive Nav*/}
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
