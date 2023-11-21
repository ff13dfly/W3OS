import { Row, Col } from "react-bootstrap";

import Chat from "./chat";
import Thumbnail from "./thumbnail";

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
        props.page(<Chat address={acc} height={700}/>,acc);
      },300);
    },
  }
  //const list=["a_0"];
  //const list=["a_0","a_1",];
  //const list=["a_0","a_1","a_2"];
  //const list=["a_0","a_1","a_2","a_3"];
  const list=["a_0","a_1","a_2","a_3","a_4"];
  //const list=["a_0","a_1","a_2","a_3","a_4","a_5"];
  //const list=["a_0","a_1","a_2","a_3","a_4","a_5","a_6"];
  //const list=["a_0","a_1","a_2","a_3","a_4","a_5","a_6","a_7"];
  //const list=["a_0","a_1","a_2","a_3","a_4","a_5","a_6","a_7","a_8"];
  return (
    <Row className="pt-2 pb-2" onClick={(ev)=>{
      self.click();
    }}>
      <Col  className="text-end" xs={size.content[0]} sm={size.content[0]} md={size.content[0]}
        lg={size.content[0]} xl={size.content[0]} xxl={size.content[0]}>
        <Thumbnail list={list}  group={"string"}/>
      </Col>
      <Col xs={size.content[1]} sm={size.content[1]} md={size.content[1]}
        lg={size.content[1]} xl={size.content[1]} xxl={size.content[1]}>
      <Row>
        <Col>Group Name</Col>
        <Col>Latest message</Col>
       </Row>
      </Col>
    </Row>
  );
}
export default TalkingGroup;
