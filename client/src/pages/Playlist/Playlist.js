import React, { Component } from "react";
import API from "../../utils/API";
import TrackChart from "../../components/TrackChart";

// Material UI components
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Material UI styles
const styles = {};

class Playlist extends Component {

  // Initial state
  // selected is the index of the savedTrack that is currently selected
  // sortDropDown is the current value of the 'sort by' dropdown list
  // moodDropDown is the current value of the 'mood' dropdown list
  state = {
    savedTracks: [],
    selected: [],
    sortDropDown: 0,
    moodDropDown: 0,
    currentSort: "Recently Added",
    trackName: { type: String, required: true },
    artist: "",
    album: "",
    trackID: "",
    trackURL: "",
    trackURI: "",
    valence: 0,
    energy: 0,
    chartData: [],
    songPlaying: false,
    currentSongPlayingUrl: "",
    currentSongPlayingAudio: null
  }


  componentDidMount() {

    // Load tracks from DB on page load
    this.loadTracks();
    console.log(this.state);
  }


  loadTracks = () => {

    // Load tracks from DB
    API.getTracks()
      .then(res => {
        let newTracks = res.data;
        // console.log(res.data);
        newTracks = newTracks.sort(this.compareValues('_id','desc'));
        this.setState({ savedTracks: newTracks });
        this.getGraphData();
      })
      .catch(err => console.log(err));
  }

  getGraphData = () => {

    // Load tracks from DB
    API.getTracks()
      .then(res => {
        let tracks = res.data;
        let chartTracks = [];
        console.log(res.data);
        tracks.map((tracks) => {
          let nameString = '"' + tracks.trackName + '" by ' + tracks.artist;
          chartTracks.push({name: nameString, x: tracks.valence, y: tracks.energy})
          console.log(chartTracks);
        });
        console.log(chartTracks);
        this.setState({chartData: chartTracks});
      })
      .catch(err => console.log(err));
  }


