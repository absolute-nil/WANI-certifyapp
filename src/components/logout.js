import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Logout extends Component {

  logout() {
    this.props.history.push('/');
    this.props.keycloak.logout();
    this.props.toggleAuthentication(null);
  }

  render() {
    return (
      <button className="buttonToLink" onClick={() => this.logout()}>
        Logout
      </button>
    );
  }
}
export default withRouter(Logout);
