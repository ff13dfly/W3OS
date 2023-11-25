import { Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";

function GroupOpt(props) {
  const size = {
    row: [12],
    list: [1, 3, 8],
  };

  let [hidden, setHidden] = useState(true);

  const self = {
    click: () => {
      setHidden(!hidden);
    }
  }

  useEffect(() => {

  }, []);

  return (
    <div className="fixOpts">
      <Row>
        <Col xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
          lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          <button className="btn btn-sm btn-warning" onClick={() => {
            self.click()
          }}>...</button>
        </Col>
        <Col hidden={hidden} className="pt-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
          lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          <Row className="pt-2" style={{background:"#EEFFEE"}}>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
              <button className="btn btn-sm btn-primary">leave</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
              <button className="btn btn-sm btn-primary">add</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
              <button className="btn btn-sm btn-primary">Information</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
              <button className="btn btn-sm btn-primary">More</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default GroupOpt;
