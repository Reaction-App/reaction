import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

  const style = {
    dialoguetitle: {
      fontFamily: 'Montserrat',
      fontSize: 24
    },
    overlayStyle: {
      opacity: .2
    },
  }

  const customContentStyle = {
    width: '62%',
    maxWidth: 'none',
  }

  const menuStyle = {
    width: '80%',
    marginRight: 10,
    verticalAlign: 'top',
    textAlign: 'left',
    fontFamily: 'Montserrat',
    color: '#5A66E3',
    paddingLeft: 20,
    fontSize: 20,
    textAlign: 'center'
  }


class ImportModal extends Component {
  state = {
    value: 1
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {

    const actions = [
      <FlatButton
        className="modal-button modal-outline"
        label="Cancel Import"
        primary={true}
        onClick={this.props.closeImportPlaylistModal}
        style={{fontSize: 16, color: '#5A66E3', fontFamily: 'Montserrat', height: 60, marginLeft: 5, marginRight: 5, width: '30%', minWidth: 250,  border: '1px solid #5A66E3' }}
      />,
      <FlatButton
        className="modal-button"
        backgroundColor={'#5A66E3'}
        label="Import Spotify Playlist"
        primary={true}
        icon={<FontIcon className="material-icons">cloud_download</FontIcon>}
        onClick={() => this.props.handlePageChange('Playlist')}
        style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', marginLeft: 5, marginRight: 5, height: 60, width: '30%', minWidth: 300}}
      />

    ,
  ];

  return (
    <Dialog
      title="Import Spotify Playlist"
      titleStyle={style.dialoguetitle}
      overlayStyle={style.overlayStyle}
      actions={actions}
      modal={false}
      contentStyle={customContentStyle}
      open={this.props.importPlaylistModalOpen}
      onRequestClose={this.props.closeImportPlaylistModal}
    >
    <p style={{fontFamily: 'Montserrat', fontSize: 18 }}>Choose a Spotify playlist to import to Reaction Radio</p>
      <DropDownMenu 
        maxHeight={300} 
        value={this.state.value} 
        onChange={this.handleChange}
        style={style.menuStyle}
      >

      {!this.props.noSpotifyPlaylistsFound ? (this.props.createPlaylistArray()) : (<div></div>)}

      </DropDownMenu>
    <p>Warning: This will delete your current Reaction Radio playlist.</p>
    </Dialog>
  );
}
}

export default ImportModal;
