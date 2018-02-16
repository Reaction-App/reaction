import React from "react";
import './home.css';

// Material UI components
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
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

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

  const style = {
    dialoguetitle: {
      fontFamily: 'Montserrat',
      fontSize: 24
    },
    overlayStyle: {
      opacity: .2
    }
  }


// Home Page
const Home = props => {

  // buttons for the modal
  const actions = [
    <FlatButton
      label="Add More Songs"
      primary={true}
      onClick={() => props.handleClose()}
      style={{fontSize: 16, color: '#5A66E3', fontFamily: 'Montserrat', height: 60, width: 200, border: '1px solid #5A66E3' }}
    />,
    <FlatButton
      backgroundColor={'#5A66E3'}
      label="View My Playlist"
      primary={true}
      onClick={() => props.handlePageChange('Playlist')}
      style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', marginLeft: 10, height: 60, width: 200 }}
    />,
  ];

 return(

  <div>
    <div style={{
      backgroundImage: 'url(https://s10.postimg.org/hvq64sq1l/search-background.jpg)',
      width: "100%",
      backgroundSize: 'cover',
      marginBottom: 50
    }}>
      <h3 style={{
        marginTop: 0,
        paddingTop: 20,
        color: 'white',
        textAlign: 'center'
      }}>
        Hey there, {props.userData.userName ? props.userData.userName : props.userData.userID}
      </h3>

    <div style={{margin: '0 auto', display: 'block', textAlign: 'center'}}>

      <form>

      <DropDownMenu value={props.searchOption} onChange={props.handleSearchOption}>
        <MenuItem value={'title'} primaryText="Title" />
        <MenuItem value={'artist'} primaryText="Artist" />
        <MenuItem value={'album'} primaryText="Album" />
      </DropDownMenu>

      <TextField
        className="search-field"
        underlineShow={false}
        hintText="Search for a song..."
        name="query"
        value={props.query}
        onChange={props.handleInputChange}
        style={{
          backgroundColor: '#FFFFFF',
          height: 60,
          fontSize: 20,
          fontFamily: 'Montserrat',
          width: '50%'
        }}
      />

       <button
        className="button-search"
        onClick={props.handleFormSubmit}>
        Search
      </button>

      </form>
    </div>

  </div>

  <div className="tableDiv"
  style={{
          marginBottom: 100
      }}>
    {props.tracks.length ? (
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
        }}>
          {props.tracks.map((track, index) => {
            return (
              <TableRow key={track.trackID} selected={props.isSelected(index)} >

                <TableRowColumn style={{fontSize: 16, width: 30}}>

                  <IconButton
                    style={{padding: 0, width: 0, height: 0}}
                    disabled={track.trackURL === null ? true : false}
                    tooltip={track.trackURL === null ? 'Not Available' : false}
                    tooltipPosition='bottom-right'
                    onClick={() => props.playTrack(track.trackURL, track.trackID)}
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
                      backgroundColor={props.savedTracks.findIndex(x => x.trackID === track.trackID) == -1 ? '#5A66E3' : '#ACAEB2'}
                      label={props.savedTracks.findIndex(x => x.trackID === track.trackID) == -1 ? "Add Song" : "Added"}
                      disabled={props.savedTracks.findIndex(x => x.trackID === track.trackID) == -1 ? false : true}
                      onClick={() => props.handleSaveTrack(track)}
                      style={{ float: 'right',  fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', width: 112 }} />
                    <Dialog
                      title="Song Added"
                      titleStyle={style.dialoguetitle}
                      overlayStyle={style.overlayStyle}
                      actions={actions}
                      modal={false}
                      open={props.open}
                      onRequestClose={props.handleClose}
                    >
                      <p style={{fontFamily: 'Montserrat', fontSize: 18 }}>Would you like to keep adding songs or view your playlist?</p>
                    </Dialog>
                  </div>
                </TableRowColumn>
              </TableRow>
            )
          })}
        </TableBody>
        </Table>
        )
        : ( <div style={{ margin: '0 auto', marginTop: 80, display: 'block', textAlign: 'center', maxWidth: 600, color: '#454448' }}>
                <img style={{ width: 150 }} src='https://s17.postimg.org/vobidfu3z/start-searaching.png' alt="Start Searching" />
                {props.noSongFound ? (
                  <h2 style={{ fontFamily: 'Montserrat' }}>Sorry, that song does not exist! Please search for another song.</h2>
                ):(
                  <h2 className="empty-state-text" style={{ fontFamily: 'Montserrat' }}>Start by searching for a song. Then click “Add Song” to begin curating your playlist.</h2>
                )}
            </div>
          )}
        </div>
      </div>
      )}

export default Home;

