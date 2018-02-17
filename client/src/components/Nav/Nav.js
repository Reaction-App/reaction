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

// const styles = {

// };

const Nav = props => (
  <AppBar
    title="Reaction Radio"
    iconElementLeft = {
      <div>

      <img src='https://s17.postimg.org/xgsvell33/logo2.png' alt="Logo"
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

        <div className={props.currentSongPlayingTrack ? "player-visible" : "player-hidden"} style={{marginRight: 30, marginTop: 10, width: 330, backgroundColor: '#F7F9FF'}}>
          <IconButton
            style={{top: -4, float: 'left'}}
            disabled={!props.currentSongPlayingTrack ? true : false}
            tooltip={!props.currentSongPlayingTrack ? 'Not Available' : false}
            onClick={() => props.playTrack(props.currentSongPlayingTrack)}
          >
            <FontIcon className="material-icons">
              {props.songPlaying ? "play_circle_filled" : "play_circle_outline"}
            </FontIcon>
          </IconButton>
          <p style={{marginTop: 0, marginBottom: 0, fontFamily: 'Montserrat', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {props.currentSongPlayingTrack.trackName}
          </p>
          <p style={{marginTop: 2, marginBottom: 0, paddingBottom: 1, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
            {props.currentSongPlayingTrack.artist + " | " + props.currentSongPlayingTrack.album}
          </p>
        </div>

        <FlatButton
          className={ props.currentPage === "Home" ? "menu-item selected" : "menu-item" }
          label="Search"
          onClick={() => props.handlePageChange("Home")}
          style={{marginTop: 14, fontFamily: 'Montserrat'}} />
        <FlatButton
          className={ props.currentPage === "Playlist" ? "menu-item selected" : "menu-item" }
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
