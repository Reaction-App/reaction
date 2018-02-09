import React from "react";
import TrackChart from "../../components/TrackChart";

// Material UI components
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';


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
        <div>

          <h2 style={{color: 'white', backgroundColor: '#5A66E3', padding: 10, fontFamily: 'Montserrat', width: 402}}>My Playlist</h2>
          {props.savedTracks.length ? (
          <ul onRowSelection={props.handleRowSelection} style={{backgroundColor: '#F7F9FF', padding: 10, border: '1px solid #5A66E3', marginTop: '-21px', width: 400, maxHeight: 518, overflow: 'scroll', float: 'left'}}>
          {props.savedTracks.map((track, index) => {
          return (


            <li key={track._id}  selectedPlaylistTrack={props.isSelected(index)} style={{listStyleType: 'none', fontFamily: 'Montserrat'}}>
              <IconButton style={{padding: 0, width: 0, height: 0}} onClick={() => props.playTrack(track.trackURL)}>
                <FontIcon className="material-icons">
                {props.currentSongPlayingUrl === track.trackURL && props.songPlaying === true ? "play_circle_filled" : "play_circle_outline"}
                </FontIcon>
              </IconButton>
              <div style={{display: 'inline-block', margin: '10px 0 0 35px', borderBottom: '1px solid grey', width: '90%'}}>
                <p style={{margin: 0}}>{track.trackName}</p>
                <p style={{marginTop: 0, fontSize: 12}}>{track.artist}  |  {track.album}</p>
              </div>
              <DropDownMenu style={{float: 'right', marginTop: -70}} >
                <MenuItem value={0} primaryText="Sort Playlist by this Song" onClick={() => props.handleSortBySelected(index)} />
                <MenuItem value={1} primaryText="Remove this song from Playlist" onClick={() => props.handleDeleteTrack(track._id)} style={styles.deleteButtonStyle} />
              </DropDownMenu>
            </li>
            )
            })}
          </ul>



          ) : (<h1>No tracks in this playlist.</h1>)}
          </div>
          </div>
          </div>



      </div>


export default Playlist;
