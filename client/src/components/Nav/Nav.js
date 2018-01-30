import React from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  title: {
    cursor: 'pointer',
  },
};

const Nav = () => (
  <AppBar
    title={<span style={styles.title}>Reaction</span>}
    iconElementRight={
      <div>
        <FlatButton label="Home" href="/" />
        <FlatButton label="Playlist" href="/playlist" />
      </div>
    }
  />
);

export default Nav;