import React from "react";
import Home from "./pages/Home";
import Playlist from "./pages/Playlist";
import LoginPage from "./pages/LoginPage";
import { Container } from "./components/Grid";
import Nav from "./components/Nav";
import AppContainer from "./components/AppContainer";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

// Material-UI
// MuiThemeProvider provides a couple of basic themes e.g. color scheme
// MyAwesomeReactComponent is an example component
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const App = () => (
  
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>

  <Container>
    <Router>
      <Switch>
        <Route path="/home" component={AppContainer}/>
        <Route path="/" component={LoginPage}/>
      </Switch>
    </Router>
  </Container>

  </ MuiThemeProvider>

);

export default App;

