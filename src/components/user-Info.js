import React, { Component } from 'react';
import axios from "axios"
import { Form, ListGroup, Button, Card, Accordion } from 'react-bootstrap';
import WaniLinks from './wani-links';

class UserInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      id: "",
      cpUrl: "",
      response: "",
      status: "",
      apMacId: "20:74:E2:40:14:B2",
      deviceMacId: "12:22:33:44:55:BA"
    };
    this.props.keycloak.loadUserInfo().then(userInfo => {
      this.setState({ name: userInfo.name, email: userInfo.email, id: userInfo.sub })
    });

    this.handleChangeCpUrl = this.handleChangeCpUrl.bind(this);
    this.handleChangeDeviceId = this.handleChangeDeviceId.bind(this);
    this.handleChangeMacId = this.handleChangeMacId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeCpUrl(event) {
    this.setState({ cpUrl: event.target.value });
  }

  handleChangeMacId(event) {
    this.setState({ apMacId: event.target.value });
  }

  handleChangeDeviceId(event) {
    this.setState({ deviceMacId: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ response: "", status: "" });

    try {
      const response = await axios.get(`/api/v1/token/pass-waniAppToken?cpUrl=${this.state.cpUrl}&apMacId=${this.state.apMacId}&deviceMacId=${this.state.deviceMacId}`, {
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
        <ListGroup horizontal>
          <ListGroup.Item><strong>Name:</strong> {this.state.name}</ListGroup.Item>
          <ListGroup.Item><strong>Email:</strong> {this.state.email}</ListGroup.Item>
        </ListGroup>
        <br />
        <Card body border="light" style={{ boxShadow: "2px 3px 2px 1px #A9ADB7" }}>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="formCpUrl">
              <Form.Label><h3>Verify PDOA</h3></Form.Label>
              <Form.Control placeholder="Enter CP Url" value={this.state.value} onChange={this.handleChange} />
              <Form.Text className="text-muted">
                Enter your Captive portal url to check whether it is WANI compliant
              </Form.Text>
            </Form.Group>
            <p>Advanced Options:</p>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formApMacId">
                <Form.Label>AP Mac Id</Form.Label>
                <Form.Control placeholder="Enter AP Mac ID" value={this.state.apMacId} onChange={this.handleChangeMacId} />
              </Form.Group>

              <Form.Group as={Col} controlId="formDeviceId">
                <Form.Label>Device Mac ID</Form.Label>
                <Form.Control placeholder="Device Mac Id" value={this.state.deviceMacId} onChange={this.handleChangeDeviceId} />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Verify
            </Button>
          </Form>

        </Card>
        <br />
        {this.state.status.toString() !== "" ? <>
          <hr style={{ "border": this.state.status.toString() === "200" ? "3px solid green" : "3px solid red" }} />
          <br />
          <h4 style={{ textAlign: "center" }}><strong style={{ color: (this.state.status.toString() === "200" ? "green" : "red") }}>{this.state.status.toString() === "200" ? "Congratulations you are WANI compliant!" : this.state.status.toString() === "" ? "" : "Your Captive Portal Url is not wani compliant!"}</strong></h4>
          <br />
          <hr style={{ "border": this.state.status.toString() === "200" ? "3px solid green" : "3px solid red" }} />
          <br />
        </> : <></>}
        {this.state.status.toString() !== "" ? <h3>Response: (<strong>Status:</strong> {this.state.status})</h3> : <></>}
        {this.state.status.toString() !== "" ? <pre style={{ maxHeight: "500px", overflow: "scroll", "backgroundColor": "#f8f7f8" }}>{this.state.response}</pre> : <></>}
        {this.state.status.toString() === "200" || this.state.status.toString() === "" ? <></> : <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Debugging</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>Algorithm used for Encryption and Decryption: RSA 2048 with RSA_PKCS1_PADDING padding</li>
                <li>To handle large data encrypt in (256-11=245) chunks of data and keep appending buffer</li>
                <li>To handle large data decrypt in (256) chunks of data and keep appending</li>
                <li>Check if you are using the correct wani providers list to obtain backend verification url</li>
              </ul>
              <p>Read more: <a href="https://dot.gov.in/sites/default/files/Annexure%20-%20II%20PM-WANI%20Framework%20Architecture%20and%20Specifications%20%28V2_0%29.pdf?download=1">PM-WANI framework and architecture </a></p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>}
        <br />
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>What should your captive portal do</Accordion.Header>
            <Accordion.Body>
              <h4>After request sent to captive portal URL with waniAppToken query</h4>
              <ul>
                <li>Extract the App Provider ID from the token prefix (string until the “|”delimiter within the token)</li>
                <li>Verify the App Provider ID against the locally cached WANI Registry &#x2192;WaniRegistry&#x2192;Appproviders&#x2192;Appprovider[id]&#x2192; and obtain authUrl for that App provider.</li>
                <li>Encrypts the waniapptoken using PDOA private key as below to create a new token wanipdoatoken. wanipdoatoken = &lt;PDOA-Id&gt;|&lt;key-Exp&gt;|&lt;base-64(RSA-Encrypt(waniapptoken))&gt;</li>
                <li>Calls the authUrl of the app provider backend by passing the signed token wanipdoatoken as part of the URL parameter. This MUST BE an https call.</li>
              </ul>
              <h4>After response has been recieved from the app provider backend auth URL</h4>
              <ul>
                <li>Decrypting the hash from signature using the public key of the App provider (that corresponds to Key→exp value from registry).</li>
                <li>Calculate the hash and verify if the hash is matching.</li>
                <li>If matching, proceed with next steps. If not, show error and allow user to disconnect and connect again (try again)</li>
                <li>After verification and wifi selection, the captive portal will send a link/ redirect to make payment (the redirect link will be shown in response above if everything works)</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <br />
      </div>
    );
  }
}
export default UserInfo;
