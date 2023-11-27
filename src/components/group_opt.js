import { Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import GroupJoin from "../components/group_join";
import GroupNick from "../components/group_nick";
import GroupDetail from "../components/group_detail";

function GroupOpt(props) {
  const size = {
    row: [12],
    list: [1, 3, 8],
  };
  const funs=props.funs;
  const group=props.id;

  let [hidden, setHidden] = useState(true);

  const self = {
    click: () => {
      setHidden(!hidden);
    },
    clickNick:(ev)=>{
      funs.dialog.show(
        <GroupNick id={group}/>,
        "Group Name"
      );
    },
    clickInformation:(ev)=>{
      funs.dialog.show(
        <GroupDetail id={group}/>,
        "Group Information"
      );
    },
    clickAdd:(ev)=>{
      console.log(group);
      //console.log(`Ready to create new group`);
      //props.page(<GroupAdd back={self.back}/>,"group_add");
      funs.dialog.show(
        <GroupJoin back={self.back}/>,
        "New Group Member"
      );
    },
    clickLeave:(ev)=>{
      console.log(group);
    },
    clickMore:(ev)=>{
      funs.dialog.show(
        "More details of group",
        "More details"
      );
    },
    clickVertiry:(ev)=>{
      funs.dialog.show(
        "Vertification action here. Will show the pay amount from the server.",
        "More details"
      );
    },  
  }

  useEffect(() => {
    setHidden(true);
  }, [props.clean]);

  return (
    <div className="fixOpts">
      <Row>
        <Col xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
          lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          <button className="btn btn-sm btn-warning" onClick={() => {
            self.click()
          }}>...</button>
        </Col>
        <Col hidden={hidden} className="pt-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
          lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          <Row className="pt-2" style={{background:"#EEFFEE"}}>
          <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]} onClick={(ev)=>{
                self.clickNick(ev);
                setHidden(true);
              }}>
              <button className="btn btn-sm btn-primary">Group Name</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]} onClick={(ev)=>{
                self.clickLeave(ev);
                setHidden(true);
              }}>
              <button className="btn btn-sm btn-primary">leave</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]} onClick={(ev)=>{
                self.clickAdd(ev);
                setHidden(true);
              }}>
              <button className="btn btn-sm btn-primary">add</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
              <button className="btn btn-sm btn-primary" onClick={(ev)=>{
                self.clickInformation(ev);
                setHidden(true);
              }}>Information</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]} onClick={(ev)=>{
                self.clickMore(ev);
                setHidden(true);
              }}>
              <button className="btn btn-sm btn-primary">More</button>
            </Col>
            <Col className="pb-2" xs={size.row[0]} sm={size.row[0]} md={size.row[0]}
              lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]} onClick={(ev)=>{
                self.clickVertiry(ev);
                setHidden(true);
              }}>
              <button className="btn btn-sm btn-primary">Pay to vertify</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
export default GroupOpt;