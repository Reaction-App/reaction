import React from "react";
import TrackChart from "../../components/TrackChart";
import ExportPlaylistModal from "../../components/ExportPlaylistModal";
import MyPlaylist from "../../components/MyPlaylist"
import './playlist.css';

// Playlist page
const Playlist = props => {

  return (

    <div className="contentWrapper">
      
      <ExportPlaylistModal {...props}/>

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
          <MyPlaylist {...props}/>
        ) : (
          <div style={{ margin: '0 auto', paddingTop: '340px', display: 'block', textAlign: 'center', maxWidth: 650, color: '#454448' }}>
            <img style={{ width: 150 }} src='https://s17.postimg.org/twc8xm1an/playlist-empty-state.png' alt="Start Searching" />
            {props.noSongFound ? (
              <h2 style={{ fontFamily: 'Montserrat' }}>Sorry, no results found! Please try another search.</h2>
            ):
            ( <h2 className="empty-state-text" style={{ fontFamily: 'Montserrat' }}>You haven't added any songs yet! Once you add a song, it will show up here.</h2>
            )}
          </div>
        )}

    </div>
  )
}

export default Playlist;
