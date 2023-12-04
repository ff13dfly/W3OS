import { Row, Col } from "react-bootstrap";

import DEVICE from "../lib/device";

function Announce(props) {
  const size ={
    row:[12],
  }
  const funs=props.funs;

  const self = {
    click: (ev) => {
      console.log("Announce clicked.");
      funs.dialog.show(
        "Annoucement details here",
        "Group Announcement",
        true,     //shown on the center
      );
    },
  };

  const dv=DEVICE.getDevice("screen");
  //console.log(dv);

  return (
    <Row hidden={false} className="pt-2 pb-2 fixAnnounce" style={{background:"#fae9e9",width:`${dv[0]}px`}} onClick={(ev)=>{
      self.click();
    }}>
      <Col className="text-secondary" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
        lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          {props.content}
      </Col>
    </Row>
  );
}
export default Announce;
