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

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FlipMove from 'react-flip-move';

// if (props.savedTracks.length === 0) {
//   document.getElementById("meep").style.display = "none";
// }



const Playlist = props => {

  
  return (

    <div style={{margin: '0 auto', padding: 20, maxWidth: 1200, position: 'relative'}}>
    <PlaylistModal {...props}/>
      <div className="chart">
          {props.chartData.length ? (
            <div>
              <TrackChart chartData={props.chartData} graphClick={props.graphClick} highlightSongOnGraph={props.highlightSongOnGraph}/>
            </div>
          ) : (<div></div>)}
    </div>



    <div className="playlist-container">

      <div>
        <DropDownMenu value={props.sortDropDown} onChange={props.handlePlaylistSort} style={{ width: '50%'}}>
          <MenuItem value={0} primaryText="Sort by" />
          <MenuItem value={1} primaryText="Title" />
          <MenuItem value={2} primaryText="Artist" />
          <MenuItem value={3} primaryText="Album" />
          <MenuItem value={4} primaryText="Positivity - Descending" />
          <MenuItem value={5} primaryText="Positivity - Ascending" />
          <MenuItem value={6} primaryText="Energy - Descending" />
          <MenuItem value={7} primaryText="Energy - Ascending" />
          <MenuItem value={8} primaryText="Recently Added" />
        </DropDownMenu>

        <DropDownMenu value={props.moodDropDown} onChange={props.handleMoodSort} style={{width: '50%'}}>
          <MenuItem value={0} primaryText="Choose a Mood" />
          <MenuItem value={1} primaryText="Happy" />
          <MenuItem value={2} primaryText="Sad" />
          <MenuItem value={3} primaryText="Angry" />
          <MenuItem value={4} primaryText="Relaxing" />
        </DropDownMenu>
      </div>
      <div className="playlist-container">
        <h2 className="playlist-header" style={{color: 'white', backgroundColor: '#5A66E3', padding: 10, fontFamily: 'Montserrat'}}>My Playlist<button className="addToPlaylistButton" onClick={() => props.openNameYourPlaylistModal()}>Export to Spotify</button></h2>
        {props.savedTracks.length ? (
          <List className="list" style={{backgroundColor: '#F7F9FF', border: '1px solid #5A66E3', marginTop: '-20px', maxHeight: 518, overflow: 'scroll', float: 'left'}}>
            <FlipMove duration={750} easing="ease-out">
            {props.savedTracks.map((track, index) => {
              return (
                <ListItem
                  className="meep"
                  style={{paddingBottom: 0}}
                  id="songItem"
                  key={track._id}
                  leftIcon={
                    <IconButton
                      style={{top: -8}}
                      disabled={track.trackURL === null ? true : false}
                      tooltip={track.trackURL === null ? 'Not Available' : false}
                      onClick={() => props.playTrack(track.trackURL, track.trackID)}
                    >
                      <FontIcon className="material-icons">
                      {props.currentSongPlayingID === track.trackID && props.songPlaying === true ? "play_circle_filled" : "play_circle_outline"}
                      </FontIcon>
                    </IconButton>
                  }
                      onMouseEnter={() => props.highlightThis(track.trackID)}
                      onMouseLeave={() => props.highlightThis(null)}

                >
              <div className="action-icons">
                <img className="sort" onClick={() => props.handleSortBySelected(index)} src="https://s14.postimg.org/f0aj9ige9/sort.png" alt="Sort" />

                <img className="delete" onClick={() => props.handleDeleteTrack(track._id)} src="https://s14.postimg.org/ar5t7e2v5/delete.png" alt="Delete" />
              </div>

                <p style={{marginTop: 0, marginBottom: 0, fontFamily: 'Montserrat', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {track.trackName}
                </p>
                <p style={{marginTop: 2, marginBottom: 0, paddingBottom: 1, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {track.artist}  |  {track.album}
                </p>
                <div style={{borderBottom: '1px solid #BABABA'}}>
                  <p style={{marginTop: 0, marginBottom: 0, paddingBottom: 5, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block'}}>
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
