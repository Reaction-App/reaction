import React, { Component } from "react";
import API from "../../utils/API";
import TrackChart from "../../components/TrackChart";

// Material UI components
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
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
    chartData: [{
        showInLegend: false,
        colorByPoint: true,
        name: 'American Pie',
        data: [.3, .5]
        }, {
        showInLegend: false,
        colorByPoint: true,
        name: 'Roar',
        data: [.9, .8]
        }]
  }


  componentDidMount() {

    // Load tracks from DB on page load
    this.loadTracks();

  }


  loadTracks = () => {

    // Load tracks from DB
    API.getTracks()
      .then(res => {
        let newTracks = res.data;
        console.log(res.data);
        newTracks = newTracks.sort(this.compareValues('_id','desc'));
        this.setState({ savedTracks: newTracks });
      })
      .catch(err => console.log(err));
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
      <div>
      	<div>
          <div>
            <h2>My Playlist</h2>
          </div>
          <div>
            <DropDownMenu value={this.state.sortDropDown} onChange={this.handlePlaylistSort}>
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
            <DropDownMenu value={this.state.moodDropDown} onChange={this.handleMoodSort}>
              <MenuItem value={0} primaryText="Choose a Mood" />
              <MenuItem value={1} primaryText="Happy" />
              <MenuItem value={2} primaryText="Sad" />
              <MenuItem value={3} primaryText="Angry" />
              <MenuItem value={4} primaryText="Relaxing" />
            </DropDownMenu>
            <Chip>Current Sort: {this.state.currentSort}</Chip>
          </div>

          <div>
            {this.state.savedTracks.length ? (
              <Table onRowSelection={this.handleRowSelection}>
               <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                  <TableRow>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn>Artist</TableHeaderColumn>
                    <TableHeaderColumn>Album</TableHeaderColumn>
                    <TableHeaderColumn>Positivity</TableHeaderColumn>
                    <TableHeaderColumn>Energy</TableHeaderColumn>
                    <TableHeaderColumn>Lyrics</TableHeaderColumn>
                    <TableHeaderColumn>Button</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                  {this.state.savedTracks.map((track, index) => {
                    return (
                    <TableRow key={track._id}  selected={this.isSelected(index)}>
                      <TableRowColumn>{track.trackName}</TableRowColumn>
                      <TableRowColumn>{track.artist}</TableRowColumn>
                      <TableRowColumn>{track.album}</TableRowColumn>
                      <TableRowColumn>{track.valence}</TableRowColumn>
                      <TableRowColumn>{track.energy}</TableRowColumn>
                      <TableRowColumn>Lyrics</TableRowColumn>
                      <TableRowColumn>
                        <RaisedButton
                          label="Sort"
                          onClick={() => this.handleSortBySelected(index)}
                        />
                        <RaisedButton
                          label="Delete"
                          onClick={() => this.handleDeleteTrack(track._id)}
                          style={styles.deleteButtonStyle}
                        />
                      </TableRowColumn>
                    </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            ) : (<h1>No tracks in this playlist.</h1>)}
          </div>
        </div>
        <TrackChart chartData={this.state.chartData}/>
      </div>
    );
  }
}

export default Playlist;
