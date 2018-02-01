import React, { Component } from "react";
import API from "../../utils/API";

// Material UI components
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

// Material UI styles
const styles = {
  deleteButtonStyle: {
    marginLeft: 20
  }
};

class Playlist extends Component {

  // Initial state
  state = {
    savedTracks: [],
    trackName: { type: String, required: true },
    artist: "",
    album: "",
    trackID: "",
    trackURL: "",
    trackURI: "",
    energy: 0,
    valence: 0
  };


  componentDidMount() {

    // Load tracks from DB on page load
    this.loadTracks();

  }


  loadTracks = () => {

    // Load tracks from DB
    API.getTracks()
      .then(res =>
        this.setState({ savedTracks: res.data })
      )
      .catch(err => console.log(err));
  };

  handleDeleteTrack = id => {

    // delete an article when delete button is clicked
    console.log("delete button clicked");
    console.log(id);

    API.deleteTrack(id)
      .then(res => this.loadTracks())
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      	<div>
          <div>
            <h2>Playlist</h2>
          </div>
          <div>
            {this.state.savedTracks.length ? (
              <List>
                {this.state.savedTracks.map(track => {
                  return (
                  <ListItem key={track._id}>
                    <p><strong>{track.trackName}</strong></p>
                    <p>Artist: {track.artist}</p>
                    <p>Album: {track.album}</p>
                    <p>Positivity: {track.valence}</p>
                    <p>Energy: {track.energy}</p>
                    <a rel="noreferrer noopener" href={track.trackURL} target="_blank">Go to track</a>
                    <RaisedButton
                      label="Delete"
                      onClick={() => this.handleDeleteTrack(track._id)}
                      style={styles.deleteButtonStyle}
                    />
                  </ ListItem>
                  )
                })}
              </ List>
            ) : (<h1>No tracks in this playlist.</h1>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;