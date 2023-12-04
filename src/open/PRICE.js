import RUNTIME from "../lib/runtime";
import INDEXED from "../lib/indexed";
import tools from "../lib/tools";




const PRICE={
  init:()=>{
    const uri="wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin";
    const wsPrice = new WebSocket(uri)
    wsPrice.onmessage = function (msg) {
        console.log(msg.data)
    }
  },
}

export default PRICE;