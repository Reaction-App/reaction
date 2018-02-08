import React, { Component } from "react";
import Nav from "../Nav";
import Home from "../../pages/Home";
import Playlist from "../../pages/Playlist";
import LoginPage from "../../pages/LoginPage";

class AppContainer extends Component {
  state = {
    currentPage: "Home"
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  renderPage = () => {
    if (this.state.currentPage === "Home") {
      return <Home />;
    } else if (this.state.currentPage === "Playlist") {
      return <Playlist />;
    } else {
      return <LoginPage />;
    }
  };

  render() {
    return (
      <div>
        <Nav
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
        {this.renderPage()}
      </div>
    );
  }
}

export default AppContainer;
