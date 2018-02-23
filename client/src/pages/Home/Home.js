import React from "react";
import './home.css';
import SearchModal from "../../components/SearchModal";
import ImportModal from "../../components/ImportModal";

// Material UI components
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
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

// Home Page
const Home = props => {

  return(

    <div>

      <div style={{
        backgroundImage: 'url(https://s10.postimg.org/hvq64sq1l/search-background.jpg)',
        width: "100%",
        backgroundSize: 'cover',
        marginBottom: 50,
        paddingTop: 80
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

            <SelectField
              className="search-drop-down"
              value={props.searchOption}
              onChange={props.handleSearchOption}
              style = {{backgroundColor:'#FFFFFF', height: 60}}
              underlineShow={false}
            >
              <MenuItem value={"title"} primaryText="Title" />
              <MenuItem value={"artist"} primaryText="Artist" />
              <MenuItem value={"album"} primaryText="Album" />
            </SelectField>

            <TextField
              className="search-field"
              underlineShow={false}
              hintText={props.searchHintText}
              name="query"
              value={props.query}
              onChange={props.handleInputChange}
              style={{
                backgroundColor: '#FFFFFF',
                height: 60,
                fontSize: 20,
                fontFamily: 'Montserrat',
                width: '35%'
              }}
            />

            <button
              className="button-search"
              onClick={props.handleFormSubmit}>
              <span className="search-word">Search</span>
              <span className="search-icon"> 
                <FontIcon 
                  className="material-icons"
                  style={{fontSize: '30px'}}
                  color="#00000"
                >search
                </FontIcon>
              </span>
            </button>

          </form>

        </div>

      </div>

      <div
        className="tableDiv"
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
                        <SearchModal {...props} />
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
                      tooltip='Previous Results'
                      tooltipPosition = 'bottom-right'
                      onClick={() => props.handleSearchResultsPage(props.searchPage - 1)}
                      iconStyle={{fontSize: 60}}
                    >
                      <FontIcon 
                        hoverColor="#454448"
                        color="#5A66E3"
                        className="material-icons"
                      >
                        fast_rewind
                      </FontIcon>
                    </IconButton>
                  ) : (<div></div>)}

                  {props.tracks.length >= 10 && (props.searchPage === 1 || props.searchPage === 2) ? (
                    <IconButton
                      className ="page-button-right"
                      tooltip='More Results'
                      tooltipPosition = 'bottom-right'
                      onClick={() => props.handleSearchResultsPage(props.searchPage + 1)}
                      iconStyle={{fontSize: 60}}
                    >
                      <FontIcon 
                        hoverColor="#454448"
                        color="#5A66E3"
                        className="material-icons"
                      >
                        fast_forward
                      </FontIcon>
                    </IconButton>
                  ) : (<div></div>)}
                </TableRowColumn>
              </TableRow>
            </TableFooter>
          </Table>

        )
        : 
        ( <div style={{ margin: '0 auto', marginTop: 80, display: 'block', textAlign: 'center', maxWidth: 600, color: '#454448' }}>
            <img style={{ width: 150 }} src='https://s17.postimg.org/vobidfu3z/start-searaching.png' alt="Start Searching" />
            {props.noSongFound ? (
              <h2 style={{ fontFamily: 'Montserrat' }}>Sorry, no results found! Please try another search.</h2>
            ):
            ( <div>
              <h2 className="empty-state-text" style={{ fontFamily: 'Montserrat' }}>Start by searching for a song, artist or album. Then click “Add Song” to begin curating your playlist.</h2>
                <FlatButton 
                  label="You may also import a playlist from Spotify" 
                  style={{color: '#5f54eb', fontFamily: 'Montserrat', height: 80, lineHeight: 1}}
                  icon={<FontIcon className="material-icons">cloud_download</FontIcon>}
                  onClick={() => props.openImportPlaylistModal()}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {props.spotifyPlaylists.length ? ( 
      <ImportModal {...props}/> ) : (<div></div>)}
      <footer style={{ margin: '0 auto', display: 'block', textAlign: 'right', color: '#454448'}}>
        <IconButton
          style={{marginTop: 14, color: '#5A66E3'}}
          tooltip='Meet the Team!'
          tooltipPosition = 'top-left'
          onClick={() => props.handlePageChange('Authors')}
        >
          <FontIcon 
            style={{fontSize: '200px'}}
            color="#454448"
            hoverColor="#5A66E3"
            className="material-icons info">
              info_outline
          </FontIcon>
        </IconButton>
      </footer>
      
    </div>
  )}

export default Home;

