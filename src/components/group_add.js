import { Row, Col, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import RUNTIME from "../lib/runtime";

function GroupAdd(props) {
  const size = {
    row: [12],
    list: [3, 9],
  };

  let [address, setAddress] = useState("");
  let [disable, setDisalbe] = useState(true);

  const self = {
    change: (ev) => {
      setAddress(ev.target.value);
    },
    click: (ev) => {
      //console.log(address);
      if (!address) return false;
      RUNTIME.addContact(address, (res) => {
        if (res === true) props.fresh();
        setAddress("");
      });
    },
  };

  useEffect(() => {
    RUNTIME.getAccount((acc) => {
      if (acc && acc.address) setDisalbe(false);
    });
  }, [props.count]);

  return (
    <Row>
      <Col
        xs={size.list[0]}
        sm={size.list[0]}
        md={size.list[0]}
        lg={size.list[0]}
        xl={size.list[0]}
        xxl={size.list[0]}
      >
        AVATAR
      </Col>
      <Col
        xs={size.list[1]}
        sm={size.list[1]}
        md={size.list[1]}
        lg={size.list[1]}
        xl={size.list[1]}
        xxl={size.list[1]}
      >
        Address
      </Col>
    </Row>
  );
}
export default GroupAdd;
