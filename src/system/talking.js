import { Container, Row, Col,Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import TalkingSingle from "../components/talking_single";
import TalkingGroup from "../components/talking_group";
import GroupAdd from "../components/group_add";

import RUNTIME from "../lib/runtime";
import tools from "../lib/tools";
import CHAT from "../lib/chat";

import IMGC from "../open/IMGC";

function Talking(props) {
    const size = {
        header: [3, 6, 3],
        row: [12],
      };
    const funs=props.funs;

    //const funs = props.funs;
    let [animation, setAnimation] = useState("ani_scale_in");
    let [framework, setFramework] = useState("");
    let [active, setActive] = useState("");
    let [hidden, setHidden] = useState(false);

    const self = {
      page:(ctx,address)=>{
        setActive(address);
        setFramework(ctx);
        setHidden(true);
      },
      entry:()=>{
        RUNTIME.getTalking((list)=>{
          console.log(list);
          setFramework(
            <div>
              {list.map((row, index) => (
                row.type==="group"?
                <TalkingGroup funs={funs} to={row.id} page={self.page} key={index} details={row} unread={row.un}/>:
                <TalkingSingle funs={funs} to={row.id} page={self.page} key={index} details={row} unread={row.un}/>
              ))}
            </div>
          );
        });
      },
      newGroup:()=>{
        console.log(`Ready to create new group`);
        self.page(<GroupAdd back={self.back}/>,"group_add");
      },
      back:()=>{
        self.entry();
        setHidden(false);
        setActive("");
      },
      updateTalkingIndex:(from,to,msg,ck,unread)=>{
        RUNTIME.getTalking((list)=>{
          let nlist=[];
          let target=null;
          //1. filter out the target group
          for(let i=0;i<list.length;i++){
            const row=list[i];
            if(row.id===to){
              target=row;
            }else{
              nlist.push(row);
            } 
          }
  
          //2.update data
          if(target!==null){
            //2.1.regroup the index order
            target.last.from=from;
            target.last.msg=msg;
            target.update=tools.stamp();
            if(unread){
              if(!target.un) target.un=0;
              target.un++;
            }
          }else{
            //2.2.create new group here, need to get the details of group
            const atom={
  
            }
          }
          nlist.unshift(target);
          RUNTIME.setTalking(nlist,ck);
          //console.log(list);
        });
      },
      recorder:(input)=>{
        if(input.act && input.act==="chat"){
          //1.save the chat record;
          // CHAT.save(mine, res.from, res.msg, "from",!res.group?"":res.group,()=>{
          // });

          //2.update the talking index
          if(input.group){
            self.updateTalkingIndex(input.from,input.group,input.msg,()=>{
              //console.log("Got the message, ready to fresh");
              if(!active) self.entry();
            },true);
          }else{

          }
        }
      },
    }
    
    useEffect(() => {
      self.entry();
      IMGC.init(self.recorder);
    },[]);
    
    return (
      <div id="page" className={animation}>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Row style={{ width: "100%", margin: "0 auto" }}>
            <Col xs={size.header[0]} sm={size.header[0]} md={size.header[0]} lg={size.header[0]} xl={size.header[0]} xxl={size.header[0]}
              style={{ paddingTop: "6px" }}
            >
              <Navbar.Brand href="#">W<span className="logo">3</span>OS</Navbar.Brand>
            </Col>
            <Col xs={size.header[1]} sm={size.header[1]} md={size.header[1]} lg={size.header[1]} xl={size.header[1]} xxl={size.header[1]}
              style={{ paddingTop: "10px" }}
              className="text-center"
            >
              Talking
            </Col>
            <Col xs={size.header[2]} sm={size.header[2]} md={size.header[2]}
              lg={size.header[2]}  xl={size.header[2]} xxl={size.header[2]}
              className="text-end pb-2"
              style={{ paddingTop: "10px" }}
            >
              <span
                className="close"
                onClick={(ev) => {
                  if(!active){
                    setAnimation("ani_scale_out");
                    setTimeout(() => {
                      props.funs.page("");
                    }, 300);
                  }else{
                    setActive("");
                    setHidden(false);
                    self.entry();
                  }
                }}
              >
                <button className="btn btn-sm btn-default">X</button>
              </span>
            </Col>
          </Row>
        </Container>
      </Navbar>
        <Container>
          {framework}
        </Container>
        <div className="opts" hidden={hidden}>
          <img
            src="icons/edit.svg"
            className="opt_button"
            alt=""
            onClick={(ev) => {
              self.newGroup(ev);
            }}
          />
        </div>
      </div>
    );
}

export default Talking;