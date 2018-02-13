import React from "react";
import TrackChart from "../../components/TrackChart";

// Material UI components
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


// Material UI styles
const styles = {};

const Playlist = props =>

  <div style={{margin: '0 auto', padding: 20, maxWidth: 1200, position: 'relative'}}>

    <div style={{position: 'absolute', left: 0, top: 130}}>
        {props.chartData.length ? (
        <TrackChart chartData={props.chartData}/>
        ) : (<div></div>)}
        <p style={{position: 'absolute', top: '12%', left: '23%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Angry</p>
        <p style={{position: 'absolute', top: '12%', left: '70%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Happy</p>
        <p style={{position: 'absolute', top: '56%', left: '25%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Sad</p>
        <p style={{position: 'absolute', top: '56%', left: '68%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Relaxed</p>
    </div>

    <div style={{float: 'right'}}>

      <div>
        <DropDownMenu value={props.sortDropDown} onChange={props.handlePlaylistSort} style={{marginLeft: -20, width: 243}}>
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

        <DropDownMenu value={props.moodDropDown} onChange={props.handleMoodSort} style={{marginLeft: -20, width: 243}}>
          <MenuItem value={0} primaryText="Choose a Mood" />
          <MenuItem value={1} primaryText="Happy" />
          <MenuItem value={2} primaryText="Sad" />
          <MenuItem value={3} primaryText="Angry" />
          <MenuItem value={4} primaryText="Relaxing" />
        </DropDownMenu>
      </div>

      <h2 style={{color: 'white', backgroundColor: '#5A66E3', padding: 10, fontFamily: 'Montserrat', width: 402}}>My Playlist</h2>

      {props.savedTracks.length ? (
        <List style={{backgroundColor: '#F7F9FF', border: '1px solid #5A66E3', marginTop: '-20px', width: 420, maxHeight: 518, overflow: 'scroll', float: 'left'}}>

          {props.savedTracks.map((track, index) => {
            return (
              <ListItem
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
                    <button onClick={() => props.handleDeleteTrack(track._id, track.trackName, track.artist)}>Delete</button>
                    <button onClick={() => props.handleSortBySelected(index)}>Sort</button>
                  </div>
                ]}
              >
                <p style={{marginTop: 0, marginBottom: 0, fontFamily: 'Montserrat', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {track.trackName}
                </p>
                <p style={{marginTop: 0, marginBottom: 0, paddingBottom: 1, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  {track.artist}  |  {track.album}
                </p>
                <p style={{marginTop: 0, marginBottom: 0, paddingBottom: 5, fontFamily: 'Montserrat', fontSize: 12, borderBottom: '1px solid #555555', maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                  Positivity: {track.valence} | Energy: {track.energy} {props.showEmotion(track.valence,track.energy)}
                </p>
              </ListItem>
            )
          })}
        </List>
      ) : (<h1>No tracks in this playlist.</h1>)}

    </div>

  </div>

export default Playlist;
