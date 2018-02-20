import React from "react";
import TrackChart from "../../components/TrackChart";
import PlaylistModal from "../../components/PlaylistModal";

// Material UI components
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import './playlist.css';

import FlipMove from 'react-flip-move';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

// if (props.savedTracks.length === 0) {
//   document.getElementById("meep").style.display = "none";
// }

const style = {
  dropdownStyles: {
    borderTop: 0
  },
}

const Playlist = props => {


  return (

    <div>
      {/*<div><p className="chart-copy">Click on any point below to sort by song.</p></div>*/}

    <PlaylistModal {...props}/>
      <div className="chart">
          {props.chartData.length ? (
            <div>
              <TrackChart chartData={props.chartData} graphClick={props.graphClick} highlightSongOnGraph={props.highlightSongOnGraph}/>
            </div>
          ) : (<div></div>)}
    </div>



    <div className="playlist-container">
      <h2 className="playlist-header">My Playlist</h2>

      <div>
        <DropDownMenu value={props.moodDropDown} onChange={props.handleMoodSort}
        className="playlist-sort"
        underlineStyle={style.dropdownStyles}
        >
          <MenuItem value={0} primaryText="Sort by Mood" />
          <MenuItem value={1} primaryText="Happy" />
          <MenuItem value={2} primaryText="Sad" />
          <MenuItem value={3} primaryText="Angry" />
          <MenuItem value={4} primaryText="Relaxing" />
        </DropDownMenu>
      </div>

      <button className="addToPlaylistButton" onClick={() => props.openNameYourPlaylistModal()}>Export to Spotify</button>

      <div className="song-container">
        {props.savedTracks.length ? (
          <List className="list" style={{marginTop: '-20px'}}>
            <FlipMove duration={750} easing="ease-out">
            {props.savedTracks.map((track, index) => {
              return (
                <ListItem
                  style={{paddingBottom: 0}}
                  id="songItem"
                  key={track._id}
                  leftIcon={
                    <IconButton
                      style={{marginTop: 14}}
                      disabled={track.trackURL === null ? true : false}
                      tooltip={track.trackURL === null ? 'Not Available' : false}
                      onClick={() => props.playTrack(track)}
                    >
                      <FontIcon className="material-icons">
                      {props.currentSongPlayingID === track.trackID && props.songPlaying === true ? "play_circle_filled" : "play_circle_outline"}
                      </FontIcon>
                    </IconButton>
                  }
                      onMouseEnter={() => props.highlightThis(track.trackID)}
                      onMouseLeave={() => props.highlightThis(null)}
                >

              <IconMenu
                className="action-icons"
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
              >
                <MenuItem onClick={() => props.handleSortBySelected(index)}  value="Sort" primaryText="Sort" />
                <MenuItem onClick={() => props.handleDeleteTrack(track._id)} value="Delete" primaryText="Delete" />

              </IconMenu>




                <p style={{marginTop: 0, marginBottom: 0, fontFamily: 'Montserrat', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#454448'}}>
                  {track.trackName}
                </p>
                <p style={{marginTop: 2, marginBottom: 0, paddingBottom: 1, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#454448'}}>
                  {track.artist}  |  {track.album}
                </p>
                <div>
                  <p style={{marginTop: 0, marginBottom: 0, paddingBottom: 5, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', color: '#454448'}}>
                    Positivity: {track.valence}% | Energy: {track.energy}%
                  </p>
                  <div style={{display: 'inline-block', marginLeft: 10, marginTop: -15, verticalAlign: 'middle'}}>{props.showEmotion(track.valence,track.energy)}
                  </div>
                </div>

              </ListItem>
            )}
            )}
          </ FlipMove>
        </List>
      ) : (<p style={{backgroundColor: '#F7F9FF', border: '1px solid #5A66E3', marginTop: '-20px', width: 380, maxHeight: 518, overflow: 'scroll', float: 'left', padding: 20}}>Once you start adding songs, they will show up here in your playlist.</p>)}
      </div>
    </div>
    </div>
  )
}
export default Playlist;
