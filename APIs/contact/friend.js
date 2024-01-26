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

const fcfg={
    prefix:"friend",
}

const self={
    isAdded:(addr,list)=>{
        const checker={}
        for(let i=0;i<list.length;i++){
            const row=list[i];
            checker[row.address]=i;
        }
        return checker[addr]===undefined?false:checker[addr];
    },
    setKeys:(mine)=>{
        const key=`${fcfg.prefix}_${mine}`;
        const keys = {};
        keys[key]=`${fcfg.prefix}_list_${mine}`;
        STORAGE.setMap(keys);
        return key;
    },
}

const Friend={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{},
    reg:()=>{
        return {
            list:["ss58","callback","integer","integer"],
            add:["ss58","ss58","callback"],
            remove:["ss58","ss58","callback"],
            update:["ss58","ss58","kv","callback"],
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            list:2,       //need to check permit
            add:2,
            remove:2,   
            load:2,         
            download:2, 
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    list:(mine,ck,page,step)=>{
        const key=self.setKeys(mine);

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
    add:(mine,addr,ck)=>{
        const key=self.setKeys(mine);

        const data=FORMAT.data.get("friend");
        data.address=addr;
        //console.log(data);

        const list = STORAGE.getKey(key);
        const index=self.isAdded(addr,list);
        if(index!==false) return ck && ck(Error.get("FAILED_TO_SET_STORAGE","system","Already exsist"));
        list.unshift(data);
        STORAGE.setKey(key,list);
        return ck && ck(data);
    },
    remove:(mine,addr,ck)=>{
        const key=self.setKeys(mine);
        const list = STORAGE.getKey(key);
        //console.log(list);
        const index=self.isAdded(addr,list);
        //console.log(index);
        if(index===false) return ck && ck(Error.get("FAILED_TO_SET_STORAGE","system","No such account"));

        const nlist=[];
        for(let i=0;i<list.length;i++){
            if(i!==index) nlist.push(list[i]);
        }
        STORAGE.setKey(key,nlist);
        return ck && ck(true);
    },
    update:(mine,addr,data,ck)=>{
        const key=self.setKeys(mine);
        const list = STORAGE.getKey(key);
        const index=self.isAdded(addr,list);
        if(index===false) return ck && ck(Error.get("FAILED_TO_SET_STORAGE","system","No such account"));

        for(let k in list[index]){
            if(data[k]!==undefined) list[index][k]=data[k];
        }
        STORAGE.setKey(key,list);
        return ck && ck(list[index]);
    },
}
export default Friend;