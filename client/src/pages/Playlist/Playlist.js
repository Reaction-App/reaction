import React, { Component } from "react";
import API from "../../utils/API";
import "./Playlist.css";

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
      	<div className="panel panel-default">
          <div className="panel-heading text-center">
            <h2>Playlist</h2>
          </div>
          <div className="panel-body">
            {this.state.savedTracks.length ? (
              <ul className="list-group">
                {this.state.savedTracks.map(article => {
                  return (
                  <li className="list-group-item" key={article._id}>
                    <p><strong>{article.headline}</strong></p>
                    <p>{article.snippet}</p>
                    <p>Publication Date: {article.pubDate}</p>
                    <a rel="noreferrer noopener" href={article.url} target="_blank">Go to article</a>
                    <button className="btn btn-danger" onClick={() => this.handleDeleteArticle(article._id)}>Delete</button>
                  </li>
                  )
                })}
              </ul>
            ) : (<h1 className="text-center">No tracks in this playlist.</h1>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;