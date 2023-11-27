import { Row, Col } from "react-bootstrap";
import { useState } from "react";

import Chat from "./chat";
import Thumbnail from "./thumbnail";
import Announce from "./announce";
import tools from "../lib/tools";
import GroupOpt from "./group_opt";

function TalkingGroup(props) {
  const to = props.to;
  const details = props.details;
  const size = {
    content: [2, 10],
    title: [7, 5],
    row: 12,
  };
  const funs=props.funs;

  let [clean, setClean] = useState(false);

  const self = {
    click: (ev) => {
      setTimeout(() => {
        const dom = (<div>
          <Announce funs={funs} id={to} content="This is an announce" />
          <GroupOpt funs={funs} page={props.page} id={to} clean={clean}  />
          <Chat funs={funs} address={to} height={700} click={self.onBlank} />
        </div>);
        props.page(dom, to);
      }, 300);
    },
    //TODO, this can not make the opts menu hide
    onBlank:()=>{
      //console.log(`Chat clicked blank`);
      setClean(true);
    },
    getDate:(stamp)=>{
      const now=tools.stamp();
      const diff=now-stamp;
      
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
    getNick:(nick,group)=>{
      if(!nick){
        const limit=2;
        const max=group.length<limit?group.length:limit;
        const list=[]
        for(let i=0;i<max;i++){
          list.push(tools.shorten(group[i],3));
        }
        return `(${group.length})${list.join(",")}...`;
      }
      return `(${group.length})${nick}`;
    },
    getLatest:(from,msg)=>{
      if(!from || !msg) return "Nothing yet";
      return `${tools.shorten(from,6)}:${msg}`;
    },
  }

  return (
    <Row className="pt-2 pb-2" onClick={(ev) => {
      self.click();
    }}>
      <Col className="text-end" xs={size.content[0]} sm={size.content[0]} md={size.content[0]}
        lg={size.content[0]} xl={size.content[0]} xxl={size.content[0]}>
        <Thumbnail list={details.group} group={to} />
        <span className="count" style={{marginLeft:"45px"}} hidden={!props.unread}>{!props.unread?0:props.unread}</span>
      </Col>
      <Col xs={size.content[1]} sm={size.content[1]} md={size.content[1]}
        lg={size.content[1]} xl={size.content[1]} xxl={size.content[1]}>
        <Row>
          <Col xs={size.title[0]} sm={size.title[0]} md={size.title[0]}
            lg={size.title[0]} xl={size.title[0]} xxl={size.title[0]}>
            <strong>{self.getNick(details.nick,details.group)}</strong>
          </Col>
          <Col className="text-end" xs={size.title[1]} sm={size.title[1]} md={size.title[1]}
            lg={size.title[1]} xl={size.title[1]} xxl={size.title[1]}>
            <small>{self.getDate(details.update)}</small>
          </Col>
          <Col xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
            lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
            <small>{self.getLatest(details.last.from,details.last.msg)}</small>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
export default TalkingGroup;
