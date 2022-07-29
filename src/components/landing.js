import { Col, Row, Stack } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Landing() {
  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <img src="https://hyais.com/wp-content/uploads/2021/11/WANI2.png" width="50%"></img>
        <Container>
          <h1>Introduction of PM-WANI Framework</h1>
          <p>
            <strong>The Union Cabinet headed by Prime Minister Shri Narendra Modi approved the proposal of Department of Telecom (DoT) to proliferate Broadband through Public Wi-Fi networks under the framework of the Prime Minister’s Wi-Fi Access Network Interface (PM-WANI) on 9th December 2020.</strong>
            This framework takes forward the goal of National Digital Communications Policy, 2018 (NDCP) of creating a robust digital communications infrastructure. The PM-WANI framework envisages provision of Broadband through Public Wi-Fi Hotspot providers. It will consist of elements such as Public Data Office (PDO), Public Data Office Aggregator (PDOA), App Provider and Central Registry.
          </p>
          <h1>Importance of PM-WANI Framework</h1>
          <strong>"To facilitate ease of doing business and encourage local shops and small establishments to become Wi-Fi providers, it has been approved that the last-mile Public Wi-Fi providers require no license, no registration and will not need to pay any fees to DoT."</strong>
          <p>In fact, PDOAs, who will aggregate the last-mile providers will also not require any license. These PDOAs will only have to register, for which no fees will be charged. The registration process will be completed within 7 working days of the receipt of applications.

            PM-WANI framework will also encourage App Providers who will offer services for registering and authenticating users. It is expected that with Public Wi-Fi Broadband, the user experience and Quality of Service for Broadband will be improved significantly. This service will be specially useful in rural areas where Public Wi-Fi Hotspots are also being created under BharatNet.Proliferation of Public Wi-Fi Hotspots will lead to increased employment for small and micro entrepreneurs, and provide them with an additional source of income. The telecom and internet service providers will also benefit due to the sale of bandwidth to PDOs.</p>
          <br />
        </Container>
      </Stack>
    </Container>
  );
}

export default Landing;