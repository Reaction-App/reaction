import React from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const SearchPageModal = props => {

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
      label="Add More Songs"
      primary={true}
      onClick={() => props.handleClose()}
      style={{fontSize: 16, color: '#5A66E3', fontFamily: 'Montserrat', height: 60, marginLeft: 5, marginRight: 5, width: 200, border: '1px solid #5A66E3' }}
    />,
    <FlatButton
      className="modal-button"
      backgroundColor={'#5A66E3'}
      label="View My Playlist"
      primary={true}
      onClick={() => props.handlePageChange('Playlist')}
      style={{fontSize: 16, color: '#FFFFFF', fontFamily: 'Montserrat', marginLeft: 5, marginRight: 5, height: 60, width: 200 }}
    />,
  ];

  return (

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
  );
  }

export default SearchPageModal;
