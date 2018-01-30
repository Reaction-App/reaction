import React from "react";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import LoginPage from "./pages/LoginPage";
import { Container } from "./components/Grid";
import Nav from "./components/Nav";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

const App = () =>
  
  <Container>
    <Nav />
    <Router>
      <Switch>
        <Route exact path="/playlist" component={Playlist} />
        <Route path="/home" component={Home}/>
        <Route path="/" component={LoginPage}/>
      </Switch>
    </Router>
  </Container>

export default App;

