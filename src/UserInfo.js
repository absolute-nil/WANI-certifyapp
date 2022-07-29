import React, { Component } from 'react';
import axios from "axios"
import { Form, ListGroup, Button, Card, Accordion } from 'react-bootstrap';

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

      this.setState({ response: response.status === 200 ? response.data.paymentUrl : JSON.stringify(response.data), status: response.status });

    } catch (error) {
      this.setState({ response: JSON.stringify(error, null, 2), status: error.status || 400 });

    }
  }


  render() {
    return (
      <div className="UserInfo">
        <h3>Current User: </h3>
        <ListGroup horizontal>
          <ListGroup.Item><strong>Name:</strong> {this.state.name}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {this.state.email}</ListGroup.Item>
          <ListGroup.Item><strong>ID:</strong> {this.state.id}</ListGroup.Item>
        </ListGroup>
        <br />
        <Card body border="light" style={{ boxShadow: "2px 3px 2px 1px #A9ADB7" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicCpUrl">
              <Form.Label><h3>CP Url</h3></Form.Label>
              <Form.Control type="cpUrl" placeholder="Enter CP Url" value={this.state.value} onChange={this.handleChange} />
              <Form.Text className="text-muted">
                Enter your Captive portal url to check wether it is WANI compliant
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>

        </Card>
        <br />
        <hr style={{ "border": "3px solid blue" }} />
        <br />
        <h4 style={{ textAlign: "center" }}><strong style={{ color: (this.state.status.toString() === "200" ? "green" : "red") }}>{this.state.status.toString() === "200" ? "Congratulations you are WANI compliant!" : this.state.status.toString() === "" ? "" : "Your Captive Portal Url is not wani compliant!"}</strong></h4>
        <br />
        <hr style={{ "border": "3px solid blue" }} />
        <br />
        <h3>Response: (<strong>Status:</strong> {this.state.status})</h3>
        <pre style={{ maxHeight: "500px", overflow: "scroll", "backgroundColor": "#f8f7f8" }}>{this.state.response}</pre>
        {this.state.status.toString() === "200" ? <></> : <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Debugging</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Algorithm used for Encryption and Decryption: RSA 2048 with RSA_PKCS1_PADDING padding</li>
                <li>To handle large data encrypt in (256-11=245) chunks of data and keep appending buffer</li>
                <li>To handle large data decrypt in (256) chunks of data and keep appending</li>
                <li>Check if you are using the correct wani providers list to obtain backend verification url</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>}
        <br />
      </div>
    );
  }
}
export default UserInfo;
