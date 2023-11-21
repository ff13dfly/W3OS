import { Row, Col, Image } from "react-bootstrap";

import Chat from "./chat";
import Thumbnail from "./thumbnail";

function TalkingSingle(props) {
  const address = props.address;
  const size = {
    content: [2, 10],
  };

  const self={
    click:(ev)=>{
      //console.log(`Click to open the talking page`);
      setTimeout(()=>{
        const acc="5FQmGPk7qGBmU3K6kDfMSBiUHBYq5NqXpx93KFEvDvyz5sRJ"
        props.page(<Chat address={acc} height={700}/>,acc);
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
        <Thumbnail list={[address]} />
      </Col>
      <Col
        xs={size.content[1]}
        sm={size.content[1]}
        md={size.content[1]}
        lg={size.content[1]}
        xl={size.content[0]}
        xxl={size.content[1]}
      >
       chat summary
      </Col>
    </Row>
  );
}
export default TalkingSingle;
