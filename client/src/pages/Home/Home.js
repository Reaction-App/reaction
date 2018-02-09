import React, { Component } from "react";
import API from "../../utils/API";
import querystring from 'querystring';
//import "/home.css";

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

import {
  cyan500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

  const styles = {
    meep: {
      // bottom: '20 !important',
      // fontSize: '21',
      // left: '20',
      // position: 'absolute'
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
      query: '',
      selected: []

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
          .then(data => {
            this.setState({
              userData: {
                userName: data.display_name,
                email: data.email,
                userID: data.id
              }
            });
            
            // check if user record exists in DB and update
            // if not exist, crreate one
            console.log(this.state);
            API.upsertUser({
              userName: data.display_name,
              email: data.email,
              userID: data.id});
        })
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
              trackURL: item.preview_url
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

  // Row selection
  isSelected = (index) => {
      return this.state.selected.indexOf(index) !== -1;
    };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };

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
        <div style={{
          backgroundImage: 'url(https://s10.postimg.org/hvq64sq1l/search-background.jpg)',
          width: "100%",
          backgroundSize: 'cover',
          marginBottom: 50
        }}>

            {this.state.userData ? (
              <h3 style={{
                marginTop: 0,
                paddingTop: 20,
                color: 'white',
                textAlign: 'center'
              }}>
              Hey there, {this.state.userData.userName}</h3>
            )
            : (<h3 style={{
                marginTop: 0,
                paddingTop: 20,
                color: 'white',
                textAlign: 'center'
              }}>
              Hey There, music lover.</h3>)}

            <div style={{margin: '0 auto', display: 'block', textAlign: 'center'}}>
              <TextField
                underlineShow={false}
                hintText="Enter Artist, Track Name etc..."
                hintStyle={styles.meep}
                name="query"
                value={this.state.query}
                onChange={this.handleInputChange}
                style={{
                  backgroundColor: '#FFFFFF',
                  display: 'inline-block',
                  marginBottom: 60,
                  width: "50%",
                  paddingLeft: 10,
                  height: 59,
                  border: 0,
                  fontSize: 20,
                  fontFamily: 'Montserrat',
                }}
              />

               <button
                onClick={this.handleFormSubmit}
                style={{
                padding:'20px 50px',
                'font-size':'16px',
                margin:'0 auto',
                textAlign: 'center',
                display: 'inline-block',
                textTransform: 'uppercase',
                backgroundColor: '#5A66E3',
                color: '#FFFFFF',
                fontWeight: 'bold',
                letterSpacing: 2,
                border: 0,
                cursor: 'pointer',
                marginTop: 0,
                marginBottom: 20
                }}>
                Search
              </button>
            </div>

        </div>

        <div>
          {this.state.tracks.length ? (
            <Table
              onRowSelection={this.handleRowSelection}
              style={{
                maxWidth: '80%',
                margin: '0 auto',
                backgroundColor: '#F7F9FF',
                padding: 20,
                fontFamily: 'Montserrat',
              }}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
                <TableRow >
                  <TableHeaderColumn style={{fontSize: 20}}>Title</TableHeaderColumn>
                  <TableHeaderColumn style={{fontSize: 20}}>Artist</TableHeaderColumn>
                  <TableHeaderColumn style={{fontSize: 20}}>Album</TableHeaderColumn>
                  <TableHeaderColumn></TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody
                displayRowCheckbox={false}
                style={{
                  padding: 10,
                  fontFamily: 'Montserrat'
              }}>
                {this.state.tracks.map((track, index) => {
                  return (
                    <TableRow key={track.trackID} selected={this.isSelected(index)} >
                      <TableRowColumn style={{fontSize: 16}}>{track.trackName}</TableRowColumn>
                      <TableRowColumn style={{fontSize: 16}}>{track.artist}</TableRowColumn>
                      <TableRowColumn style={{fontSize: 16}}>{track.album}</TableRowColumn>
                      <TableRowColumn style={{fontSize: 16}}>
                        <a style={{textDecoration: 'none'}} rel="noreferrer noopener" href="track.trackURL" target="_blank">Link</a>
                        <RaisedButton
                          backgroundColor={'#5A66E3'}
                          labelColor={"#FFFFFF"}
                          label="Add"
                          onClick={() => this.handleSaveTrack(track)}
                          style={{ float: 'right',  fontSize: 16 }}
                        />
                      </TableRowColumn>
                    </TableRow>
                  )
                })}
              </TableBody>
            </ Table>
          )
          : ( <div style={{ margin: '0 auto', marginTop: 80, display: 'block', textAlign: 'center', maxWidth: 500 }}>
                <img style={{ width: 150 }} src='https://s17.postimg.org/vobidfu3z/start-searaching.png' alt="Start Searching" />
                <h2 style={{ fontFamily: 'Montserrat' }}>Start by searching for a song. Then click “Add” to begin curating your playlist.</h2>
              </div>
          )}
        </div>
      </div>
    )
  }
}

export default Home;

