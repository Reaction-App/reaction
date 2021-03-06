import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import './nav.css';

const Nav = props => (
  <AppBar
    className="nav"
    title="Reaction Radio"

    iconElementLeft = {
      <div>

        <img
          src='https://s17.postimg.cc/xgsvell33/logo2.png'
          alt="Logo"
          className="logo"
          onClick={() => props.handlePageChange("Home")}
          style={{
            height: '80px',
            marginTop: '-8px',
            marginLeft: '-8px'
          }}
        />
      </div>
    }

    iconElementRight={
      <div>
        <div className={props.currentSongPlayingTrack ? "player-visible" : "player-hidden"} style={{ width: "30%", backgroundColor: '#F7F9FF', position: 'fixed', left: 0, right: 0, margin: '0 auto', marginTop: -10 }}>
          <IconButton
            style={{ margin: '0 auto', left: 0, right: 0, display: 'block'}}
            disabled={!props.currentSongPlayingTrack ? true : false}
            tooltip={!props.currentSongPlayingTrack ? 'Not Available' : false}
            onClick={() => props.playTrack(props.currentSongPlayingTrack)}
          >
          <FontIcon className="material-icons">
            {props.songPlaying ? "play_circle_filled" : "play_circle_outline"}
          </FontIcon>

          </IconButton>
          <p style={{fontFamily: 'Montserrat', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 14, marginTop: 3, padding: "0 20px", color: '#454448' }}>
            {props.currentSongPlayingTrack.trackName} - {props.currentSongPlayingTrack.artist}

          </p>
        </div>

        <FlatButton
          className={ props.currentPage === "Home" ? "menu-item selected" : "menu-item" }
          label="Search"
          disabled={props.currentPage === "Home" ? true : false}
          onClick={() => props.handlePageChange("Home")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}}
        />
        <FlatButton
          className={ props.currentPage === "Playlist" ? "menu-item selected" : "menu-item" }
          label="Playlist"
          disabled={props.currentPage === "Playlist" ? true : false}
          onClick={() => props.handlePageChange("Playlist")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}}
        />
        <FlatButton
          className="menu-item"
          label="Log Out"
          onClick={() => props.logOut()}
          style={{marginTop: 14, fontFamily: 'Montserrat'}}
        />

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
                <MenuItem primaryText="Log Out" onClick={() => props.logOut()} />
              </IconMenu>
            </ToolbarGroup>
          </Toolbar>
          {/*End Responsive Nav*/}
      </div>
    }
    style={{
      backgroundColor: 'white',
      height: '80px',
      color: 'black'
    }}
  />
);


export default Nav;
