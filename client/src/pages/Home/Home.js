import React, { Component } from "react";
import API from "../../utils/API";
import querystring from 'querystring';

// Material UI components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

// Material UI styles
const styles = {
  saveButtonStyle: {
    marginLeft: 20
  }
};

// Get Access Token
let parsed = querystring.parse(window.location.hash);
let accessToken = parsed['#access_token'];

// Home Page
class Home extends Component {

  // Initial state
  state = {
      userData: {
        userName: '',
        email: '',
        userID: ''
      },
      tracks: {
        trackID: '',
        trackName: '',
        artist: '',
        album: '',
        trackURL: '',
        energy: 0,
        valence: 0
      },
      query: ''
  }

  componentDidMount() {
    // If no access token, redirect to login page, else, get user data.
    if (accessToken === undefined) {
      document.location.href="/"
    } else {
      this.loadSpotifyUserData();
    }
  }

  // API call for user data
  loadSpotifyUserData() {  

    // URL constructor for user data
    const BASE_URL = 'https://api.spotify.com/v1/me';
    const FETCH_URL = `${BASE_URL}`;
    const request_params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      mode: 'cors',
      cache: 'default'
    };

    // API call with header
    fetch(FETCH_URL, request_params)
      .then(response => {
        switch (response.status) {
          case 500: console.error('Some server error'); break;
          case 401: console.error('Unauthorized'); document.location.href="/";
        }
        if (response.ok) {
          response.json()
          .then(data => this.setState({
            userData: {
                userName: data.display_name,
                email: data.email,
                userID: data.id
            }
          }))
       }
     })
  }


  // API call for finding a track
  searchSpotify(query) {

    // URL constructor for search
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${query}&type=track&limit=10`;
    const request_params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      mode: 'cors',
      cache: 'default'
    };
    
    // API call with header
    fetch(FETCH_URL, request_params)
      .then(response => {
        switch (response.status) {
          case 500: console.error('Some server error'); break;
          case 401: console.error('Unauthorized'); document.location.href="/";
        }
        if (response.ok) {
          response.json()
        .then(data => this.setState({
          tracks: data.tracks.items.map(item => {
            return {
              trackID: item.id,
              trackName: item.name,
              artist: item.artists[0].name,
              album: item.album.name,
              trackURL: item.href
            }
          })
        }))
      }
    })
  }

  findAudioFeatures(trackID) {

    // URL constructor for finding audio features
    const BASE_URL = 'https://api.spotify.com/v1/audio-features/';
    const FETCH_URL = `${BASE_URL}${trackID}`;
    const request_params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      mode: 'cors',
      cache: 'default'
    };
      
    // API call with header  
    return fetch(FETCH_URL, request_params)
      .then(response => response.json())
  }

  handleInputChange = event => {
    // Get the name and value from event.target
    // Set state with new value
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {

    event.preventDefault();
    this.searchSpotify(this.state.query);
  }

  handleSaveTrack = track => {

    // Create new track object
    let fullTrackDetails = track;

    // Find audio features for the track and add to new track objcet
    this.findAudioFeatures(fullTrackDetails.trackID) 
      .then(data=> {
        fullTrackDetails.valence = data.valence
        fullTrackDetails.energy = data.energy
      })
      .then(res =>
        // Save tracks to database
        API.saveTrack({
          trackName: fullTrackDetails.trackName,
          artist: fullTrackDetails.artist,
          album: fullTrackDetails.album,
          trackID: fullTrackDetails.trackID,
          trackURL: fullTrackDetails.trackURL,
          valence: fullTrackDetails.valence,
          energy: fullTrackDetails.energy
        }))
      .then(res => alert("track saved"))
      .catch(err => console.log(err))
  }

  render() {
    return (

      <div>
      {this.state.userData ? (
        <h3>Hello {this.state.userData.userName}</h3>
        ) : (<h3>Hello</h3>)}
          <div>
          <div>
            <div>
              <h2>Search for a song</h2>
            </div>
            <div>
              <TextField
                hintText="Enter Artist, Track Name etc..."
                name="query"
                value={this.state.query}
                onChange={this.handleInputChange}

              />
              <br />
              <RaisedButton
                label="Search"
                onClick={this.handleFormSubmit}
                primary={true}
              />
            </div>
          </div>
          <div>
            <div>
              <h2>Results</h2>
            </div>
            <div>
              {this.state.tracks.length ? (
                <List>
                  {this.state.tracks.map(track => {
                    return (
                    <ListItem key={track.trackID}>
                      <p><strong>{track.trackName}</strong></p>
                      <p>Artist: {track.artist}</p>
                      <p>Album: {track.album}</p>
                      <a rel="noreferrer noopener" href="track.trackURL" target="_blank">Go to track</a>
                      <RaisedButton
                        label="Add to Playlist"
                        onClick={() => this.handleSaveTrack(track)}
                        style={styles.saveButtonStyle}
                        />
                    </ListItem>
                    )
                  })}
                </List>
              ) : (<h1>No tracks, try a new search!</h1>)}
            </div>
          </div>
          </div>
        {/*}) : (
          <button onClick={ () => window.location='https://accounts.spotify.com/authorize?client_id=6f49983391014a5a99a289c59c92d0af&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=3125606776'} style={{padding:'20px', 'font-size':'50px', 'margin-top':'20px'}}>Click here to login to Spotify</button>
        )*/}
      

      </div>
    )
  }
}

export default Home;
