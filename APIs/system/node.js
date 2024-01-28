/* 
*  W3OS nodes management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. keep the link to Anchor Network.
*/

import Error from "../system/error.js";

//storage the network status
const map={

}

const router={      //different router to manage the link
    polkadot:{
        get:(url,ck)=>{

        },
    },
    kusama:{
        get:(url,ck)=>{

        },
    },
    solana:{
        get:(url,ck)=>{

        },
    },
}


const Node={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            get:["string","callback","string","string"],
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            get:2,       //need to check permit
            load:2,         
            download:2, 
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/

    //create the websocket for url
    get:(url,ck,type,network)=>{
        if(map[url]) return ck && ck(map[url]);

        console.log(url,type,network);

        // const way=network===undefined?"polkadot":network;
        // if(!router[way]) return ck && ck(Error.get("NETWORK_NOT_SUPPORT","system",`${network} is not support yet.`));
        // router[way](url,ck);
    },
    remove:(url,ck)=>{

    },
    status:(ck)=>{

    },
}
export default Node;