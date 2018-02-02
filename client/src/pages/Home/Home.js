import React, { Component } from "react";
import API from "../../utils/API";
import querystring from 'querystring';

// Material UI components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Material UI styles
const style = {

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


  // loadSpotifyUserData() {
  // }

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

    console.log(request_params);


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

        <div>

          {this.state.userData ? (
            <h3 style={{position: 'absolute', left: 20, color: 'white', textAlign: 'center'}}>Hello {this.state.userData.userName}</h3>
          ) 
          : (<h3>Hello</h3>)}
        </div>

        <div>
          <img src={'https://s10.postimg.org/hvq64sq1l/search-background.jpg'} alt="search" style={{ height: '200', width: '100%' }}/>
          <div style={{margin: '0 auto', display: 'block', textAlign: 'center', marginTop: -112, marginBottom: 120}}>
            <TextField
              hintText="Enter Artist, Track Name etc..."
              name="query"
              value={this.state.query}
              onChange={this.handleInputChange}
              style={{backgroundColor: '#FFFFFF', display: 'inline-block', width: 600, paddingLeft: 10, height: 46, border: 0, fontSize: 14}}
            />
            <RaisedButton
              label="Search"
              onClick={this.handleFormSubmit}
              primary={true}
              style={{textTransform: 'uppercase', border: '1px solid #5A66E3', borderRadius: 0, boxShadow: 'none', height: 'initial', padding: '10px', backgroundColor: 'transaprent', backgroundColor: '#5A66E3'}}
            />
          </div>
        </div>

        <div>
          {this.state.tracks.length ? (
            <Table style={{ maxWidth: 1000, margin: '0 auto', backgroundColor: '#F7F9FF', padding: 20}}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Artist</TableHeaderColumn>
                  <TableHeaderColumn>Album</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>        
              <TableBody style={{padding: 10, display: 'inlineBlock', fontFamily: 'Montserrat'}}>
                {this.state.tracks.map(track => {
                  return (
                    <TableRow>
                      <TableRowColumn>{track.trackName}</TableRowColumn>
                      <TableRowColumn>{track.artist}</TableRowColumn>
                      <TableRowColumn>{track.album}</TableRowColumn>
                      <TableRowColumn>
                        <a rel="noreferrer noopener" href="track.trackURL" target="_blank"></a>
                        <RaisedButton
                          label="Add"
                          onClick={() => this.handleSaveTrack(track)}
                          style={{textTransform: 'uppercase', border: '1px solid #5A66E3', borderRadius: 0, boxShadow: 'none', height: 'initial', padding: '10px', backgroundColor: 'transaprent'}}
                        />
                      </TableRowColumn>
                    </TableRow>
                  )
                })}
              </TableBody>
            </ Table>
          ) 
          : ( <div style={{ margin: '0 auto', maxWidth: 500, textAlign: 'center', marginTop: 120}}>
                <img style={{width: 150, marginTop: 50}} src='https://s17.postimg.org/vobidfu3z/start-searaching.png' alt="Start Searching" />
                <h2 style={{ fontWeignt: 100, fontFamily: 'Montserrat'}}>Start by searching for a song. Then click “Add” to begin curating your playlist.</h2>
              </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home;

