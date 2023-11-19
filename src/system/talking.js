import { Navbar, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import SystemHeader from "../components/header";
import TalkingSingle from "../components/talking_single";
import TalkingGroup from "../components/talking_group";

const self = {
    
}

function Talking(props) {
    const size = {
        header: [3, 6, 3],
        row: [12],
      };
    
    const funs = props.funs;
    let [animation, setAnimation] = useState("ani_scale_in");

    return (
    <div id="page" className={animation}>
      <SystemHeader funs={funs} setAnimation={setAnimation} title="Talking" />
      <Container>
        <TalkingSingle to={"SS58_ACCOUNT"}/>
        <TalkingGroup to={"GROUP_ID"}/>
      </Container>
      {/* <div className="opts">
        <img
          src="icons/remove.svg"
          className="opt_button"
          alt=""
          onClick={(ev) => {
            self.clickEdit(ev);
          }}
        />
      </div> */}
    </div>
    );
}

export default Talking;