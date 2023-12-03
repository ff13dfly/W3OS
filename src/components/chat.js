import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";

import From from "./chat_from";
import To from "./chat_to";
import Notice from "./chat_notice";

import RUNTIME from "../lib/runtime";
import CHAT from "../lib/chat";
import SCROLLER from "../lib/scroll";
import DEVICE from "../lib/device";
//import tools from "../lib/tools";

import IMGC from "../open/IMGC";

let backup = [];

function Chat(props) {
  const size = {
    content: [9, 3],
    row: [12],
  };

  const to=props.address;
  const funs=props.funs;

  //const dv = { xs: 4, sm: 4, md: 4, lg: 4, xl: 6, xxl: 6 };
  let [content, setContent] = useState("");
  let [list, setList] = useState([]);
  let mine = "";

  const self = {
    isGroup:(address)=>{
      if(address.length===48) return false;
      return true;
    },
    
    chat: (ev) => {
      if (!content) return false;
      self.append(content);
      CHAT.save(mine,to,content,"to",to,false,()=>{
        RUNTIME.updateTalkingIndex(mine,to,content,()=>{

        });
      }); 
      if(self.isGroup(to)){
        IMGC.group.chat(content,to);
      }else{
        IMGC.chat(content,to);
      }
      self.toBottom();
    },
    append: (ctx) => {
      const row = {
        type: "to",
        address: mine,
        content: ctx,
      };
      const now = [];
      for (let i = 0; i < list.length; i++) {
        now.push(list[i]);
      }
      now.push(row);
      setList(now);
      setContent("");
      backup = now;
    },
    onChange: (ev) => {
      if(props.click) props.click();    //trigger the blank clean function
      setContent(ev.target.value);
    },
    showHistory: (list) => {
      const cs = [];
      for (let i = 0; i < list.length; i++) {
        const row = list[i];
        if (row.way === "from") {
          cs.push({ type: "from", address: to.length!==48?row.from:to, content: row.msg });
        } else {
          cs.push({ type: "to", address: mine, content: row.msg });
        }
      }
      setList(cs);
      backup = cs;
      SCROLLER.allowScroll();
      self.toBottom();
    },
    getUnread: (list) => {
      const nlist = [];
      for (let i = 0; i < list.length; i++) {
        const row = list[i];
        if (row.status === 3) {
          row.status = 1;
          nlist.push(row);
        }
      }
      return nlist;
    },
    toBottom: () => {
      setTimeout(() => {
        const ele = document.getElementById(`con_${props.address}`);
        if (ele !== null) ele.scrollTop = ele.scrollHeight+50;
      }, 100);
    },
    entry: (ck) => {
      CHAT.page(mine, to, 20, 1, (his) => {
        self.showHistory(his);
        const nlist = self.getUnread(his);
        if (nlist.length !== 0) {
          CHAT.toread(mine, nlist, (res) => {
            if (props.fresh) props.fresh();
            return ck && ck();
          });
        }else{
          return ck && ck();
        }
      });
    },
    indexUpdate:(id)=>{
      //console.log(`Update the localStorage index here. ${to}`);
      RUNTIME.getTalking((list)=>{
        for(let i=0;i<list.length;i++){
          if(list[i].id===id){
            list[i].un=0;
          }
        }
        RUNTIME.setTalking(list);
      }); 
    },
    live:(res)=>{
      switch (res.type) {
        case "message":
          const nlist = [];
          for (let i = 0; i < backup.length; i++) {
            nlist.push(backup[i]);
          }
          if(self.isGroup(to)){
            nlist.push({
              type: "from",
              address: res.from,
              group: to,
              content: res.msg,
            });
          }else{
            nlist.push({
              type: "from",
              address: res.from,
              content: res.msg,
            });
          }
          setList(nlist);
          backup = nlist;
          break;
        case "error":
          console.log(res);

          break;
        default:
          break;
      }
      self.toBottom();
    },
    format:(row,key)=>{
      let dom="";
      switch (row.type) {
        case "notice":
          dom=(<Notice  funs={funs} address={row.address} key={key} content={row.content} />)
          break;
        case "from":
          dom=(<From  funs={funs} address={row.address} key={key} content={row.content} />)
          break;
        case "to":
          dom=(<To  funs={funs} address={row.address} key={key} content={row.content} />)
          break;
        default:
          break;
      }
      return dom;
    },
  };

  RUNTIME.getAccount((res) => {
    mine = res.address;
  });

  useEffect(() => {
    self.entry(()=>{
      self.indexUpdate(to);
    });   

    RUNTIME.setMailer(to, (res) => {
      self.live(res);
    });
  }, []);

  const dv=DEVICE.getDevice("screen");

  return (
    <Row className="pb-2">
      <Col className="chat_container" style={{height:`${dv[1]-140}px`}} id={`con_${props.address}`}
        xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
        lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
        <div id={`scroll_${props.address}`}>
          {list.map((row, key) =>
            self.format(row,key)
          )}
        </div>
      </Col>
      <div className="fixfooter">
        <Row className="pb-2 pt-2">
        <Col xs={size.content[0]} sm={size.content[0]} md={size.content[0]}
          lg={size.content[0]} xl={size.content[0]} xxl={size.content[0]}>
          <input type="text"  className="form-control" value={content}
            onChange={(ev) => {
              self.onChange(ev);
            }}
          />
        </Col>
        <Col xs={size.content[1]} sm={size.content[1]} md={size.content[1]} lg={size.content[1]}
          xl={size.content[1]} xxl={size.content[1]} className="text-end"
        >
          <button className="btn btn-md btn-primary"
            onClick={(ev) => {
              self.chat(ev);
            }}
          >Send</button>
        </Col>
        </Row>
      </div>
      
    </Row>
  );
}
export default Chat;
