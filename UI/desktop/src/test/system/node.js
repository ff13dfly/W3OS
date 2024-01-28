import W3 from "w3api";

const test=[
    ()=>{
        const input={method:["system","node","get"],alink:"anchor://mynode/12345"};
        const url="wss://dev2.metanchor.net";
        W3.call(input,url,(res)=>{
          console.log(res);
        },"websocket");
    },
]

const Node={
    get:()=>{
        W3.debug();   //set to the debug mode
        test[0]();
    },
}

export default Node;