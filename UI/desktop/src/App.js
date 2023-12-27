import { Container,Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import Tab from "./layout/tab";
import Body from "./layout/body";

import W3 from "w3api";

function App() {
  console.log(W3);

  //The UI actions all here.
  let [plugin,setPlugin]=useState([]);

  const UI={
    plugin:(list)=>{

    },
    tabs:(list)=>{

    },
    body:(list)=>{

    },
  }

  useEffect(() => {
    const ps=[
      "account",
      "document",
      "version",
    ]
    setPlugin(ps);
  }, []);
  return (
    <div>
      <Container>
        <Row className="pt-4">
          <Col lg={12} xl={12} xxl={12}>
            <Header />
          </Col>
          <Col lg={2} xl={2} xxl={2}>
            <Sidebar list={plugin} />
          </Col>
          <Col lg={10} xl={10} xxl={10}>
            <Row className="pt-4">
              <Col lg={12} xl={12} xxl={12}>
                <Tab />
              </Col>
              <Col lg={12} xl={12} xxl={12}>
                <Body />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
