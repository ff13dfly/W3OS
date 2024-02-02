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

const router={      //different router to manage the link
    polkadot:(url,ck)=>{

    },
    kusama:(url,ck)=>{

    },
    solana:(url,ck)=>{

    },
    bitcoin:(url,ck)=>{

    },
}


const self={
    //try to check the type by url.
    getType:(url)=>{
        const arr=url.split("://");
        const types={
            "ws":"websocket",
            "wss":"websocket",
            "http":"web",
            "https":"web"
        }
        if(arr.length!==2) return false;
        if(types[arr[0]]) return types[arr[0]];
        return false;
    },
    webLinker:(url,ck)=>{

    },
    websocketLinker:(url,ck)=>{
        const linker=new WebSocket(url);
        linker.onopen=(res)=>{
            console.log(res);
            const data=FORMAT.data.get("node");
            data.linker=linker;
            data.start=tools.stamp();
            data.type="websocket";
            map[url]=data;
            return ck && ck(map[url]);
        };
        linker.onclose=(res)=>{
            Error.throw("NETWORK_CLOSED","system",`${url} is closed.`);
            delete map[url];
        };
        linker.onerror=(res)=>{
            Error.throw("NETWORK_ERROR","system",`Error message from ${url}, data:${JSON.stringify(res)}`);
        };
    },
}


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
        if(map[url]!==undefined) return ck && ck(map[url]);
        //1.create link by network type at first
        if(network!==undefined){
            if(!router[network]) return ck && ck(Error.get("NETWORK_NOT_SUPPORT","system",`${network} is not support yet.`));
            router[network](url,ck);
        }else{
            //2.no type and no network, try websocket first
            const tp=type===undefined?self.getType(url):type;
            if(tp===false) return ck && ck(Error.get("INVALID_INPUT","system",`Unknown web protocol.`));

            switch (tp) {
                case 'websocket':
                    self.websocketLinker(url,ck);
                    break;

                case 'web':
                    //self.websocketLinker(url,ck);
                    break;
            
                default:
                    break;
            }
        }
    },
    remove:(url,ck)=>{

    },
    status:(ck)=>{

    },
}
export default Network;