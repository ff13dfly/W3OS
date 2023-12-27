import { Row, Col } from "react-bootstrap";

function Body() {
    const size = [12];

    return (
        <Row>
            <Col lg={size[0]} xl={size[0]} xxl={size[0]}>
                Body here
            </Col>
        </Row>
    );
}

export default Body;