import React from "react";
import Home from "./pages/Home";
import Saved from "./pages/Saved";
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
        <Route exact path="/saved" component={Saved} />
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  </Container>

export default App;

