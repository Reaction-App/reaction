import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../Nav";
import Home from "../../pages/Home";
import Playlist from "../../pages/Playlist";
import LoginPage from "../../pages/LoginPage";
import Authors from "../../pages/Authors";
import querystring from 'querystring';
import Spotify from '../../utils/SpotifyRoutes';
import sortFunction from  '../../utils/SortFunctions';

// Get Access Token
let parsed = querystring.parse(window.location.hash);
let accessToken = parsed['#access_token'];

/* Comment out lines 20-24 in development. 
This will keep access token in URL to ease development.
–––––––––––––––––––––––––––––––––––––––––––––––––– */

// function removeHash () {
//     window.history.pushState("", document.title, window.location.pathname + window.location.search);
// }

// removeHash();


class AppContainer extends Component {
  state = {
    
    // Current Page
    currentPage: "Home",
    
    // Access Token
    accessToken: '',
    
    // User Account Data
    userData: {
        _id: '',
        userName: '',
        userID: ''
    },
    
    // Search Form Data
    searchOption: "title",
    searchHintText: "Search for a song title...",
    query: '',
    noSongFound: false,
    searchPage: 1,                // Current search results page
    tracks: {                     // Search result track info
      trackID: '',
      trackName: '',
      trackURI: '',
      artist: '',
      album: '',
      trackURL: '',
      energy: 0,                  // Initial value set to zero. True energy & valence found after song is added to playlist.
      valence: 0
    },
    selected: [],                 // Selected song to save to playlist
    
    // Your Reaction Radio Playlist
    savedTracks: [],              // Array of saved track info
    selectedPlaylistTrack: [],    // The index of the saved track that is currently selected
    open: false,
    sortDropDown: 0,              // The current value of the 'sort by' dropdown list
    moodDropDown: 0,              // The current value of the 'mood' dropdown list
    currentSort: "Recently Added",  // Initially, your playlist is sorted by recently added
    trackName: {      
      type: String, 
      required: true 
    },

    // Chart 
    highlightSongOnGraph: null,
    chartData: [],

    // Audio Player
    songPlaying: false,
    currentSongPlayingID: "",
    currentSongPlayingAudio: null,
    currentSongPlayingTrack: "",
    
    // Export to Spotify Playlist
    playlistID: '',
    playlistUrl: '',
    playlistDescription: 'My Reaction Radio Playlist',
    playlistName: '',
    nameYourPlaylistModalOpen: false,
    playlistAddedModalOpen: false
  }

  componentDidMount() {
    // Redirect user who accesses /home without an access token
    if (accessToken === undefined) {
      document.location.href="/"
    } else {
      this.setState({accessToken: accessToken})
      this.loadSpotifyUserData()
    }
  }

  // State updates on page change
  handlePageChange = page => {
    this.setState({
      currentPage: page,
      highlightSongOnGraph: null,
      tracks:{},
      query: ''
    });
    // Close modal
    this.handleClose();
  }

  // Log out of Spotify
  logOut = () => { 
    let logOutPage = window.open('https://www.spotify.com/us/logout/');
    setTimeout(function() {
      document.location.href="/";
    }, 1500);
    setTimeout(function() {
      logOutPage.close();
    }, 1500);
    return false;
  }

/* Functions and states to pass into page components
–––––––––––––––––––––––––––––––––––––––––––––––––– */
  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home
        userData = {this.state.userData}
        searchOption = {this.state.searchOption}
        searchHintText = {this.state.searchHintText}
        query = {this.state.query}
        handleSearchOption = {this.handleSearchOption}
        handleOpen = {this.handleOpen}
        handleClose = {this.handleClose}
        handlePageChange = {this.handlePageChange}
        searchPage = {this.state.searchPage}
        handleSearchResultsPage = {this.handleSearchResultsPage}
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
        handleInputChange = {this.handleInputChange}
        handleFormSubmit = {this.handleFormSubmit}
        playlistName = {this.state.playlistName}
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
        postPlaylistToSpotify = {this.postPlaylistToSpotify}
        nameYourPlaylistModalOpen = {this.state.nameYourPlaylistModalOpen}
        playlistAddedModalOpen = {this.state.playlistAddedModalOpen}
        openNameYourPlaylistModal = {this.openNameYourPlaylistModal}
        openPlaylistAddedModal = {this.openPlaylistAddedModal}
        closeNameYourPlaylistModal = {this.closeNameYourPlaylistModal}
        closePlaylistAddedModal = {this.closePlaylistAddedModal}
        viewPlaylist = {this.viewPlaylist}
      />;
    } else if (this.state.currentPage === "Authors") {
      return <Authors
        handlePageChange = {this.handlePageChange}
        />;
    } else {
      return <LoginPage />;
    }
  }

