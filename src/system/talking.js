import { Container, Row, Col,Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import TalkingSingle from "../components/talking_single";
import TalkingGroup from "../components/talking_group";
import GroupAdd from "../components/group_add";
import RUNTIME from "../lib/runtime";
import IMGC from "../open/IMGC";


function Talking(props) {
    const size = {
        header: [3, 6, 3],
        row: [12],
      };
    
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
          setFramework(
            <div>
              {list.map((row, index) => (
                row.type==="group"?
                <TalkingGroup to={row.id} page={self.page} key={index} details={row}/>:
                <TalkingSingle to={row.id} page={self.page} key={index} details={row}/>
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
    }
    
    useEffect(() => {
      self.entry();
      IMGC.init();
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