  playTrack = (url) => {
      let audioObject = new Audio(url);

      if (!this.state.songPlaying) {
        audioObject.play();
        this.setState({
          songPlaying: true,
          currentSongPlayingUrl: url,
          currentSongPlayingAudio: audioObject
        })
      } else {
        if (this.state.currentSongPlayingUrl === url) {
          this.state.currentSongPlayingAudio.pause();
          this.setState({
            songPlaying: false,
          })
        } else {
          this.state.currentSongPlayingAudio.pause();
          audioObject.play();
          this.setState({
            songPlaying: true,
            currentSongPlayingUrl: url,
            currentSongPlayingAudio: audioObject
          })
        }
      }
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


  handleDeleteTrack = id => {

    // delete an article when delete button is clicked
    console.log("delete button clicked");
    console.log(id);

    API.deleteTrack(id)
      .then(res => this.loadTracks())
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
    let distance = 0;

    if (targetValence >= 0 && targetEnergy >= 0) {
      newTracks.map((track, index) => {
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
        sortedTracks = this.calcDistance(sortedTracks,1,1);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    case 2:
        newSort ="Sad"
        sortedTracks = this.calcDistance(sortedTracks,0,0);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    case 3:
        newSort ="Angry"
        sortedTracks = this.calcDistance(sortedTracks,0,1);
        sortedTracks = sortedTracks.sort(this.compareValues('distance'));
        break;
    case 4:
        newSort ="Relaxing"
        sortedTracks = this.calcDistance(sortedTracks,1,0);
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

    console.log(index);
    //console.log(this.state.savedTracks[index].trackName);

    let sortedTracks = this.state.savedTracks.slice();
    let newSort = "Selected Track";

    sortedTracks = this.calcDistance(sortedTracks,sortedTracks[index].valence,sortedTracks[index].energy);
    sortedTracks = sortedTracks.sort(this.compareValues('distance'));

    this.setState({ savedTracks: sortedTracks });
    this.setState({ currentSort: newSort });
    this.setState({ selected: [] });
  }

  render() {

    return (
      <div style={{margin: '0 auto', padding: 20, maxWidth: 1200, position: 'relative'}}>

      <div style={{position: 'absolute', left: 0, top: 130}}>
          {this.state.chartData.length ? (
          <TrackChart chartData={this.state.chartData}/>
          ) : (<div></div>)}
          <p style={{position: 'absolute', top: '12%', left: '23%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Angry</p>
          <p style={{position: 'absolute', top: '12%', left: '70%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Happy</p>
          <p style={{position: 'absolute', top: '56%', left: '25%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Sad</p>
          <p style={{position: 'absolute', top: '56%', left: '68%', fontFamily: 'Montserrat', fontSize: '36px', fontWeight: 'bold', color: '#DCDFFA', zIndex: -1}}>Relaxed</p>
        </div>
        <div style={{float: 'right'}}>
      	<div>
          <div>
            <DropDownMenu value={this.state.sortDropDown} onChange={this.handlePlaylistSort} style={{marginLeft: -20, width: 243}}>
              <MenuItem value={0} primaryText="Sort by" />
              <MenuItem value={1} primaryText="Title" />
              <MenuItem value={2} primaryText="Artist" />
              <MenuItem value={3} primaryText="Album" />
              <MenuItem value={4} primaryText="Positivity - Descending" />
              <MenuItem value={5} primaryText="Positivity - Ascending" />
              <MenuItem value={6} primaryText="Energy - Descending" />
              <MenuItem value={7} primaryText="Energy - Ascending" />
              <MenuItem value={8} primaryText="Recently Added" />
            </DropDownMenu>
            <DropDownMenu value={this.state.moodDropDown} onChange={this.handleMoodSort} style={{marginLeft: -20, width: 243}}>
              <MenuItem value={0} primaryText="Choose a Mood" />
              <MenuItem value={1} primaryText="Happy" />
              <MenuItem value={2} primaryText="Sad" />
              <MenuItem value={3} primaryText="Angry" />
              <MenuItem value={4} primaryText="Relaxing" />
            </DropDownMenu>
          </div>
        <div>

          <h2 style={{color: 'white', backgroundColor: '#5A66E3', padding: 10, fontFamily: 'Montserrat', width: 402}}>My Playlist</h2>
          {this.state.savedTracks.length ? (
          <ul onRowSelection={this.handleRowSelection} style={{backgroundColor: '#F7F9FF', padding: 10, border: '1px solid #5A66E3', marginTop: '-21px', width: 400, maxHeight: 518, overflow: 'scroll', float: 'left'}}>
          {this.state.savedTracks.map((track, index) => {
          return (


            <li key={track._id}  selected={this.isSelected(index)} style={{listStyleType: 'none', fontFamily: 'Montserrat'}}>
              <IconButton style={{padding: 0, width: 0, height: 0}} onClick={() => this.playTrack(track.trackURL)} tooltip="Play Song" >
                <FontIcon className="material-icons">
                {this.state.currentSongPlayingUrl == track.trackURL && this.state.songPlaying == true ? "play_circle_filled" : "play_circle_outline"}
                </FontIcon>
              </IconButton>
              <div style={{display: 'inline-block', margin: '10px 0 0 35px', borderBottom: '1px solid grey', width: '90%'}}>
                <p style={{margin: 0}}>{track.trackName}</p>
                <p style={{marginTop: 0, fontSize: 12}}>{track.artist}  |  {track.album}</p>
              </div>
              <DropDownMenu style={{float: 'right', marginTop: -70}} >
                <MenuItem value={0} primaryText="Sort Playlist by this Song" onClick={() => this.handleSortBySelected(index)} />
                <MenuItem value={1} primaryText="Remove this song from Playlist" onClick={() => this.handleDeleteTrack(track._id)} style={styles.deleteButtonStyle} />
              </DropDownMenu>
            </li>
            )
            })}
          </ul>



          ) : (<h1>No tracks in this playlist.</h1>)}
          </div>
          </div>
          </div>



      </div>
    );
  }
}

export default Playlist;
