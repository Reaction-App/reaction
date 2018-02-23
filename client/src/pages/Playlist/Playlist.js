import React from "react";
import TrackChart from "../../components/TrackChart";
import PlaylistModal from "../../components/PlaylistModal";
import './playlist.css';
import FlipMove from 'react-flip-move';

// Material UI components
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
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

// Playlist page
const Playlist = props => {

  return (

    <div className="contentWrapper">

      <PlaylistModal {...props}/>

      <div className="chart">
        {props.chartData.length ? (
          <div>
            <TrackChart chartData={props.chartData} graphClick={props.graphClick} highlightSongOnGraph={props.highlightSongOnGraph}/>
            <div>
              <p className="chart-copy">Click on a point on the chart to sort your playlist by song.</p>
            </div>
          </div>
        ) : (<div></div>)}
      </div>


        {props.savedTracks.length ? (
          <div className="playlist-container">
            <h2 className="playlist-header">My Playlist</h2>

            <div>
              <DropDownMenu
                value={props.moodDropDown}
                onChange={props.handleMoodSort}
                className="playlist-sort"
                underlineStyle={style.dropdownStyles}
                tooltip="Sort your playlist by a mood of your choice."
              >
                <MenuItem value={0} primaryText="Sort by Mood" />
                <MenuItem value={1} primaryText="Happy" />
                <MenuItem value={2} primaryText="Sad" />
                <MenuItem value={3} primaryText="Angry" />
                <MenuItem value={4} primaryText="Relaxing" />
              </DropDownMenu>
            </div>

            <div className="song-container">
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
                            tooltip={track.trackURL === null ? 'Not Available' : "Preview"}
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



                        <span>
                          <p style={{marginTop: 0, marginBottom: 0, paddingBottom: 5, fontFamily: 'Montserrat', fontSize: 12, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block', color: '#454448'}}>
                            Positivity: {track.valence}% | Energy: {track.energy}%
                          </p>
                          <div className="tooltip" style={{display: 'inline-block', marginLeft: 10, marginTop: -15, verticalAlign: 'middle'}}>
                            {props.showEmotion(track.valence,track.energy)}
                          </div>
                        </span>


                      </ListItem>
                    )}
                  )}
                </ FlipMove>
                <button className="addToPlaylistButton" onClick={() => props.openNameYourPlaylistModal()}>Export to Spotify</button>
              </List>
            </div>
          </div>
        ) : (<div style={{ margin: '0 auto', paddingTop: '340px', display: 'block', textAlign: 'center', maxWidth: 650, color: '#454448' }}>
            <img style={{ width: 150 }} src='https://s17.postimg.org/twc8xm1an/playlist-empty-state.png' alt="Start Searching" />
            {props.noSongFound ? (
              <h2 style={{ fontFamily: 'Montserrat' }}>Sorry, no results found! Please try another search.</h2>
            ):
            ( <h2 className="empty-state-text" style={{ fontFamily: 'Montserrat' }}>You haven't added any songs yet! Once you add a song, it will show up here.</h2>
            )}
          </div>)}

    </div>
  )
}

export default Playlist;
