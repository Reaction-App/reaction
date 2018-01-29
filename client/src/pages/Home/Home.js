import React, { Component } from "react";
import {Input, FormBtn} from "../../components/Form";
import API from "../../utils/API";
import "./Home.css";

class Home extends Component {
  // Initial state
  state = {
    tracks: [],
    artist: "",
    trackName: ""
  };

  handleInputChange = event => {
    // get the name and value from event.target
    // set state with new value
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {

    // When the form is submitted get matching tracks
    event.preventDefault();

    console.log(this.state);

    const searchTerms = {
      artist: this.state.artist,
      trackName: this.state.trackName
    }

    // get matching tracks and set state with results
    API.getNewTracks(searchTerms)
      .then(res => {this.setState({ tracks: res.data.docs })
          console.log("new tracks obtained");
          console.log(this.state.tracks);
        })
      .catch(err => console.log(err));
  };

  handleSaveTrack = track => {

    // save a track when save button is clicked
    API.saveTrack({
        artist: track.artist,
        name: track.trackName
      })
        .then(res => alert("track saved"))
        .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <h2>Add track to Playlist</h2>
          </div>
          <div className="panel-body">

            <form>        
              <Input
                name="artist"
                value={this.state.artist}
                onChange={this.handleInputChange}
                placeholder="Artist" />
              
              <Input
                name="trackName"
                value={this.state.trackName}
                onChange={this.handleInputChange}
                placeholder="Track Name" />

              <FormBtn onClick={this.handleFormSubmit}>Search</FormBtn>

            </form>

          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <h2>Results</h2>
          </div>
          <div className="panel-body">
            {this.state.tracks.length ? (
              <ul className="list-group">
                {this.state.tracks.map(track => {
                  return (
                  <li className="list-group-item" key={track._id}>
                    <p><strong>{track.trackName}</strong></p>
                    <p>{track.artist}</p>
                    <a rel="noreferrer noopener" href={track.spotifyURL} target="_blank">Go to track</a>
                    <button className="btn btn-primary" onClick={() => this.handleSaveTrack(track)}>Add to Playlist</button>
                  </li>
                  )
                })}
              </ul>
            ) : (<h1 className="text-center">No tracks, try a new search!</h1>)}
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
