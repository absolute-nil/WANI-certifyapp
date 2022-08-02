import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Secured from './page/Secured';
import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Landing from './page/Landing';
import UserInfo from './components/user-Info';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      keycloak: null
    }

    this.toggleAuthentication = this.toggleAuthentication.bind(this);

  }

  toggleAuthentication(keycloak) {
    this.setState({ loggedIn: !this.state.loggedIn, keycloak: keycloak });

  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Header loggedIn={this.state.loggedIn} toggleAuthentication={this.toggleAuthentication} keycloak={this.state.keycloak} />
          <br />
          <Route exact path="/" component={Landing} />
          <Route path="/secured" component={(props) => <Secured {...props} toggleAuthentication={this.toggleAuthentication} />} />
        </Container>
      </BrowserRouter>
    );
  }
}
export default App;
