import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import UserInfo from '../components/user-Info';

class Secured extends Component {

  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false };
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({ onLoad: 'login-required' }).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated })
    })
    if (this.state.authenticated) this.props.toggleAuthentication(keycloak)
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <>
          <UserInfo keycloak={this.state.keycloak} />

        </>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;
