import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import Trend from "../system/trend";
import PRICE from "../open/PRICE";

function Board(props) {
  const funs = props.funs;
  const size = [7, 5];

  let [btc, setBTC] = useState(40000);
  let [eth, setETH] = useState(2200);
  let [ksm, setKSM] = useState(0);

  const router={
    bitcoin:setBTC,
    ethereum:setETH,
    kusama:setKSM
  }

  const self = {
    click: (ev) => {
      funs.page(<Trend funs={funs} />);
    },
  };
  useEffect(() => {
    PRICE.init((data)=>{
      if(data!==false){
        for(var k in data){
          if(router[k])router[k](data[k]);
        }
      }
    });
  }, []);

  return (
    <div
      className="board"
      onClick={(ev) => {
        self.click(ev);
      }}
    >
      <Row>
        <Col xs={size[0]} sm={size[0]}  md={size[0]} lg={size[0]} xl={size[0]} xxl={size[0]}>
          BTC/USDT {btc.toLocaleString()} ETH/USDT {eth.toLocaleString()}
        </Col>
        <Col xs={size[1]} sm={size[1]}  md={size[1]} lg={size[1]} xl={size[1]} xxl={size[1]}>
          Network status
        </Col>
      </Row>
    </div>
  );
}
export default Board;
