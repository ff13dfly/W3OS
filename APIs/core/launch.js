/* 
*  W3OS launch default SDK
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-05
*  @functions
*  1. load default SDKs from Anchor Network, such as @polkadot/api, anchorjs, easy
*/

const self={
    decode:(alink)=>{

    },
};

const Launch=(ws,libs,ck)=>{
    ws.onmessage=(res)=>{
        console.log(res);
    };
    //TODO, here to get the Anchor data from node directly.
    console.log(ws);
    console.log(libs);

    //ws.close();   //close websocket link after getting the SDKs
}
export default Launch;