import Carousel from 'react-bootstrap/Carousel';
import YoutubeEmbed from './youtube-embed';

function Featured() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://hyais.com/wp-content/uploads/2021/11/WANI2.png"
          alt="PM WANI intro picture"
        />
        <br />
        <h3>PM-WANI</h3>
        <p>Prime Minister’s Wi-Fi Access Network Interface</p>
        <p>
          <strong>The Union Cabinet headed by Prime Minister Shri Narendra Modi approved the proposal of Department of Telecom (DoT) to proliferate Broadband through Public Wi-Fi networks under the framework of the Prime Minister’s Wi-Fi Access Network Interface (PM-WANI) on 9th December 2020.</strong>
        </p>
        <p>
          This framework takes forward the goal of National Digital Communications Policy, 2018 (NDCP) of creating a robust digital communications infrastructure. The PM-WANI framework envisages provision of Broadband through Public Wi-Fi Hotspot providers. It will consist of elements such as Public Data Office (PDO), Public Data Office Aggregator (PDOA), App Provider and Central Registry.
        </p>
      </Carousel.Item>
      <Carousel.Item>
        <YoutubeEmbed embedId="05AnNEGPpd0" />
      </Carousel.Item>
      <Carousel.Item>
        <YoutubeEmbed embedId="C1RqBfi2Nm0" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Featured;