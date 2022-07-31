import React, { Component } from 'react';
import { Stack, Container } from 'react-bootstrap';
import Featured from '../components/featured';
import WaniLinks from '../components/wani-links';

function Landing() {
  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <Container>
          <h2>What does this platform do?</h2>
          <p>
            This platform will enable you (PDOA) to check your PM-WANI compliance. The verification occurs by checking if your captive portal correctly encrypts the waniapptoken and passes it to the respective app provider backend's auth URL. To verify your PDOA login/ register to the portal and enter your captive portal URL in the input box and click submit; Post this, you will see the status of your WANI compliance.
          </p>
        </Container>
        <WaniLinks />
      </Stack>
      <br />
      <h2>Featured</h2>
      <Featured />
      <br />
      <br />
    </Container>
  );
}

export default Landing;