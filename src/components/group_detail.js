import { Row, Col } from "react-bootstrap";
import { useState,useEffect } from "react";
import RUNTIME from "../lib/runtime";
import IMGC from "../open/IMGC";

function GroupDetail(props) {
  const size = {
    row: [12],
    opt: [6,6],
  };
  const group=props.id;

  let [nick, setNick]=useState("");
  let [create,setCreate]=useState("");
  let [list,setList]=useState([]);
  let [founder,setFounder]=useState("");

  const self = {
    change: (ev) => {
      
    },
  };

  useEffect(() => {
    RUNTIME.getAccount((acc) => {
      IMGC.local.view(acc.address,group,(res)=>{
        console.log(res);
        const data=res.more;
        setNick(!data.nick?"no nickname yet":data.nick);

        const dt=new Date(data.create);
        setCreate(dt.toDateString());

        setList(data.group);
        setFounder(data.founder);
      });
    });
  }, []);

  return (
    <Row>
      <Col className="" xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        Group {nick}. Created at {create}
      </Col>
      <Col className="pt-4" xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        <h6>Members:</h6>  
      </Col>
      {list.map((row, index) => (
        <Col key={index} xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          {row} 
        </Col>
      ))}
      <Col className="pt-4" xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        <h6>Founer:</h6>  
      </Col>
      <Col xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        {founder}
      </Col>
    </Row>
  );
}
export default GroupDetail;
