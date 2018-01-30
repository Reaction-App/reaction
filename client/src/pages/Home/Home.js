import React, { Component } from "react";
import API from "../../utils/API";
import querystring from 'querystring';

// Material UI components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
import {orange500, blue500} from 'material-ui/styles/colors';

// Material UI styles
const styles = {
  saveButtonStyle: {
    marginLeft: 20
  }
};

class Home extends Component {

  // Initial state
  state = {
      userData: {},
      tracks: {},
      query: ''
  }

  componentDidMount() {
    // loadSpotifyUserData();
  }


  // loadSpotifyUserData() {  
  // }

  searchSpotify(query) {

    // Get Access Token
    let parsed = querystring.parse(window.location.hash);
    let accessToken = parsed['#access_token'];

    // URL constructor for searching
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${query}&type=track&limit=10`;
    // const ALBUM_URL = ' https://api.spotify.com/v1/artists';

    // URL constructor for user data
    // const BASE_URL = 'https://api.spotify.com/v1/me';
    // const FETCH_URL = `${BASE_URL}`;

    console.log(FETCH_URL);

    const request_params = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      mode: 'cors',
      cache: 'default'
    };

    console.log(request_params);
    

    fetch(FETCH_URL, request_params)
      .then(response => response.json())
      // .then(data => console.log(data.tracks.items))
      .then(data => this.setState({
        tracks: data.tracks.items.map(item => {
          console.log(data.tracks.items)
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

  handleInputChange = event => {
    // get the name and value from event.target
    // set state with new value
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleFormSubmit = event => {

    event.preventDefault();
    this.searchSpotify(this.state.query);
    //console.log(this.state);

    // const searchTerms = {
    //   artist: this.state.artist,
    //   trackName: this.state.trackName
    // }

  //   // get matching tracks and set state with results
  //   API.getNewTracks(searchTerms)
  //     .then(res => {this.setState({ tracks: res.data.docs })
  //         console.log("new tracks obtained");
  //         console.log(this.state.tracks);
  //       })
  //     .catch(err => console.log(err));
  }

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

        {/*{this.state.userData.user.name ? ( */}
          <div>
          {/*<h2>Hello {this.state.userData.user.name}</h2>*/}
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
                    <ListItem>
                      <p><strong>{track.trackName}</strong></p>
                      <p>Artist: {track.artist}</p>
                      <p>Album: {track.album}</p>
                      <a rel="noreferrer noopener" href="track.trackURL" target="_blank">Go to track</a>
                      <RaisedButton
                        label="Add to Playlist"
                        onClick={() => this.handleSaveTrack(track)}
                        style={styles.saveButtonStyle}
                        />
                    </ ListItem>
                    )
                  })}
                </ List>
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
