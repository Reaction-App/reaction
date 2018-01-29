import React, { Component } from "react";
import {Input, FormBtn} from "../../components/Form";
import API from "../../utils/API";
import "./Home.css";

class Home extends Component {
  // Initial state
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };

  handleInputChange = event => {
    // get the name and value from event.target
    // set state with new value
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {

    // When the form is submitted get new articles
    event.preventDefault();

    console.log(this.state);

    const searchTerms = {
      topic: this.state.topic,
      startYear: this.state.startYear,
      endYear: this.state.endYear
    }

    // get new articles from the NYT site and set state with results
    API.getNewArticles(searchTerms)
      .then(res => {this.setState({ articles: res.data.docs })
          console.log("new articles obtained");
          console.log(this.state.articles);
        })
      .catch(err => console.log(err));
  };

  handleSaveArticle = article => {

    // save an article when save button is clicked
    API.saveArticle({
        headline: article.headline.main,
        snippet: article.snippet,
        pubDate: article.pub_date,
        url: article.web_url
      })
        .then(res => alert("article saved"))
        .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <h2>New York Times Article Search</h2>
          </div>
          <div className="panel-body">

            <form>        
              <Input
                name="topic"
                value={this.state.topic}
                onChange={this.handleInputChange}
                placeholder="Topic" />
              
              <Input
                name="startYear"
                value={this.state.startYear}
                onChange={this.handleInputChange}
                placeholder="Start Year" />
              
              <Input
                name="endYear"
                value={this.state.endYear}
                onChange={this.handleInputChange}
                placeholder="End Year" />

              <FormBtn onClick={this.handleFormSubmit}>Search</FormBtn>

            </form>

          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading text-center">
            <h2>Results</h2>
          </div>
          <div className="panel-body">
            {this.state.articles.length ? (
              <ul className="list-group">
                {this.state.articles.map(article => {
                  return (
                  <li className="list-group-item" key={article._id}>
                    <p><strong>{article.headline.main}</strong></p>
                    <p>{article.snippet}</p>
                    <p>Publication Date: {article.pub_date}</p>
                    <a rel="noreferrer noopener" href={article.web_url} target="_blank">Go to article</a>
                    <button className="btn btn-primary" onClick={() => this.handleSaveArticle(article)}>Save</button>
                  </li>
                  )
                })}
              </ul>
            ) : (<h1 className="text-center">No articles, try a new search!</h1>)}
          </div>
        </div>

      </div>
    )
  }
}

export default Home;
