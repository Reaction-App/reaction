import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


const ImportModal = props => {

  const items = {};
  props.spotifyPlaylists.forEach((playlist) => {
    return <MenuItem value={playlist.name} key={playlist.id} primaryText={`${playlist.name}`} />
  })

  
  const style = {
    dialoguetitle: {
      fontFamily: 'Montserrat',
      fontSize: 24
    },
    overlayStyle: {
      opacity: .2
    },
  }

  const actions = [
    <FlatButton
      className="modal-button modal-outline"
      label="Cancel Import"
      primary={true}
      onClick={() => props.closeImportPlaylistModal()}
      style={{fontSize: 16, color: '#5A66E3', fontFamily: 'Montserrat', height: 60, marginLeft: 5, marginRight: 5, width: 200, border: '1px solid #5A66E3' }}
    />,
    <FlatButton
      className="modal-button"
      backgroundColor={'#5A66E3'}
      label="Import Spotify Playlist"
      primary={true}
      onClick={() => props.handlePageChange('Playlist')}
      style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', marginLeft: 5, marginRight: 5, height: 60, width: 200 }}
    />,
  ];

  return (

    <Dialog
      title="Import Spotify Playlist"
      titleStyle={style.dialoguetitle}
      overlayStyle={style.overlayStyle}
      actions={actions}
      modal={false}
      open={props.importPlaylistModalOpen}
      onRequestClose={props.closeImportPlaylistModal}
    >
    <p style={{fontFamily: 'Montserrat', fontSize: 18 }}>Choose a Spotify playlist to import to Reaction Radio</p>
    <DropDownMenu 
      maxHeight={300} 
      // value={this.state.value} 
      onChange={props.getSpotifyPlaylistTracks()}
    >
      {items}

    </DropDownMenu>
    </Dialog>
  );
  }

export default ImportModal;
