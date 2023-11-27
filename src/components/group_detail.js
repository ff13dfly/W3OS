import { Row, Col, Image } from "react-bootstrap";
import { useState,useEffect } from "react";
import RUNTIME from "../lib/runtime";
import IMGC from "../open/IMGC";

function GroupDetail(props) {
  const size = {
    row: [12],
    opt: [6,6],
  };
  const group=props.id;

  const self = {
    change: (ev) => {
      
    },
  };

  useEffect(() => {
    RUNTIME.getAccount((acc) => {
      IMGC.local.view(acc.address,group,(res)=>{
        console.log(res);
      });
    });
  }, []);

  return (
    <Row>
      <Col className="pt-2 pb-2 text-secondary" xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        <small>Functions</small>
      </Col>
    </Row>
  );
}
export default GroupDetail;
