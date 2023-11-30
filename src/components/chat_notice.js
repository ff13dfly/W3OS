import { Row, Col } from "react-bootstrap";

function Notice(props) {
  const size = {
    row: [12],
  };
  return (
    <Row className="pb-2">
      <Col className="text-center" xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        {props.content}
      </Col>
    </Row>
  );
}
export default Notice;
