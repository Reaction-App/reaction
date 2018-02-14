import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../Nav";
import Home from "../../pages/Home";
import Playlist from "../../pages/Playlist";
import LoginPage from "../../pages/LoginPage";
import querystring from 'querystring';


// Get Access Token
let parsed = querystring.parse(window.location.hash);
let accessToken = parsed['#access_token'];

class AppContainer extends Component {
  state = {
    // Page state
    currentPage: "Home",
    // Access Token
    accessToken: '',
    // User Account Data
    userData: {
        _id: '',
        userName: '',
        userID: ''
    },
    // Search form
    query: '',
    noSongFound: false,
    tracks: {
      trackID: '',
      trackName: '',
      artist: '',
      album: '',
      trackURL: '',
      energy: 0,
      valence: 0
    },
    selected: [],
    // Playlist
    savedTracks: [],
    selectedPlaylistTrack: [], // the index of the savedTrack that is currently selected
    open: false,
    sortDropDown: 0, // the current value of the 'sort by' dropdown list
    moodDropDown: 0, // moodDropDown is the current value of the 'mood' dropdown list
    currentSort: "Recently Added",
    trackName: { type: String, required: true },
    artist: "",
    highlightSongOnGraph: null,
    album: "",
    trackID: "",
    trackURL: "",
    trackURI: "",
    valence: 0,
    energy: 0,
    chartData: [],
    songPlaying: false,
    currentSongPlayingID: "",
    currentSongPlayingAudio: null
  }

  componentDidMount() {
    // Redirect user who accesses /home without access token
    if (accessToken === undefined) {
      document.location.href="/"
    } else {
      this.setState({accessToken: accessToken})
      this.loadSpotifyUserData()
      //this.loadTracks() can't load tracks until loadSpotifyUserData is complete
    }
  }

