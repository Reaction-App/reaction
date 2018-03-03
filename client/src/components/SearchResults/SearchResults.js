import React from "react";
import './searchResults.css';
import SearchPageModal from "../../components/SearchPageModal";

// Material UI components
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';


const SearchResults = props => (

  <Table
    className="table-styles"
    style={{backgroundColor: '#F7F9FF', fontFamily: 'Montserrat' }}
    onRowSelection={props.handleRowSelection}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
      <TableRow >
        <TableHeaderColumn style={{fontSize: 20, width: 30}}></TableHeaderColumn>
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
      }}
    >
      {props.tracks.map((track, index) => {
        return (
          <TableRow key={track.trackID} selected={props.isSelected(index)} >

            <TableRowColumn style={{fontSize: 16, width: 30}}>

              <IconButton
                style={{padding: 0, width: 0, height: 0}}
                disabled={track.trackURL === null ? true : false}
                tooltip={track.trackURL === null ? 'Not Available' : false}
                tooltipPosition='bottom-right'
                onClick={() => props.playTrack(track)}
              >
                <FontIcon className="material-icons">
                  {props.currentSongPlayingID === track.trackID && props.songPlaying === true ? "play_circle_filled" : "play_circle_outline"}
                </FontIcon>
              </IconButton>


            </TableRowColumn>
            <TableRowColumn style={{fontSize: 16}}>{track.trackName}</TableRowColumn>
            <TableRowColumn style={{fontSize: 16}}>{track.artist}</TableRowColumn>
            <TableRowColumn style={{fontSize: 16}}>{track.album}</TableRowColumn>
            <TableRowColumn>
              <div>
                <FlatButton
                  backgroundColor={props.savedTracks.findIndex(x => x.trackID === track.trackID) === -1 ? '#5A66E3' : '#ACAEB2'}
                  label={props.savedTracks.findIndex(x => x.trackID === track.trackID) === -1 ? "Add Song" : "Added"}
                  disabled={props.savedTracks.findIndex(x => x.trackID === track.trackID) === -1 ? false : true}
                  onClick={() => props.handleSaveTrack(track)}
                  style={{ float: 'right',  fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', width: 112 }} />
                <SearchPageModal {...props} />
              </div>
            </TableRowColumn>
          </TableRow>
        )
      })}
    </TableBody>
    <TableFooter className="table-footer">
      <TableRow>
        <TableRowColumn colSpan={5} className="last-row">
          {props.searchPage === 2 || props.searchPage === 3 ? (
            <IconButton
              className ="page-button-left"
              onClick={() => props.handleSearchResultsPage(props.searchPage - 1)}
              iconStyle={{fontSize: 60}}
            >
              <FontIcon
                hoverColor="#454448"
                color="#5A66E3"
                className="material-icons"
              >
                keyboard_arrow_left
              </FontIcon>
            </IconButton>
          ) : (<div></div>)}

          {props.tracks.length >= 10 && (props.searchPage === 1 || props.searchPage === 2) ? (
            <IconButton
              className ="page-button-right"
              onClick={() => props.handleSearchResultsPage(props.searchPage + 1)}
              iconStyle={{fontSize: 60}}
            >
              <FontIcon hoverColor="#454448" color="#5A66E3" className="material-icons">keyboard_arrow_right </FontIcon>
            </IconButton>
          ) : (<div></div>)}
        </TableRowColumn>
      </TableRow>
    </TableFooter>
  </Table>
);


export default SearchResults;
