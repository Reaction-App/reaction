import React, { Component } from "react";
import API from "../../utils/API";
import "./Saved.css";

class Saved extends Component {
  // Initial state
  state = {
    savedArticles: [],
    snippet: "",
    headline: "",
    pubDate: "",
    url: ""
  };


  componentDidMount() {

    // Load articles from DB on page load
    this.loadArticles();

  }


  loadArticles = () => {

    // Load articles from DB
    API.getArticles()
      .then(res =>
        this.setState({ savedArticles: res.data, headline: "", snippet: "", pubDate: "", url: "" })
      )
      .catch(err => console.log(err));
  };

  handleDeleteArticle = id => {

    // delete an article when delete button is clicked
    console.log("delete button clicked");
    console.log(id);

    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
      	<div className="panel panel-default">
          <div className="panel-heading text-center">
            <h2>Saved Articles</h2>
          </div>
          <div className="panel-body">
            {this.state.savedArticles.length ? (
              <ul className="list-group">
                {this.state.savedArticles.map(article => {
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
            ) : (<h1 className="text-center">No articles saved</h1>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Saved;