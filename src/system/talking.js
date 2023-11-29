import { Container, Row, Col,Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import TalkingSingle from "../components/talking_single";
import TalkingGroup from "../components/talking_group";
import GroupAdd from "../components/group_add";

import RUNTIME from "../lib/runtime";
import tools from "../lib/tools";
import CHAT from "../lib/chat";

import IMGC from "../open/IMGC";

let active="";
function Talking(props) {
    const size = {
        header: [3, 6, 3],
        row: [12],
      };
    const funs=props.funs;

    let [animation, setAnimation] = useState("ani_scale_in");
    let [framework, setFramework] = useState("");
    let [title, setTitle]= useState("Talking");
    let [hidden, setHidden] = useState(false);

    const self = {
      page:(ctx,address,header)=>{
        active=address;
        setFramework(ctx);
        setHidden(true);
        if(header) setTitle(header);
      },
      entry:()=>{
        setTitle("Talking");
        RUNTIME.getTalking((list)=>{
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
        self.page(<GroupAdd back={self.back}/>,"group_add","Select contact");
      },
      payToVertify:(ev)=>{
        funs.dialog.show(
          "Vertification action here. Will show the pay amount from the server.",
          "More details",
          true
        );
      },
      back:()=>{
        self.entry();
        active="";
        setHidden(false);
        setTitle("Talking");
      },
      updateTalkingIndex:(from,to,msg,ck,unread)=>{
        //console.log(`From:${from} to ${to}, ${msg}, ${unread}`);
        RUNTIME.getTalking((list)=>{
          let nlist=[];
          let target=null;
          //1. filter out the target group
          for(let i=0;i<list.length;i++){
            const row=list[i];
            if(to.length===48){
              if(row.id===from){
                target=row;
              }else{
                nlist.push(row);
              }
            }else{
              if(row.id===to){
                target=row;
              }else{
                nlist.push(row);
              }
            }
          }
  
          //2.update data
          if(target!==null){
            //2.1.regroup the index order
            if(target.type!=="group"){
              target.last=msg;
            }else{
              target.last.from=from;
              target.last.msg=msg;
            }
            target.update=tools.stamp();

            if(unread){
              if(!target.un) target.un=0;
              target.un++;
            }
            nlist.unshift(target);
          }else{
            //2.2.create new group here, need to get the details of group
            if(to.length===48){
              const contact={
                id:from,            //group unique id
                nick:"",            //nickname of contact
                update:tools.stamp(),           //group update time
                last:msg,            //last message
                type:"contact"      //talking type
              }
              nlist.unshift(contact);
            }else{
              const atom={
                id:to,
                last:{
                  from:from,
                  msg:msg,
                },
                update:tools.stamp(),
                type:"group",
              }
              if(unread){
                if(!target.un) target.un=0;
                atom.un++;
              }
              nlist.unshift(atom);
            }
          }
          RUNTIME.setTalking(nlist,ck);
        });
      },
      recorder:(input)=>{
        console.log(`Recoder entry: ${active}`);
        if(input.type && input.type==="message"){
        //if(input.act && input.act==="chat"){
          if(input.group){
            console.log(`Before updateTalkingIndex:${active}`);
            self.updateTalkingIndex(input.from,input.group,input.msg,()=>{
              console.log(`After updateTalkingIndex:${active}`);
              if(!active) self.entry();
            },true);
          }else{
            self.updateTalkingIndex(input.from,input.to,input.msg,()=>{
              if(!active) self.entry();
            },true);
          }

          //2.save the message record
          RUNTIME.getAccount((acc)=>{
            const mine=acc.address;
            if(input.group){
              CHAT.save(mine,input.from,input.msg,"from",input.group,()=>{});
            }else{
              CHAT.save(mine,input.from,input.msg,"from",input.from,()=>{});
            }
          });
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
              {title}
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
                    active="";
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
          <img
            src="icons/link.svg"
            className="opt_button"
            alt=""
            onClick={(ev) => {
              self.payToVertify(ev);
            }}
          />
        </div>
      </div>
    );
}

export default Talking;