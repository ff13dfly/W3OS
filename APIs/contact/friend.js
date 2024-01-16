/* 
*  contacts part: friend
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.contacts [add, remove, update, list&view ]
*  2.storaged on localstorage and encried. 
*/

import STORAGE from "../lib/storage.js";
import Error from "../system/error.js";
import FORMAT from "../core/format.js";

//TODO, need to define very well
//data structure of friend
const format={
    short: "",
    intro: "",
    status: 1,          //account status [1.normal, 0.removed, 3.pending ]
    type: "friend",
    network: "anchor"   //network name
};

const Friend={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        // const keys = {
        //     "friend": `friend_list`,
        // };
        // STORAGE.setMap(keys);   //set the storage map, avoid to write without control
    },

    reg:()=>{
        return {
            list:["ss58","callback","integer","integer"],
            add:["ss58","ss58","callback"],
            update:["callback"],
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
    list:(mine,ck,page,step)=>{
        const key=`friend_${mine}`;

        const keys = {};
        keys[key]=`friend_list_${mine}`;
        STORAGE.setMap(keys);

        //const index=order===undefined?0:order;
        const list = STORAGE.getKey(key);
        //if(list===false) return  ck && ck(Error.get("FAILED_TO_GET_STORAGE","system",`Not friend list of ${mine}`));
        if(list===null || list===false){
            const saved=STORAGE.setKey(key,[]);       //init the friend list
            if(saved===false) return ck && ck(Error.get("FAILED_TO_SET_STORAGE","system","Try to set storage but failed"));
            return ck && ck(null);
        }else{
            if(page===undefined) return ck && ck(list);
            const p=parseInt(page);
            const s=step===undefined?16:parseInt(step);
            if(list.length<p*step) return ck && ck(null);

            //TODO,page the friend list 
            return ck && ck(list);
        }
    },
    add:(mine,address,ck)=>{
        const data=FORMAT.data.get("friend");
        console.log(data);
    },
    remove:(mine,addr)=>{

    },
    update:(mine,addr,data)=>{

    },

    //The basic data structure of friend
    format:()=>{
        return JSON.parse(JSON.stringify(format));
    },
}
export default Friend;