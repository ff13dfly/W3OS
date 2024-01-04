const url="ws://127.0.0.1:9944";
const ws=new WebSocket(url);
const req={"id":1, "jsonrpc":"2.0", "method": "rpc_methods"}
ws.onmessage=(res)=>{
  console.log(res);
};

setTimeout(()=>{
  ws.send(JSON.stringify(req));
},500);