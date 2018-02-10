import React from "react";
//import "/home.css";

// Material UI components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
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

// import {
//   cyan500, cyan700,
//   pinkA200,
//   grey100, grey300, grey400, grey500,
//   white, darkBlack, fullBlack,
// } from 'material-ui/styles/colors';

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
    {props.userData && props.userData.userName ? (
      <h3 style={{
        marginTop: 0,
        paddingTop: 20,
        color: 'white',
        textAlign: 'center'
      }}>
        Hey there, {props.userData.userName}</h3>
    )
    : (<h3 style={{
      marginTop: 0,
      paddingTop: 20,
      color: 'white',
      textAlign: 'center'
    }}>
      Hey There, {props.userData.userID}</h3>)}

    <div style={{margin: '0 auto', display: 'block', textAlign: 'center'}}>
      <TextField
        underlineShow={false}
        hintText="Enter Track Name..."
        name="query"
        value={props.query}
        onChange={props.handleInputChange}
        style={{
          backgroundColor: '#FFFFFF',
          display: 'inline-block',
          marginBottom: 60,
          width: "50%",
          paddingLeft: 10,
          height: 59,
          border: 0,
          fontSize: 20,
          fontFamily: 'Montserrat',
        }}
      />

       <button
        onClick={props.handleFormSubmit}
        style={{
        padding:'20px 50px',
        fontSize:'16px',
        margin:'0 auto',
        textAlign: 'center',
        display: 'inline-block',
        textTransform: 'uppercase',
        backgroundColor: '#5A66E3',
        color: '#FFFFFF',
        fontWeight: 'bold',
        letterSpacing: 2,
        border: 0,
        cursor: 'pointer',
        marginTop: 0,
        marginBottom: 20
        }}>
        Search
      </button>
    </div>
  </div>

  <div>
    {props.tracks.length ? (
      <Table
        onRowSelection={props.handleRowSelection}
        style={{
          maxWidth: '80%',
          margin: '0 auto',
          backgroundColor: '#F7F9FF',
          padding: 20,
          fontFamily: 'Montserrat',
      }}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
          <TableRow >
            <TableHeaderColumn style={{fontSize: 20}}></TableHeaderColumn>
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
                <TableRowColumn style={{fontSize: 16}}>
                 
                  <IconButton 
                    style={{padding: 0, width: 0, height: 0}} 
                    disabled={track.trackURL === null ? true : false} 
                    tooltip={track.trackURL === null ? 'Not Available' : false} 
                    onClick={() => props.playTrack(track.trackURL)}
                  >
                    <FontIcon className="material-icons">
                    {props.currentSongPlayingUrl === track.trackURL && props.songPlaying === true ? "play_circle_filled" : "play_circle_outline"}
                    </FontIcon>
                  </IconButton>


                </TableRowColumn>
                <TableRowColumn style={{fontSize: 16}}>{track.trackName}</TableRowColumn>
                <TableRowColumn style={{fontSize: 16}}>{track.artist}</TableRowColumn>
                <TableRowColumn style={{fontSize: 16}}>{track.album}</TableRowColumn>
                <TableRowColumn>
                  <div>
                    <FlatButton
                      backgroundColor={'#5A66E3'}
                      label="Add Song" onClick={() => props.handleSaveTrack(track)}
                      style={{ float: 'right',  fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat' }} />
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
        : ( <div style={{ margin: '0 auto', marginTop: 80, display: 'block', textAlign: 'center', maxWidth: 500 }}>
                <img style={{ width: 150 }} src='https://s17.postimg.org/vobidfu3z/start-searaching.png' alt="Start Searching" />
                <h2 style={{ fontFamily: 'Montserrat' }}>Start by searching for a song. Then click “Add” to begin curating your playlist.</h2>
            </div>
          )}
        </div>
      </div>
      )}

export default Home;

