import W3 from "w3api";

const test=[
    (ck)=>{
        const input={method:["system","node","get"],alink:"anchor://mannodes/33333"};
        const url="ws://127.0.0.1:8818";
        W3.call(input,url,(res)=>{
          console.log(res);
          return ck && ck();
        });
    },
    (ck)=>{
        const input={method:["system","node","get"],alink:"anchor://mynode/12345"};
        const url="wss://dev2.metanchor.net";
        W3.call(input,url,(res)=>{
          console.log(res);
          return ck && ck();
        },"websocket");
    },
]

const Node={
    get:()=>{
        W3.debug();   //set to the debug mode
        test[0](()=>{
            test[0]();
        });
    },
}

export default Node;