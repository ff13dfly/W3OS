import { Row, Col } from "react-bootstrap";

function Sidebar(props) {
    const size = [12];

    return (
        <Row className="pt-4">
            {props.list.map((row, index) => (
                <Col key={index} lg={size[0]} xl={size[0]} xxl={size[0]}>
                    {row}
                </Col>
            ))}
        </Row>
    );
}

export default Sidebar;