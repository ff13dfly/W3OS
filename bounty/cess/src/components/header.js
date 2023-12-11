import { Navbar, Container, Row, Col } from "react-bootstrap";

function Nav(props) {
  const size = [3, 6, 3];
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#">
          <h5>ChainPhoto</h5>
        </Navbar.Brand>
        <Row>
          <Col className="text-end" hidden={true}>
            User
          </Col>
          <Col className="text-end">
            X
          </Col>
        </Row>

      </Container>
    </Navbar>
  );
}

export default Nav;