import { Navbar, Container, Row, Col } from "react-bootstrap";
import RUNTIME from "../lib/runtime";

const UI=RUNTIME.getUI();
function SystemHeader({ setAnimation, title}) {
  const size = [3, 6, 3];

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Row style={{ width: "100%", margin: "0 auto" }}>
          <Col
            xs={size[0]}
            sm={size[0]}
            md={size[0]}
            lg={size[0]}
            xl={size[0]}
            xxl={size[0]}
            style={{ paddingTop: "6px" }}
          >
            <Navbar.Brand href="#">
              W<span className="logo">3</span>OS
            </Navbar.Brand>
          </Col>
          <Col
            xs={size[1]}
            sm={size[1]}
            md={size[1]}
            lg={size[1]}
            xl={size[1]}
            xxl={size[1]}
            style={{ paddingTop: "10px" }}
            className="text-center"
          >
            {title}
          </Col>
          <Col
            xs={size[2]}
            sm={size[2]}
            md={size[2]}
            lg={size[2]}
            xl={size[2]}
            xxl={size[2]}
            className="text-end pb-2"
            style={{ paddingTop: "10px" }}
          >
            <span
              className="close"
              onClick={(ev) => {
                setAnimation("ani_scale_out");
                setTimeout(() => {
                  UI.page("");
                }, 300);
              }}
            >
              <button className="btn btn-sm btn-default">X</button>
            </span>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default SystemHeader;