/* Database Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

  loadTracks = () => {

    // Load tracks from DB.
    // NOTE: Requires loadSpotifyUserData to be complete so that user id is available
    API.getUser(this.state.userData._id)
        .then(res => {
          let newTracks = res.data.tracks;
          newTracks = newTracks.sort(sortFunction.compareValues('_id','desc'));
          this.setState({ savedTracks: newTracks });
          this.getGraphData();
        })
        // .then(console.log(this.savedTracks))
        .catch(err => console.log(err));
  }

/* Spotify API Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

  // API call for user's Spotify account data
  loadSpotifyUserData = () => {

    Spotify.getUserInfo(accessToken)
      .then(response => {
        // If response OK, set user data
        if (response.status === 200) {
          this.setState({
            userData: {
              userName: response.data.display_name,
              userID: response.data.id
            }
          })

          // check if user record exists in DB and update
          // if it does not exist, create one
          // then add DB _id to state.userData
          // Uses object.assign to get current userData object then add _id to the object
          API
          .upsertUser({
            userName: response.data.display_name,
            userID: response.data.id
          })
          .then(res => {
              this.setState(
                { userData: Object.assign({}, this.state.userData, {_id: res.data._id}) }
              )
              // Load any tracks already saved by user
              this.loadTracks();
          })
        }
      })
    }

  // API call for finding a track
  searchSpotify(searchOption, query) {

    this.setState({ noSongFound: false })

    // Set query type
    if (searchOption === 'artist' && query !== '') { query = `artist:${query}` }
    if (searchOption === 'album' && query !== '') { query = `album:${query}` }
    
    // Dummy data for blank request to trigger no results found message
    if (query === "") {
      query = "zyzyzyz";
    }

    // Search page results handling
    let offset;
    switch(this.state.searchPage) {
      case 2: offset ="10"; break;
      case 3: offset ="20"; break;
      default: offset ="0"; break;
    }

    // API call with header
    Spotify.searchSpotifyAPI(this.state.accessToken, query, offset)
      .then(response => {
        if (response.status === 200 && response.data.tracks.items.length > 0) {
          this.setState({
            tracks: response.data.tracks.items.map(item => {
              return {
                trackID: item.id,
                trackName: item.name,
                trackURI: item.uri,
                artist: item.artists[0].name,
                album: item.album.name,
                trackURL: item.preview_url
              }
            })
          })
        } else {
          this.setState({
            noSongFound: true,
            tracks: {}
          })
        }
      })
  }

  // Save track to Reaction Radio playlist
  handleSaveTrack = track => {

    // Create new track object
    let fullTrackDetails = track;
    // Find audio features for the track and add to new track objcet
    Spotify.getSongInfo(this.state.accessToken, fullTrackDetails.trackID)
      .then(response => {
        fullTrackDetails.valence = (response.data.valence * 100).toFixed(2)
        fullTrackDetails.energy = (response.data.energy * 100).toFixed(2)
      })
      .then(res =>
        // Push track to the user's playlist in DB
        API.saveTrack({
          _id: this.state.userData._id,
          newTrack: {
            trackName: fullTrackDetails.trackName,
            artist: fullTrackDetails.artist,
            album: fullTrackDetails.album,
            trackID: fullTrackDetails.trackID,
            trackURL: fullTrackDetails.trackURL,
            trackURI: fullTrackDetails.trackURI,
            valence: fullTrackDetails.valence,
            energy: fullTrackDetails.energy
          }
        })
      )
      // Trigger modal / update Reaction Radio playlist
      .then(this.handleOpen())
      .then(res => {this.loadTracks()})
      .catch(err => console.log(err))
  }

  // Export playlist to Spotify
  postPlaylistToSpotify = () => {

    // Handle blank playlist name
    let playlistName = this.state.playlistName
    if (playlistName.length <= 0) {
      playlistName = 'My Reaction Radio Playlist'
    }

    const playlistData = { description: 'My Reaction Radio Playlist', name: playlistName, public: 'true' };

    // First you need to create a playlist on Spotify. Once you have a playlist ID, you may add your tracks.
    Spotify.createPlaylist(this.state.accessToken, this.state.userData.userID, playlistData)
    .then(response => {
      this.setState({
        playlistID: response.data.id,
        playlistUrl: response.data.external_urls.spotify
      });
    })
    .then(() => {
      this.addSongsToPlaylist(this.state.userData.userID, this.state.playlistID, this.state.savedTracks)
    })
    .then(() => this.openPlaylistAddedModal())
    .then(() => this.closeNameYourPlaylistModal())
  }


  addSongsToPlaylist(userID, playlistID, tracksToAdd) {

    const trackURIs = tracksToAdd.map(track => {
      return track.trackURI
    });

    return Spotify.addTracksToPlaylist(this.state.accessToken, userID, playlistID, trackURIs)
    .then(response => {
      return {
        data: response.data,
        status: response.status
      }
    })
  }

/* Audio Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

 playTrack = (track) => {
    let url = track.trackURL;
    let id = track.trackID;
    let audioObject = new Audio(url);

    if (!this.state.songPlaying) {
      audioObject.play();
      this.setState({
        songPlaying: true,
        currentSongPlayingID: id,
        currentSongPlayingAudio: audioObject,
        currentSongPlayingTrack: track
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
          currentSongPlayingAudio: audioObject,
          currentSongPlayingTrack: track
        })
      }
    }
  }

  stopSongPlaying = () => {
      this.state.currentSongPlayingAudio.pause();
  }


/* Search Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */

  // Handle dialog open and close
  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.loadTracks();
    this.setState({
      open: false
    });
  }

  // Handle search form on home page
  handleSearchOption = (event, index, value) => {

      this.setState({ searchOption: value });

      if (value === 'title') {this.setState({ searchHintText: 'Search for a song title...'})};
      if (value === 'artist') {this.setState({ searchHintText: 'Search for an artist...'})};
      if (value === 'album') {this.setState({ searchHintText: 'Search for an album...'})};
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
    this.setState({ searchPage: 1 })
    this.searchSpotify(this.state.searchOption, this.state.query);
  }

  handleSearchResultsPage = page => {
    this.setState(
      { searchPage: page },
      () => {
        this.searchSpotify(this.state.searchOption, this.state.query)
      }
    );
  }

  // Row selection for search results table
  isSelected = (index) => {
      return this.state.selected.indexOf(index) !== -1;
    }

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  }


