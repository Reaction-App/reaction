import React, { Component } from "react";
import API from "../../utils/API";

// Material UI components
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
  state = {
    savedTracks: [],
    selected: [],
    playlistDropDown: 0,
    trackName: { type: String, required: true },
    artist: "",
    album: "",
    trackID: "",
    trackURL: "",
    trackURI: "",
    valence: 0,
    energy: 0
  };


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
  };

  // Row selection
  isSelected = (index) => {
      return this.state.selected.indexOf(index) !== -1;
    };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });
  };


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

  handlePlaylistSort = (event, index, value) => {

    this.setState({ playlistDropDown: value });

    let sortedTracks = this.state.savedTracks.slice()
    console.log(sortedTracks);
    console.log(value);

    switch(value) {
    case 1:
        sortedTracks = sortedTracks.sort(this.compareValues('trackName'));
        break;
    case 2:
        sortedTracks = sortedTracks.sort(this.compareValues('artist'));
        break;
    case 3:
        sortedTracks = sortedTracks.sort(this.compareValues('album'));
        break;
    case 4:
        sortedTracks = sortedTracks.sort(this.compareValues('valence'));
        break;
    case 5:
        sortedTracks = sortedTracks.sort(this.compareValues('valence', 'desc'));
        break;
    case 6:
        sortedTracks = sortedTracks.sort(this.compareValues('energy'));
        break;
    case 7:
        sortedTracks = sortedTracks.sort(this.compareValues('energy', 'desc'));
        break;    
    default:
        break;
    };

    if (value>0) {
      this.setState({ savedTracks: sortedTracks });
    };
  }

  render() {
    return (
      <div>
      	<div>
          <div>
            <h2>My Playlist</h2>
          </div>
          <div>
            <DropDownMenu value={this.state.playlistDropDown} onChange={this.handlePlaylistSort}>
              <MenuItem value={0} primaryText="Sort by" />
              <MenuItem value={1} primaryText="Title" />
              <MenuItem value={2} primaryText="Artist" />
              <MenuItem value={3} primaryText="Album" />
              <MenuItem value={4} primaryText="Positivity - Ascending" />
              <MenuItem value={5} primaryText="Positivity - Descending" />
              <MenuItem value={6} primaryText="Energy - Ascending" />
              <MenuItem value={7} primaryText="Energy - Descending" />
            </DropDownMenu>
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
                          label="Delete"
                          onClick={() => this.handleDeleteTrack(track._id)}
                          style={styles.deleteButtonStyle}
                        />
                      </TableRowColumn>
                    </ TableRow>
                    )
                  })}
                </TableBody>
              </ Table>
            ) : (<h1>No tracks in this playlist.</h1>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;
