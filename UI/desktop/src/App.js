import { Container,Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import Header from "./layout/header";
import Sidebar from "./layout/sidebar";
import Tab from "./layout/tab";
import Body from "./layout/body";

import W3 from "w3api";

function App() {
  //The UI actions all here.
  let [plugin,setPlugin]=useState([]);

  //console.log(W3);
  // W3.call("system_startup",{},()=>{

  // });

  const UI={
    plugin:(list)=>{

    },
    tabs:(list)=>{

    },
    body:(list)=>{

    },
  }

  useEffect(() => {
    //1. plugins added
    const ps=[ "account","document","version"]
    setPlugin(ps);
    
    //2. start W3OS
    W3.debug();   //set to the debug mode
    //const input={method:"account_local_get",alink:"anchor://good/12345"};
    //const input={method:["account","local","get"],alink:"anchor://good/12345"};
    const input={method:["contact","friend","list"],alink:"anchor://good/12345"};
    //const input={method:["contact","friend","add"],alink:"anchor://good/12345"};
    //const input={method:"account_local_get"};
    //const input={method:["account","local","get"]};
    //const input="account_local_get";
    //const input=["account","local","get"];
    //const input=null;
    const mine="5CSTSUDaBdmET2n6ju9mmpEKwFVqaFtmB8YdB23GMYCJSgmw";
    const addr="5D5K7bHqrjqEMd9sgNeb28w9TsR8hFTTHYs6KTGSAZBhcePg";
    W3.call(input,mine,(res)=>{
      console.log(res);
    });    
    
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
