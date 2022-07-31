import ListGroup from 'react-bootstrap/ListGroup';

function WaniLinks() {
  return (
    <ListGroup>
      <ListGroup.displayName><h3>Useful Links</h3></ListGroup.displayName>
      <ListGroup.Item>
        <a href="https://dot.gov.in/sites/default/files/2020_12_11%20WANI%20Framework%20Guidelines.pdf?download=1">Wi-Fi ACCESS NETWORK INTERFACE (WANI) and Framework and Guidelines for Registration </a>

      </ListGroup.Item>
      <ListGroup.Item>
        <a href="https://www.cdot.in/cdotweb/web/product_category.php?lang=en&catId=7">C-DOT PM-WANI </a>

      </ListGroup.Item>
      <ListGroup.Item>
        <a href="https://www.cdot.in/cdotweb/assets/docs/products/pmwani/AppProviderBooklet.pdf">How to become an app provider </a>

      </ListGroup.Item>
      <ListGroup.Item>
        <a href="https://www.cdot.in/cdotweb/assets/docs/products/pmwani/PDOABooklet.pdf">How to become a PDOA </a>

      </ListGroup.Item>
      <ListGroup.Item>
        <a href="https://www.cdot.in/cdotweb/assets/docs/products/pmwani/PDOBooklet.pdf">How to become a PDO </a>

      </ListGroup.Item>

      <ListGroup.Item>
        <a href="https://pmwani.gov.in/wani">PM-WANI Central Registry </a>

      </ListGroup.Item>

      <ListGroup.Item>
        <a href="https://dot.gov.in/sites/default/files/Annexure%20-%20II%20PM-WANI%20Framework%20Architecture%20and%20Specifications%20%28V2_0%29.pdf?download=1">PM-WANI framework and architecture </a>

      </ListGroup.Item>
    </ListGroup>
  );
}

export default WaniLinks;