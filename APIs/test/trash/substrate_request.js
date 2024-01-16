const url = "ws://127.0.0.1:9944";
const ws = new WebSocket(url);

//work properly
const req = { "id": 1, "jsonrpc": "2.0", "method": "rpc_methods" }
//const req={"id":1, "jsonrpc":"2.0", "method": "system_name"}
//const req={"id":1, "jsonrpc":"2.0", "method": "system_version"}
//const req={"id":1,"jsonrpc":"2.0","method":"chain_getBlock",param:["123"]}
//const req={"id":1, "jsonrpc":"2.0", "method": "subscribe_newHead"}

//trying...
//const req={"id":1, "jsonrpc":"2.0", "method": "state_call",param:["anchor","anchorOwner","fv_0"]}
//const req={"id":1, "jsonrpc":"2.0", "method": "state_call",param:["anchor","anchorOwner","fv_0"]}

ws.onmessage = (res) => {
  const rep = JSON.parse(res.data);
  console.log(rep);
};

setTimeout(() => {
  ws.send(JSON.stringify(req));
}, 500);
ws.onmessage = (res) => {
  console.log(res);
};

setTimeout(() => {
  ws.send(JSON.stringify(req));
}, 500);