import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Secured from './Secured';
import './App.css';
import { Container } from 'react-bootstrap';
import Header from './components/header';
import Landing from './components/landing';
import UserInfo from './UserInfo';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Container>
          <Header />
          <br />
          <Route exact path="/" component={Landing} />
          <Route path="/secured" component={Secured} />
        </Container>
      </BrowserRouter>
    );
  }
}
export default App;
