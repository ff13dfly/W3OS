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

  const test={
    rpc:()=>{
      //https://docs.substrate.io/build/application-development/
      const url="ws://127.0.0.1:9944";
      const ws=new WebSocket(url);

      //work properly
      const req={"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}
      //const req={"id":1, "jsonrpc":"2.0", "method": "system_name"}
      //const req={"id":1, "jsonrpc":"2.0", "method": "system_version"}
      //const req={"id":1,"jsonrpc":"2.0","method":"chain_getBlock",param:["123"]}
      //const req={"id":1, "jsonrpc":"2.0", "method": "subscribe_newHead"}
      

      //trying...
      //const req={"id":1, "jsonrpc":"2.0", "method": "state_call",param:["anchor","anchorOwner","fv_0"]}
      //const req={"id":1, "jsonrpc":"2.0", "method": "state_call",param:["anchor","anchorOwner","fv_0"]}
      
      ws.onmessage=(res)=>{
        const rep=JSON.parse(res.data);
        console.log(rep);
      };

      setTimeout(()=>{
        ws.send(JSON.stringify(req));
      },500);
    }
  }

  useEffect(() => {
    //1. plugins added
    const ps=[
      "account",
      "document",
      "version",
    ]
    setPlugin(ps);

    //test.rpc();

    //2. start W3OS
    //W3.debug();   //set to the debug mode
    //const input={method:"account_local_get",alink:"anchor://good/12345"};
    const input={method:["account","local","get"],alink:"anchor://good/12345"};
    //const input={method:"account_local_get"};
    //const input={method:["account","local","get"]};
    //const input="account_local_get";
    //const input=["account","local","get"];
    //const input=null;
    // W3.call(input,(res)=>{
    //   console.log(res);
    // });


    W3.call("system_loader_get","vara",(res)=>{
      console.log(res);
    });

    // W3.call("account_local_get",(res)=>{
    //   console.log(res);
    // });

    // W3.task([],(res)=>{
    //   console.log(res);
    // });

    // W3.def("account_local_get",(res)=>{
    //   console.log(res);
    // });
    
    
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
