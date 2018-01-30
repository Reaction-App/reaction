import React, { Component } from "react";
import API from "../../utils/API";

// Material UI components
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';

// Material UI styles
const styles = {
  deleteButtonStyle: {
    marginLeft: 20
  }
};

class Playlist extends Component {

  // Initial state
  state = {
    savedTracks: [],
    snippet: "",
    headline: "",
    pubDate: "",
    url: ""
  };


  componentDidMount() {

    // Load tracks from DB on page load
    this.loadTracks();

  }


  loadTracks = () => {

    // Load tracks from DB
    API.getTracks()
      .then(res =>
        this.setState({ savedTracks: res.data, headline: "", snippet: "", pubDate: "", url: "" })
      )
      .catch(err => console.log(err));
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
            <h2>Playlist</h2>
          </div>
          <div>
            {this.state.savedTracks.length ? (
              <List>
                {this.state.savedTracks.map(article => {
                  return (
                  <ListItem key={article._id}>
                    <p><strong>{article.headline}</strong></p>
                    <p>{article.snippet}</p>
                    <p>Publication Date: {article.pubDate}</p>
                    <a rel="noreferrer noopener" href={article.url} target="_blank">Go to article</a>
                    <RaisedButton
                      label="Delete"
                      onClick={() => this.handleDeleteArticle(article._id)}
                      style={styles.deleteButtonStyle}
                    />
                  </ ListItem>
                  )
                })}
              </ List>
            ) : (<h1>No tracks in this playlist.</h1>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;