  handlePageChange = page => {
    this.setState({ 
      currentPage: page,
      highlightSongOnGraph: null,
      tracks:{},
      query: '' 
    });
    this.handleClose();
  }

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home
        userData = {this.state.userData}
        query = {this.state.query}
        handleOpen = {this.handleOpen}
        handleClose = {this.handleClose}
        handlePageChange = {this.handlePageChange}
        open = {this.state.open}
        actions = {this.actions}
        handleInputChange = {this.handleInputChange}
        handleFormSubmit = {this.handleFormSubmit}
        handleRowSelection = {this.handleRowSelection}
        tracks = {this.state.tracks}
        savedTracks = {this.state.savedTracks}
        isSelected = {this.isSelected}
        handleSaveTrack = {this.handleSaveTrack}
        playTrack = {this.playTrack}
        currentSongPlayingUrl = {this.state.currentSongPlayingUrl}
        currentSongPlayingID = {this.state.currentSongPlayingID}
        songPlaying = {this.state.songPlaying}
        noSongFound = {this.state.noSongFound}
      />;
    } else if (this.state.currentPage === "Playlist") {
      return <Playlist
        chartData = {this.state.chartData}
        sortDropDown = {this.state.sortDropDown}
        handlePlaylistSort = {this.handlePlaylistSort}
        moodDropDown = {this.state.moodDropDown}
        handleMoodSort = {this.handleMoodSort}
        savedTracks = {this.state.savedTracks}
        selectedPlaylistTrack = {this.state.selectedPlaylistTrack}
        handlePlaylistRowSelection = {this.handlePlaylistRowSelection}
        playlistRowIsSelected = {this.playlistRowIsSelected}
        playTrack = {this.playTrack}
        graphClick = {this.graphClick}
        currentSongPlayingID = {this.state.currentSongPlayingID}
        songPlaying = {this.state.songPlaying}
        handleSortBySelected = {this.handleSortBySelected}
        handleDeleteTrack = {this.handleDeleteTrack}
        showEmotion = {this.showEmotion}
        highlightSongOnGraph = {this.state.highlightSongOnGraph}
        highlightThis = {this.highlightThis}
      />;
    } else {
      return <LoginPage />;
    }
  };


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
          case 400: console.error('Missing token'); document.location.href="/"; break;
          case 401: console.error('Unauthorized'); document.location.href="/"; break;
          default: break;
        }
        if (response.ok) {
          response.json()
          .then(data => {
            this.setState({
              userData: {
                userName: data.display_name,
                userID: data.id
              }
            });
          
          // check if user record exists in DB and update
          // if not exist, create one
          // then add DB _id to state.userData
          // Uses object.assign to get current userData object then add _id to the object 
          API
          .upsertUser({
            userName: data.display_name,
            userID: data.id})
          .then(res => {
              this.setState(
                { userData: Object.assign({}, this.state.userData, {_id: res.data._id}) }
              )
              this.loadTracks();
          })
        })
      }
    })
  }

  // handle dialog open and close
  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.loadTracks();
    this.setState({
      open: false
    });
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


  // API call for finding a track
  searchSpotify(query) {

    this.setState({
      noSongFound: false
    })

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
          case 400: console.error('Missing token'); document.location.href="/"; break;
          case 401: console.error('Unauthorized'); document.location.href="/"; break;
          default: break;
        }
        if (response.ok) {
          response.json()
        .then(data =>
          {data.tracks.items.length > 0 ? (
          this.setState({
          tracks: data.tracks.items.map(item => {
            return {
              trackID: item.id,
              trackName: item.name,
              artist: item.artists[0].name,
              album: item.album.name,
              trackURL: item.preview_url
            }
          })
        })):(
          this.setState({
            noSongFound: true
          }))}
        )
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


  // Row selection
  isSelected = (index) => {
      return this.state.selected.indexOf(index) !== -1;
    }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  }

  handleSaveTrack = track => {

    // Create new track object
    let fullTrackDetails = track;
    // Find audio features for the track and add to new track objcet
    this.findAudioFeatures(fullTrackDetails.trackID)
      .then(data=> {
        fullTrackDetails.valence = (data.valence * 100).toFixed(2)
        fullTrackDetails.energy = (data.energy * 100).toFixed(2)
      })
      .then(res =>
        // push track to the user's playlist in DB
        API.saveTrack({
          _id: this.state.userData._id,
          newTrack: {
            trackName: fullTrackDetails.trackName,
            artist: fullTrackDetails.artist,
            album: fullTrackDetails.album,
            trackID: fullTrackDetails.trackID,
            trackURL: fullTrackDetails.trackURL,
            valence: fullTrackDetails.valence,
            energy: fullTrackDetails.energy
          }
        })
      )
      //Below line triggers modal
      .then(this.handleOpen())
      .then(res => {
        this.loadTracks()
      })
      .catch(err => console.log(err))
  }

  loadTracks = () => {

    // Load tracks from DB.
    // NOTE: Requires loadSpotifyUserData to be complete so that user id is available 
    API.getUser(this.state.userData._id)
        .then(res => {
          let newTracks = res.data.tracks;
          newTracks = newTracks.sort(this.compareValues('_id','desc'));
          this.setState({ savedTracks: newTracks });
          this.getGraphData();
        })
        .then(console.log(this.savedTracks))
        .catch(err => console.log(err));
  }

  getGraphData = () => {


    // Load tracks from DB
    API.getUser(this.state.userData._id)
      .then(res => {
        let tracks = res.data.tracks;
        let chartTracks = [];
        tracks.forEach((tracks) => {
          let nameString = '"' + tracks.trackName + '" by ' + tracks.artist;
          chartTracks.unshift({name: nameString, x: tracks.valence, y: tracks.energy})
        });
        this.setState({
          chartData: chartTracks
        });
      })
      .catch(err => console.log(err));
  }

  playTrack = (url, id) => {
      let audioObject = new Audio(url);

      if (!this.state.songPlaying) {
        audioObject.play();
        this.setState({
          songPlaying: true,
          currentSongPlayingID: id,
          currentSongPlayingAudio: audioObject
        })
      } else {
        if (this.state.currentSongPlayingID === id) {
          this.stopSongPlaying()
          this.setState({
            songPlaying: false,
          })
        } else {
          this.stopSongPlaying()
          audioObject.play();
          this.setState({
            songPlaying: true,
            currentSongPlayingID: id,
            currentSongPlayingAudio: audioObject
          })
        }
      }
    }

  stopSongPlaying = () => {
      this.state.currentSongPlayingAudio.pause();
  }

  // Row selection
  playlistRowIsSelected = (index) => {
      return this.state.selectedPlaylistTrack.indexOf(index) !== -1;
  }

  handlePlaylistRowSelection = (selectedRows) => {
    this.setState({
      selectedPlaylistTrack: selectedRows,
    });
  }


  handleDeleteTrack = id => {
    if (this.state.songPlaying) {
      this.stopSongPlaying()
    }

    // delete a track when delete button is clicked
    API.deleteTrack(id)
      .then(this.loadTracks())
      .catch(err => console.log(err));
  }

  // function for dynamic sorting
  // compares two objects, a and b
  // if the value of a[key] is greater than the value of b[key], comparison is 1
  // if the value of a[key] is less than the value of b[key], comparison is -1
  compareValues = (key, order='asc') => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
          return 0;
      }

      // if values are strings, convert to upper case
      const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

      // compare values
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }

      // if sorting in descending order, multiply comparison by -1 to get the inverse
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  // Sorts playlist based on the 'sort by' dropdown list
  handlePlaylistSort = (event, index, value) => {

    this.setState({ sortDropDown: value });
    this.setState({ moodDropDown: 0 });

    let sortedTracks = this.state.savedTracks.slice()
    let newSort = ""

    switch(value) {
    case 1:
        newSort ="Title";
        sortedTracks = sortedTracks.sort(this.compareValues('trackName'));
        break;
    case 2:
        newSort ="Artist";
        sortedTracks = sortedTracks.sort(this.compareValues('artist'));
        break;
    case 3:
        newSort ="Album";
        sortedTracks = sortedTracks.sort(this.compareValues('album'));
        break;
    case 4:
        newSort ="Positivity - Descending";
        sortedTracks = sortedTracks.sort(this.compareValues('valence', 'desc'));
        break;
    case 5:
        newSort ="Positivity - Ascending";
        sortedTracks = sortedTracks.sort(this.compareValues('valence'));
        break;
    case 6:
        newSort ="Energy - Descending";
        sortedTracks = sortedTracks.sort(this.compareValues('energy', 'desc'));
        break;
    case 7:
        newSort ="Energy - Ascending";
        sortedTracks = sortedTracks.sort(this.compareValues('energy'));
        break;
    case 8:
        newSort ="Recently Added";
        sortedTracks = sortedTracks.sort(this.compareValues('_id', 'desc'));
        break;
    default:
        break;
    };

    if (value>0) {
      this.setState({ savedTracks: sortedTracks });
      this.setState({ currentSort: newSort });
    };
  }

  // Function used to sort by mood or by a selected track
  calcDistance = (tracks, targetValence, targetEnergy) => {

    let newTracks = tracks.slice();

    if (targetValence >= 0 && targetEnergy >= 0) {
      newTracks.forEach((track, index) => {
        if (track.valence && track.energy) {
          track.distance = Math.pow((targetValence - track.valence),2) + Math.pow((targetEnergy - track.energy),2);
        };
      });
    };

    return(newTracks);
  }

