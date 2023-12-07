import { Col,Image } from "react-bootstrap";
import { useEffect, useState } from "react";

function Thumb(props) {
  const data=props.data;

  const self={
    click:(hash)=>{
      console.log(`Ready to get file by hash ( ${hash} ) .`);
    },
  }

  //let [list, setList] = useState([]);
  



  useEffect(() => {
  }, []);

  return (
    <Col className="text-center" onClick={(ev)=>{
      self.click(data.hash);
    }}>
      <Image className="icon text-center"
        src={data.icon}
      />
      <h6>{data.hash}</h6>
    </Col>
  );
}

export default Thumb;