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
import MenuItem from 'material-ui/MenuItem';

// Get Access Token
let parsed = querystring.parse(window.location.hash);
let accessToken = parsed['#access_token'];

// function removeHash () {
//     window.history.pushState("", document.title, window.location.pathname + window.location.search);
// }

// removeHash();


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
    searchOption: "title",
    searchHintText: "Search for a song title...",
    query: '',
    noSongFound: false,
    searchPage: 1,
    tracks: {
      trackID: '',
      trackName: '',
      trackURI: '',
      artist: '',
      album: '',
      trackURL: '',
      energy: 0,
      valence: 0
    },
    spotifyPlaylistTracks: {
      trackID: '',
      trackName: '',
      trackURI: '',
      artist: '',
      album: '',
      trackURL: '',
      energy: 0,
      valence: 0
    },
    selected: [],
    // Home Modals
    songAddedModalOpen: false,
    importPlaylistModalOpen: false,
    // Importing Spotify Playlists
    noSpotifyPlaylistsFound: true,
    spotifyPlaylists: {
      spotifyPlaylistID: '',
      spotifyPlaylistName: '',
    },
    // App Playlist
    savedTracks: [],
    selectedPlaylistTrack: [], // the index of the savedTrack that is currently selected
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
    currentSongPlayingAudio: null,
    currentSongPlayingTrack: "",
    // Exporting Spotify Playlist
    playlistID: '',
    playlistUrl: '',
    playlistDescription: 'My Reaction Radio Playlist',
    playlistName: '',
    nameYourPlaylistModalOpen: false,
    playlistAddedModalOpen: false
  }

  componentDidMount() {
    // Redirect user who accesses /home without access token
    if (accessToken === undefined) {
      document.location.href="/"
    } else {
      this.setState({accessToken: accessToken})
      this.loadSpotifyUserData()
    }
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page,
      highlightSongOnGraph: null,
      tracks:{},
      query: ''
    });
    this.closeSongAddedModal();
  }

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home
        userData = {this.state.userData}
        searchOption = {this.state.searchOption}
        searchHintText = {this.state.searchHintText}
        handleSearchOption = {this.handleSearchOption}
        query = {this.state.query}
        openSongAddedModal = {this.openSongAddedModal}
        closeSongAddedModal = {this.closeSongAddedModal}
        openImportPlaylistModal = {this.openImportPlaylistModal}
        closeImportPlaylistModal = {this.closeImportPlaylistModal}
        importPlaylistModalOpen = {this.state.importPlaylistModalOpen}
        handlePageChange = {this.handlePageChange}
        searchPage = {this.state.searchPage}
        handleSearchResultsPage = {this.handleSearchResultsPage}
        songAddedModalOpen = {this.state.songAddedModalOpen}
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
        noSpotifyPlaylistsFound = {this.state.noSpotifyPlaylistsFound}
        spotifyPlaylists = {this.state.spotifyPlaylists}
        getUsersSpotifyPlaylists = {this.getUsersSpotifyPlaylists}
        getSpotifyPlaylistTracks = {this.getSpotifyPlaylistTracks}
        createPlaylistArray = {this.createPlaylistArray}
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
                { userData: Object.assign({}, this.state.userData, {_id: res.data._id}) },
              () => {this.getUsersSpotifyPlaylists()}
              )})
          .then(() => this.loadTracks())        
        })
      }
    })
  }



    handleSearchResultsPage = page => {
    this.setState(
      { searchPage: page },
      () => {
        this.searchSpotify(this.state.searchOption, this.state.query)
      }
    );
  }

  // handle dialog open and close
  openSongAddedModal = () => {
    this.setState({songAddedModalOpen: true});
  }

  closeSongAddedModal = () => {
    this.loadTracks();
    this.setState({
      songAddedModalOpen: false
    });
  }

  // handle search form on home page
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


  // API call for finding a track
  searchSpotify(searchOption, query) {

    this.setState({ noSongFound: false })

    if (searchOption === 'artist' && query !== '') { query = `artist:${query}` }
    if (searchOption === 'album' && query !== '') { query = `album:${query}` }
    
    // Dummy data for blank request
    if (query === "") {
      query = "zyzyzyz";
    }

    let offset;

    switch(this.state.searchPage) {
      case 2:
        offset ="10";
        break;
      case 3:
        offset ="20";
        break;
      default:
        offset ="0";    
        break;
    }

    // URL constructor for search
    const BASE_URL = 'https://api.spotify.com/v1/search';
    const FETCH_URL = `${BASE_URL}?q=${query}&type=track&limit=10&offset=${offset}`;
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
              trackURI: item.uri,
              artist: item.artists[0].name,
              album: item.album.name,
              trackURL: item.preview_url
            }
          })
        })):(
          this.setState({
            noSongFound: true,
            tracks: {}
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


  // Row selection for search results table
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
            trackURI: fullTrackDetails.trackURI,
            valence: fullTrackDetails.valence,
            energy: fullTrackDetails.energy
          }
        })
      )
      //Below line triggers modal
      .then(this.openSongAddedModal())
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
          newTracks = newTracks.sort(sortFunction.compareValues('_id','desc'));
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


  handleDeleteTrack = id => {
    if (this.state.songPlaying) {
      this.stopSongPlaying()
    }

    // delete a track when delete button is clicked
    API.deleteTrack(id)
      .then(this.loadTracks())
      .catch(err => console.log(err));
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

  // display emoji on playlist
  showEmotion = (valence, energy) => {
    if (valence>=50 && energy>=50) {return (<div><img style={{width: 15, height: 15}} alt="happy" src="https://s17.postimg.org/sx0jyqekv/happy.png" /><span className="tooltiptext">This song is happy!</span></div>)};
    if (valence<50 && energy<50) {return (<div><img style={{width: 15, height: 15}} alt="sad" src="https://s17.postimg.org/5pav3pnhb/sad.png" /><span className="tooltiptext">This song is sad..</span></div>)};
    if (valence<50 && energy>50) {return (<div><img style={{width: 15, height: 15}} alt="angry" src="https://s17.postimg.org/mptrcfatb/angry.png" /><span className="tooltiptext">This song is angry!</span></div>)};
    if (valence>50 && energy<50) {return (<div><img style={{width: 15, height: 15}} alt="relaxed" src="https://s17.postimg.org/4zs2res3j/relaxed.png" /><span className="tooltiptext">This song is relaxing.</span></div>)};
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

  // Import Spotify playlists
  getUsersSpotifyPlaylists = () => { 
    Spotify.getUserPlaylists(this.state.accessToken, this.state.userData.userID)
    .then(response => {
      {response.data.items.length > 0 ? (
        this.setState({
          spotifyPlaylists: response.data.items.map(item => {
            return {
              spotifyPlaylistID: item.id,
              spotifyPlaylistName: item.name
            }
          }),
          noSpotifyPlaylistsFound: false
        })):(
        this.setState({
          noSpotifyPlaylistsFound: true,
        }))
      }
    })
  }

  createPlaylistArray = () => {
    const items = [
      <MenuItem 
        value={1} 
        key={1} 
        primaryText={'Choose a playlist'} 
      />
    ];


    this.state.spotifyPlaylists.forEach((playlist) => {
      items.push(
        <MenuItem 
          value={playlist.spotifyPlaylistID} 
          key={playlist.spotifyPlaylistID} 
          primaryText={`${playlist.spotifyPlaylistName}`} 
        />
      )
    })
    
    return items
  }

  openImportPlaylistModal = () => { this.setState( {importPlaylistModalOpen: true} ) }
  closeImportPlaylistModal = () => { this.setState( {importPlaylistModalOpen: false} ) }


  getSpotifyPlaylistTracks = (playlistID) => {
    this.closeImportPlaylistModal()
    API.deleteAllTracks()
    .then(Spotify.getPlaylistTracks(this.state.accessToken, this.state.userData.userID, playlistID))
    .then(response => {
      // {response.data.items.length > 0 ? (
        this.setState({
          spotifyPlaylistTracks: response.data.items.map(item => {
            return {
              trackID: item.track.id,
              trackName: item.track.name,
              trackURI: item.track.uri,
              artist: item.track.artists[0].name,
              album: item.track.album.name,
              trackURL: item.track.preview_url
            }
          })
        }, 
        () => this.state.spotifyPlaylistTracks.map(track =>
              console.log(track)
        //         this.handleSaveTrack(track)
              )
        )
    })


    // console.log(stuff);
    //Spotify.getPlaylistTracks(this.state.accessToken, this.state.userID, this.state.spotifyPlaylistID)
  }

  // getPlaylistTracks: (access_token, userID, playlistID) => {
  //   const config = { headers: { 'Authorization': 'Bearer ' + access_token } };
  //     return axios.get(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, data, config);
  //   }





  // Export playlist to  Spotify
  postPlaylistToSpotify = () => {

    let playlistName = this.state.playlistName
    if (playlistName.length <= 0) {
      playlistName = 'My Reaction Radio Playlist'
    }

    const playlistData = { description: 'My Reaction Radio Playlist', name: playlistName, public: 'true' };

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

    console.log(trackURIs);

    return Spotify.addTracksToPlaylist(this.state.accessToken, userID, playlistID, trackURIs)
    .then(response => {
      return {
        data: response.data,
        status: response.status
      }
    })
  }

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