/* Graph Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */  

  getGraphData = () => {

    // Load tracks from DB
    API.getUser(this.state.userData._id)
      .then(res => {
        let tracks = res.data.tracks;
        let chartTracks = [];
        // Loop through each saved track and create data formatted for graph
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


  // Click on a track in the graph will sort by track
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

/* Reaction Radio Playlist Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */  

  // Display emoji on playlist
  showEmotion = (valence, energy) => {
    if (valence>=50 && energy>=50) {return (<div><img style={{width: 15, height: 15}} alt="happy" src="https://s17.postimg.cc/sx0jyqekv/happy.png" /><span className="tooltiptext">This song is happy!</span></div>)};
    if (valence<50 && energy<50) {return (<div><img style={{width: 15, height: 15}} alt="sad" src="https://s17.postimg.cc/5pav3pnhb/sad.png" /><span className="tooltiptext">This song is sad..</span></div>)};
    if (valence<50 && energy>50) {return (<div><img style={{width: 15, height: 15}} alt="angry" src="https://s17.postimg.cc/mptrcfatb/angry.png" /><span className="tooltiptext">This song is angry!</span></div>)};
    if (valence>50 && energy<50) {return (<div><img style={{width: 15, height: 15}} alt="relaxed" src="https://s17.postimg.cc/4zs2res3j/relaxed.png" /><span className="tooltiptext">This song is relaxing.</span></div>)};
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

/* Sort Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */  

  // Sorts playlist based on the 'sort by' dropdown list
  handleMoodSort = (event, index, value) => {

    this.setState({ sortDropDown: 0 });
    this.setState({ moodDropDown: value });

    let sortedTracks = this.state.savedTracks.slice();
    let newSort = "";

    switch(value) {
    case 1:
        newSort ="Happy"
        sortedTracks = sortFunction.calcDistance(sortedTracks,100,100);
        sortedTracks = sortedTracks.sort(sortFunction.compareValues('distance'));
        break;
    case 2:
        newSort ="Sad"
        sortedTracks = sortFunction.calcDistance(sortedTracks,0,0);
        sortedTracks = sortedTracks.sort(sortFunction.compareValues('distance'));
        break;
    case 3:
        newSort ="Angry"
        sortedTracks = sortFunction.calcDistance(sortedTracks,0,100);
        sortedTracks = sortedTracks.sort(sortFunction.compareValues('distance'));
        break;
    case 4:
        newSort ="Relaxing"
        sortedTracks = sortFunction.calcDistance(sortedTracks,100,0);
        sortedTracks = sortedTracks.sort(sortFunction.compareValues('distance'));
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

    let sortedTracks = this.state.savedTracks.slice();
    let newSort = "Selected Track";

    sortedTracks = sortFunction.calcDistance(sortedTracks,sortedTracks[index].valence,sortedTracks[index].energy);
    sortedTracks = sortedTracks.sort(sortFunction.compareValues('distance'));

    this.setState({ savedTracks: sortedTracks });
    this.setState({ currentSort: newSort });
    this.setState({ selectedPlaylistTrack: [] });
  }

/* Modal Functions
–––––––––––––––––––––––––––––––––––––––––––––––––– */  

  openNameYourPlaylistModal = () => { this.setState( {nameYourPlaylistModalOpen: true} ) }

  openPlaylistAddedModal = () => { this.setState( {playlistAddedModalOpen: true} ) }

  closeNameYourPlaylistModal = () => { this.setState( {nameYourPlaylistModalOpen: false} ) }

  closePlaylistAddedModal = () => {
    this.setState({
      playlistAddedModalOpen: false,
      playlistDescription: 'My Reaction Radio Playlist',
      playlistName: '',
      playlistID: '',
      playlistUrl: ''
    })
  }

  viewPlaylist = () => { window.open(this.state.playlistUrl) }

/* Render Navbar & Page
–––––––––––––––––––––––––––––––––––––––––––––––––– */  

  render() {
    return (
      <div>
        <Nav
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
          playTrack = {this.playTrack}
          currentSongPlayingID = {this.state.currentSongPlayingID}
          currentSongPlayingUrl = {this.state.currentSongPlayingUrl}
          currentSongPlayingTrack = {this.state.currentSongPlayingTrack}
          songPlaying = {this.state.songPlaying}
          logOut = {this.logOut}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default AppContainer;
