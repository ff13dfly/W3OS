import { Row, Col } from "react-bootstrap";

import Trend from "../system/trend";

function Announce(props) {
  const size ={
    row:[12],
  }

  const self = {
    click: (ev) => {
      console.log("Announce clicked.");
    },
  };

  return (
    <Row className="pt-2 pb-2" onClick={(ev)=>{
      self.click();
    }}>
      <Col className="text-warning" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
        lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          {props.content}
      </Col>
    </Row>
  );
}
export default Announce;
