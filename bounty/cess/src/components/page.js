import { Row,Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import Thumb from "./thumb";
import tools from "../lib/tools";

import CESS from "../lib/CESS";

function Page(props) {
  const size = [3, 6, 3];

  const self={
    
  }

  let [list, setList] = useState([]);
  
  useEffect(() => {
    CESS.overview();
    
    const nlist=[
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
      {hash:tools.char(10),icon:"logo512.png",update:tools.stamp()},
    ]
    setList(nlist);
  }, []);

  return (
    <Row>
    {list.map((row, index) => (
      <Thumb key={index}  data={row} render={props.render}/>
    ))}
    </Row>
  );
}

export default Page;