// Sorts playlist based on the 'sort by' dropdown list
  handleMoodSort = (event, index, value) => {

    this.setState({ sortDropDown: 0 });
    this.setState({ moodDropDown: value });

    let sortedTracks = this.state.savedTracks.slice();
    let newSort = "";

    switch(value) {
    case 1:
        newSort ="Happy"
        sortedTracks = this.calcDistance(sortedTracks,100,100);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    case 2:
        newSort ="Sad"
        sortedTracks = this.calcDistance(sortedTracks,0,0);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    case 3:
        newSort ="Angry"
        sortedTracks = this.calcDistance(sortedTracks,0,100);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    case 4:
        newSort ="Relaxing"
        sortedTracks = this.calcDistance(sortedTracks,100,0);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    default:
        break;
    };

    if (value>0) {
      this.setState({ savedTracks: sortedTracks });
      this.setState({ currentSort: newSort });
    };
  }

  // Sorts playlist based on the selected track
  handleSortBySelected = index => {

    this.setState({ sortDropDown: 0 });
    this.setState({ moodDropDown: 0 });

    //console.log(this.state.savedTracks[index].trackName);

    let sortedTracks = this.state.savedTracks.slice();
    let newSort = "Selected Track";

    sortedTracks = this.calcDistance(sortedTracks,sortedTracks[index].valence,sortedTracks[index].energy);
    sortedTracks = sortedTracks.sort(this.compareValues('distance'));

    this.setState({ savedTracks: sortedTracks });
    this.setState({ currentSort: newSort });
    this.setState({ selectedPlaylistTrack: [] });
  }

  graphClick = event => {
    let graphTrack = event.point.name.split(/"/)[1];
    let trackIndex = 0;
    this.state.savedTracks.forEach((track, index) => {
      if (graphTrack === track.trackName) {
        trackIndex = index
      }
    })
    this.handleSortBySelected(trackIndex);
  }

  // const happy = '<img src="https://s17.postimg.org/sx0jyqekv/happy.png" />';

  // emotion functions
  showEmotion = (valence, energy) => {
    if (valence>=50 && energy>=50) {return (<div><img style={{width: 15, height: 15}} src="https://s17.postimg.org/sx0jyqekv/happy.png" /></div>)};
    if (valence<50 && energy<50) {return (<div><img style={{width: 15, height: 15}} src="https://s17.postimg.org/5pav3pnhb/sad.png" /></div>)};
    if (valence<50 && energy>50) {return (<div><img style={{width: 15, height: 15}} src="https://s17.postimg.org/mptrcfatb/angry.png" /></div>)};
    if (valence>50 && energy<50) {return (<div><img style={{width: 15, height: 15}} src="https://s17.postimg.org/4zs2res3j/relaxed.png" /></div>)};
  }

  // When hovering over a playlist track, show tooltip on chart
  highlightThis = id => {
    let nameString = '';

    // If id is not null, create namestring for chart componenent
    if (id != null) {
      this.state.savedTracks.forEach((track) => {
        if (id === track.trackID) {
          nameString = '"' + track.trackName + '" by ' + track.artist;
        }
      });
    }
    this.setState({highlightSongOnGraph: nameString})
  }

  render() {
    return (
      <div>
        <Nav
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default AppContainer;
