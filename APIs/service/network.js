/* 
*  Management of different blockchain networks
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. keep the state of different blockchain networks
*  2. network nodes management
*/

const map={};       //network cache

const Network={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            get:["string","callback","string","string"],
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

    //create the linker to target network
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
export default Network;