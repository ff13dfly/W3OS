import { Container, Row, Col, Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import TalkingSingle from "../components/talking_single";
import TalkingGroup from "../components/talking_group";
import GroupAdd from "../components/group_add";

import RUNTIME from "../lib/runtime";
import CHAT from "../lib/chat";
import SCROLLER from "../lib/scroll";
//import tools from "../lib/tools";

import IMGC from "../open/IMGC";

let active = "";
function Talking(props) {
  const size = {
    header: [3, 6, 3],
    row: [12],
  };
  const funs = props.funs;

  let [animation, setAnimation] = useState("ani_scale_in");
  let [framework, setFramework] = useState("");
  let [title, setTitle] = useState("Talking");
  let [hidden, setHidden] = useState(false);

  //base on action to create notice recorder
  const decoder = {
    group_create: (mine, obj) => {
      CHAT.save(mine, obj.msg.id, "New group created.", "notice", obj.msg.id, false, () => { });
    },
    group_detail: (mine, obj) => {
      //console.log(obj);
      const msg=obj.msg;
      // let ctx="";
      // for(let i=0;i<msg.group.length;i++){
      //   ctx+=`${tools.shorten(msg.group[i],4)},`;
      // }
      // ctx+=`${msg.group.length} member, enjoy talking.`;
      const ctx=`${msg.group.length} members, enjoy talking.`;
      CHAT.save(mine, msg.id, ctx, "notice", msg.id, false, () => { });
    },
  }

  const cmap={
    height:"750px",
  }

  const self = {
    page: (ctx, address, header) => {
      active = address;
      setFramework(ctx);
      setHidden(true);
      if (header) setTitle(header);
    },
    entry: () => {
      setTitle("Talking");
      RUNTIME.getTalking((list) => {
        setFramework(
          <div className="talking_container" style={cmap}>
            {list.map((row, index) => (
              row.type === "group" ?
                <TalkingGroup funs={funs} to={row.id} page={self.page} key={index} details={row} unread={row.un} /> :
                <TalkingSingle funs={funs} to={row.id} page={self.page} key={index} details={row} unread={row.un} />
            ))}
          </div>
        );
        SCROLLER.allowScroll();
      });
    },
    newGroup: () => {
      self.page(<GroupAdd back={self.back} />, "group_add", "Select contact");
    },
    payToVertify: (ev) => {
      funs.dialog.show(
        "Vertification action here. Will show the pay amount from the server.",
        "More details",
        true
      );
    },
    back: () => {
      self.entry();
      RUNTIME.clearMailer(active);    //remove the mailer
      active = "";
      setHidden(false);
      setTitle("Talking");
    },

    recorder: (input) => {
      if (!input || !input.type) return false;
      const un = RUNTIME.exsistMailer(!input.group ? input.from : input.group);
      switch (input.type) {
        case "message":     //message recorder process
          if (input.group) {
            RUNTIME.updateTalkingIndex(input.from, input.group, input.msg, () => {
              if (!active) self.entry();
            }, !un);
          } else {
            RUNTIME.updateTalkingIndex(input.from, input.to, input.msg, () => {
              if (!active) self.entry();
            }, !un);
          }

          //2.save the message record
          RUNTIME.getAccount((acc) => {
            const mine = acc.address;
            if (input.group) {
              CHAT.save(mine, input.from, input.msg, "from", input.group, un, () => { });
            } else {
              CHAT.save(mine, input.from, input.msg, "from", input.from, un, () => { });
            }
          });
          break;

        case "notice":     //notice recorder process
          //console.log(`Write the notice recoder here.`);
          if (input.method) {
            const key = `${input.method.cat}_${input.method.act}`;
            console.log(key);
            if (decoder[key]) {
              RUNTIME.getAccount((acc) => {
                const mine = acc.address;
                decoder[key](mine, input);
              });
            }
          }

          break;
        default:
          break;
      }
    },
  }

  useEffect(() => {
    self.entry();
    IMGC.init(self.recorder);
  }, []);

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
              lg={size.header[2]} xl={size.header[2]} xxl={size.header[2]}
              className="text-end pb-2"
              style={{ paddingTop: "10px" }}
            >
              <span
                className="close"
                onClick={(ev) => {
                  if (!active) {
                    setAnimation("ani_scale_out");
                    setTimeout(() => {
                      props.funs.page("");
                    }, 300);
                  } else {
                    RUNTIME.clearMailer(active);    //remove the mailer
                    active = "";
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
        <img src="icons/edit.svg" className="opt_button" alt=""
          onClick={(ev) => {
            self.newGroup(ev);
          }}
        />
        <img src="icons/link.svg" className="opt_button" alt=""
          onClick={(ev) => {
            self.payToVertify(ev);
          }}
        />
      </div>
    </div>
  );
}

export default Talking;