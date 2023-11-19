import { Row, Col, Image } from "react-bootstrap";

import Chat from "./chat";
import Trend from "../system/trend";

function TalkingGroup(props) {

  const address = props.address;
  const funs=props.funs;

  const size = {
    content: [2, 10],
    row:12,
  };

  const self={
    click:(ev)=>{
      //console.log(`Click to open the talking page`);
      setTimeout(()=>{
        const acc="5EqaE823bX7ujSuj82B27BERuaQunGu6zzVbFv6LDDmZZB6v"
        props.page(<Chat address={acc}/>,acc);
      },300);
    },
  }


  return (
    <Row className="pt-2 pb-2" onClick={(ev)=>{
      self.click();
    }}>
      <Col
        className="text-end"
        xs={size.content[0]}
        sm={size.content[0]}
        md={size.content[0]}
        lg={size.content[0]}
        xl={size.content[0]}
        xxl={size.content[0]}
      >
         <Image
          className="to_icon"
          src={`https://robohash.org/${address}.png`}
          rounded
          width="100%"
        />
      </Col>
      <Col
        xs={size.content[1]}
        sm={size.content[1]}
        md={size.content[1]}
        lg={size.content[1]}
        xl={size.content[0]}
        xxl={size.content[1]}
      >
      <Row>
        <Col>Group Name</Col>
        <Col>Latest message</Col>
       </Row>
      </Col>
    </Row>
  );
}
export default TalkingGroup;
