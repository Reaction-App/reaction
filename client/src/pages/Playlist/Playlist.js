import React, { Component } from "react";
import API from "../../utils/API";

// Material UI components
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
const styles = {};

class Playlist extends Component {

  // Initial state
  // selected is the index of the savedTrack that is currently selected
  state = {
    savedTracks: [],
    selected: [],
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
        this.setState({ savedTracks: res.data });
        console.log(res.data);
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

  render() {
    return (
      <div>
      	<div>
          <div>
            <h2>My Playlist</h2>
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