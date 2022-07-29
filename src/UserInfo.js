import React, { Component } from 'react';
import axios from "axios"

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      cpUrl: "",
      response: "",
      status: ""
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
      this.setState({ name: userInfo.name, email: userInfo.email, id: userInfo.sub })
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ cpUrl: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ response: "", status: "" });

    try {
      const response = await axios.get(`https://wani.productnation.in/api/v1/token/pass-waniAppToken?cpUrl=${this.state.cpUrl}`, {
        headers: {
          Authorization: `Bearer ${this.props.keycloak.token}`
        },
      })

      console.log(response)
      this.setState({ response: response.status === 200 ? response.data.paymentUrl : JSON.stringify(response.data), status: response.status });

    } catch (error) {
      this.setState({ response: JSON.stringify(error), status: error.status || 400 });

    }
  }


  render() {
    return (
      <div className="UserInfo">
        <p>Name: {this.state.name}</p>
        <p>Email: {this.state.email}</p>
        <p>ID: {this.state.id}</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Cp Url:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>Response: {this.state.response}</p>
        <p>Status: {this.state.status}</p>
        <p>{this.state.status.toString() === "200" ? "Congratulations you are WANI compliant" : this.state.status.toString() === "" ? "" : "Your Captive Portal Url is not wani compliant"}</p>

      </div>
    );
  }
}
export default UserInfo;
