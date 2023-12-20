const PRICE={
  init:(ck)=>{
    const uri="wss://ws.coincap.io/prices?assets=bitcoin,ethereum,kusama,polkadot";
    const wsPrice = new WebSocket(uri)
    wsPrice.onmessage = function (msg) {
        try {
          const map=JSON.parse(msg.data);
          return ck && ck(map);
        } catch (error) {
          return ck && ck(false);
        }
    }
  },
  more:(ck)=>{
    const uri="wss://ws.coincap.io/prices";
    const wsPrice = new WebSocket(uri)
    wsPrice.onmessage = function (msg) {
        try {
          const map=JSON.parse(msg.data);
          return ck && ck(map);
        } catch (error) {
          return ck && ck(false);
        }
    }
  },
}

export default PRICE;