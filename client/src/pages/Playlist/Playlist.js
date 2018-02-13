import React from "react";
import TrackChart from "../../components/TrackChart";

// Material UI components
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';

import './playlist.css';

// if (props.savedTracks.length === 0) {
//   document.getElementById("meep").style.display = "none";
// }


const Playlist = props =>

  <div style={{margin: '0 auto', padding: 20, maxWidth: 1200, position: 'relative'}}>

    <div className="chart">
        {props.chartData.length ? (
        <TrackChart chartData={props.chartData} graphClick={props.graphClick}/>
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

      <h2 className="playlist-header" style={{color: 'white', backgroundColor: '#5A66E3', padding: 10, fontFamily: 'Montserrat'}}>My Playlist</h2>

      {props.savedTracks.length ? (
        <List className="list" style={{backgroundColor: '#F7F9FF', border: '1px solid #5A66E3', marginTop: '-20px', maxHeight: 518, overflow: 'scroll', float: 'left'}}>

          {props.savedTracks.map((track, index) => {
            return (
              <ListItem
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
                nestedItems={[
                  <div style={{ marginLeft: 72, marginTop: 0, padding: 0, fontFamily: 'Montserrat', fontSize: 12 }}>
                    <button style={{padding:'10px 20px', fontSize:'10px', margin:'0 auto', textAlign: 'center', display: 'inline-block', textTransform: 'uppercase', backgroundColor: '#5A66E3', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 2, border: 0, cursor: 'pointer', marginTop: -10, marginRight: 10 }}
         onClick={() => props.handleDeleteTrack(track._id)}>Delete</button>
                    <button style={{padding:'10px 20px', fontSize:'10px', margin:'0 auto', textAlign: 'center', display: 'inline-block', textTransform: 'uppercase', backgroundColor: '#5A66E3', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: 2, border: 0, cursor: 'pointer', marginTop: -10 }} onClick={() => props.handleSortBySelected(index)}>Sort</button>
                  </div>
                ]}
              >
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
                  <div style={{display: 'inline-block', marginLeft: 10, marginTop: -15, verticalAlign: 'middle'}}>{props.showEmotion(track.valence,track.energy)}</div>
                </div>

              </ListItem>
            )
          })}
        </List>
      ) : (<p style={{backgroundColor: '#F7F9FF', border: '1px solid #5A66E3', marginTop: '-20px', width: 380, maxHeight: 518, overflow: 'scroll', float: 'left', padding: 20}}>Once you start adding songs, they will show up here in your playlist.</p>)}
    </div>
  </div>

export default Playlist;
