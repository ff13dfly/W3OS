import { Row, Col } from "react-bootstrap";

import Chat from "./chat";
import Thumbnail from "./thumbnail";
import tools from "../lib/tools";

function TalkingSingle(props) {
  const to = props.to;
  const details = props.details;
  const size = {
    content: [2, 10],
    title: [7, 5],
    row: 12,
  };

  const self={
    click:(ev)=>{
      //console.log(`Click to open the talking page`);
      setTimeout(()=>{
        const acc="5FQmGPk7qGBmU3K6kDfMSBiUHBYq5NqXpx93KFEvDvyz5sRJ"
        props.page(<Chat address={acc} height={700}/>,acc);
      },300);
    },
    getDate:(stamp)=>{
      const now=tools.stamp();
      console.log(now);
      const diff=now-stamp
      const min=1000*60;
      const hour=60*min;
      const day=24*hour;
      
      if(diff > day){
        const dt=new Date(stamp);
        return dt.toDateString();
      }else if(diff > hour){
        return `${Math.floor(diff/hour)}h ago`;
      }else if(diff > min){
        return `${Math.floor(diff/min)}m ago`;
      }else{
        return `${Math.floor(diff*0.001)}s ago`;
      }
    },
    getNick:(nick,to)=>{
      if(!nick) return tools.shorten(to,8);
      return nick;
    },
  }

  return (
    <Row className="pt-2 pb-2" onClick={(ev)=>{
      self.click();
    }}>
      <Col className="text-end" xs={size.content[0]} sm={size.content[0]} md={size.content[0]}
        lg={size.content[0]} xl={size.content[0]} xxl={size.content[0]}>
        <Thumbnail list={[to]} />
      </Col>
      <Col xs={size.content[1]} sm={size.content[1]} md={size.content[1]}
        lg={size.content[1]} xl={size.content[1]} xxl={size.content[1]}>
        <Row>
          <Col xs={size.title[0]} sm={size.title[0]} md={size.title[0]}
            lg={size.title[0]} xl={size.title[0]} xxl={size.title[0]}>
            <strong>{self.getNick(details.nick,to)}</strong>
          </Col>
          <Col className="text-end" xs={size.title[1]} sm={size.title[1]} md={size.title[1]}
            lg={size.title[1]} xl={size.title[1]} xxl={size.title[1]}>
            <small>{self.getDate(details.update)}</small>
          </Col>
          <Col xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
            lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
            <small>{details.last}</small>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default TalkingSingle;
