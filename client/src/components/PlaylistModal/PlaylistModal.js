import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


const PlaylistModal = props => {

  const style = {
      dialoguetitle: {
        fontFamily: 'Montserrat',
        fontSize: 24
      },
      overlayStyle: {
        opacity: .2
      }
    }

  const customContentStyle = {
  width: '50%',
  maxWidth: 'none',
};

  const actions01 = [
    <FlatButton
      label="Cancel"
      className="modal-button modal-outline"
      primary={true}
      onClick={() => props.closeNameYourPlaylistModal()}
      style={{fontSize: 16, color: '#5A66E3', fontFamily: 'Montserrat', height: 60, width: 200, border: '1px solid #5A66E3' }}
    />,
    <FlatButton
      backgroundColor={'#5A66E3'}
      className="modal-button"
      label="Export to Spotify"
      primary={true}
      onClick={() => props.postPlaylistToSpotify()}
      style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', marginLeft: 10, width: 200, height: 60, 'line-height': '20px' }}
    />,
  ];

  const actions02 = [
    <FlatButton
      label="Close"
      className="modal-button modal-outline"
      primary={true}
      onClick={() => props.closePlaylistAddedModal()}
      style={{fontSize: 16, color: '#5A66E3', fontFamily: 'Montserrat', height: 60, width: 200, border: '1px solid #5A66E3' }}
    />,
    <FlatButton
      backgroundColor={'#5A66E3'}
      className="modal-button"
      label="View Spotify Playlist"
      primary={true}
      onClick={() => props.viewPlaylist()}
      style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', marginLeft: 10, height: 60, 'line-height': '20px' }}
    />,
  ];

  const focusPlaylistNameInputField = input => {
    input && input.focus();
  };


  return (

    <div>
    <Dialog
      title="Please enter a name for your playlist:"
      titleStyle={style.dialoguetitle}
      overlayStyle={style.overlayStyle}
      actions={actions01}
      modal={false}
      contentStyle={customContentStyle}
      open={props.nameYourPlaylistModalOpen}
      onRequestClose={props.closeNameYourPlaylistModal}
      >
        <TextField
          name="playlistName"
          underlineShow={false}
          value={props.playlistName}
          // defaultValue="My Reaction Radio Playlist"
          hintText="My Reaction Radio Playlist"
          onChange={props.handleInputChange}
          ref={focusPlaylistNameInputField}
        />
    </Dialog>

    <Dialog
      title="Playlist Saved!"
      titleStyle={style.dialoguetitle}
      overlayStyle={style.overlayStyle}
      actions={actions02}
      modal={false}
      open={props.playlistAddedModalOpen}
      contentStyle={customContentStyle}
      onRequestClose={props.closePlaylistAddedModal}
      >
      <p style={{fontFamily: 'Montserrat', fontSize: 18 }}>Your playlist has been exported to Spotify!</p>
    </Dialog>
    </div>

  );
  }

export default PlaylistModal;
