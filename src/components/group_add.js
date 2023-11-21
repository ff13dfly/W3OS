import { Row, Col, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import RUNTIME from "../lib/runtime";
import tools from "../lib/tools";

function GroupAdd(props) {
  const size = {
    row: [12],
    list: [1,3,8],
    opt: [7, 5],
  };

  let [list, setList]=useState([]);
  let [info, setInfo]=useState("Message herer");
  let [address, setAddress] = useState("");
  let [disable, setDisalbe] = useState(true);

  const self = {
    change: (ev) => {
      setAddress(ev.target.value);
    },
    click: (ev) => {
      //console.log(address);
      if (!address) return false;
      RUNTIME.addContact(address, (res) => {
        if (res === true) props.fresh();
        setAddress("");
      });
    },
  };

  useEffect(() => {
    RUNTIME.getAccount((acc) => {
      if (acc && acc.address) setDisalbe(false);
    });
    RUNTIME.getContact((res) => {
      console.log(res);
      const nlist=[];
      for(let acc in res){
        const row=res[acc];
        row.address=acc;
        nlist.push(row)
      }
      setList(nlist);
    });
  }, []);

  return (
    <Row>
      {list.map((row, index) => (
        <Col className="pt-2" key={index} xs={size.row[0]} sm={size.row[0]} md={size.row[0]} lg={size.row[0]} xl={size.row[0]} xxl={size.row[0]}>
          <Row>
            <Col className="text-center" xs={size.list[0]} sm={size.list[0]} md={size.list[0]} lg={size.list[0]} xl={size.list[0]} xxl={size.list[0]}>
              <input  type="checkbox"
              onChange={(ev) => { }}
              style={{marginTop:"30px"}}/>
            </Col>
            
            <Col xs={size.list[2]} sm={size.list[2]} md={size.list[2]} lg={size.list[2]} xl={size.list[2]} xxl={size.list[2]}>
              <strong>{row.short}</strong>
              {row.intro},{tools.shorten(row.address)}
            </Col>
            <Col xs={size.list[1]} sm={size.list[1]} md={size.list[1]} lg={size.list[1]} xl={size.list[1]} xxl={size.list[1]}>
            <Image
                src={`https://robohash.org/${row.address}.png`}
                rounded
                width="100%"
                style={{maxWidth:"60px"}}
              />
            </Col>
          </Row>
          <hr />
        </Col>
      ))}
      <div className="fixfooter">
        <Row>
          <Col xs={size.opt[0]} sm={size.opt[0]} md={size.opt[0]} lg={size.opt[0]} xl={size.opt[0]} xxl={size.opt[0]}>
            {info}
          </Col>
          <Col className="text-end" xs={size.opt[1]} sm={size.opt[1]} md={size.opt[1]} lg={size.opt[1]} xl={size.opt[1]} xxl={size.opt[1]}>
            <button className="btn btn-md btn-primary">New Group</button>
          </Col>
        </Row>
      </div>
    </Row>
  );
}
export default GroupAdd;
