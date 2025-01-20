/* 
*  W3OS service link management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. keep the links of different service, such as state;
*  2. set the links
*/

const router={
    IM:{        //instance message

    },
    GC:{        //group chat

    },
    RTC:{       //WebRTC service

    },
    TS:{        //transaction service

    },
    VS:{        //vertification service

    },
}

const Link={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            get:["string","string","callback"],
            remove:["string","callback"],
            status:["callback"]
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            get:2,       //need to check permit
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/

    //type: ["IM","GC","RTC","TS","VS"]
    get:(url,type,ck)=>{

    },
}
export default Link;