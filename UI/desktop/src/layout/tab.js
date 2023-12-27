import { Row, Col } from "react-bootstrap";

function Tab() {
    const size = [2];

    return (
        <Row>
            <Col lg={size[0]} xl={size[0]} xxl={size[0]}>
                Tab01
            </Col>
            <Col lg={size[0]} xl={size[0]} xxl={size[0]}>
                Tab02
            </Col>
            <Col lg={size[0]} xl={size[0]} xxl={size[0]}>
                Tab03
            </Col>
        </Row>
    );
}

export default Tab;