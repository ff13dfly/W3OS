import { Row, Col, Image } from "react-bootstrap";
import { useState,useEffect } from "react";
import RUNTIME from "../lib/runtime";
import tools from "../lib/tools";

function GroupNick(props) {
  const size = {
    row: [12],
    opt: [6,6],
  };
  const group=props.id;

  let [info, setInfo] = useState("");
  let [disable, setDisalbe] = useState(true);


  const self = {
    change: (ev) => {
      
    },
  };

  useEffect(() => {
    console.log(group);
  }, []);

  return (
    <Row>
      <Col className="pt-2 pb-2 text-secondary" xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        <input type="text" className="form-control" onChange={(ev)=>{
          self.change(ev);
        }}/>
      </Col>
      <Col xs={size.opt[0]} sm={size.opt[0]} md={size.opt[0]} lg={size.opt[0]} xl={size.opt[0]} xxl={size.opt[0]}>
        {info}
      </Col>
      <Col className="text-end" xs={size.opt[1]} sm={size.opt[1]} md={size.opt[1]} lg={size.opt[1]} xl={size.opt[1]} xxl={size.opt[1]}>
        <button disabled={disable} className="btn btn-md btn-primary" onClick={(ev) => {
          self.clickAdd();
        }}>Set Group Name</button>
      </Col>
    </Row>
  );
}
export default GroupNick;
