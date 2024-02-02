/* 
*  W3OS nodes management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. keep the link to Anchor Network.
*/

import Error from "../system/error.js";
import FORMAT from "../core/format.js";
import tools from "../lib/tools.js";

//storage the network status
const map={}
const self={
    
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
            subcribe:["string","function","string[]"],
            remove:["string","callback"],
            status:["callback"]
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

    //create wsAPI of different nodes.
    get:(ck)=>{
        //1.get target server list anchor
    },

    //subcribe different type data from Anchor network
    subcribe:(name,fun,types)=>{

    },
    remove:(url,ck)=>{

    },
    status:(ck)=>{

    },
}
export default Node;