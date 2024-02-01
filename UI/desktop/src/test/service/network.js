import W3 from "w3api";

const test=[
    (ck)=>{
        const input={method:["service","network","get"],alink:"anchor://bad/12345"};
        const url="ws://127.0.0.1:7788";
        W3.call(input,url,(res)=>{
          console.log(res);
          return ck && ck();
        },"websocket");
    },
]

const Network={
    get:()=>{
        W3.debug();   //set to the debug mode
        test[0]();
    },
}

export default Network;