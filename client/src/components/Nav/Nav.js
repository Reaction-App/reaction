import React from "react";

const Nav = () =>
  <nav className="navbar navbar-default navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <a href="/" className="navbar-brand">
          NYT Articles
        </a>
      </div>

      <div>
        <ul className="nav navbar-nav">
          <li><a href="/">Home</a></li>
          <li><a href="/saved">Saved</a></li>
        </ul>
      </div>
    </div>
  </nav>;

export default Nav;