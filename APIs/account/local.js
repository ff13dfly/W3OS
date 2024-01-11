/* 
*  W3OS local account management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.new account by mnemonic
*  2.account JSON file storage
*  3.account management, more than one JSON file manangement
*/

import STORAGE from "../lib/storage.js";
import Error from "../system/error.js";

const Account={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        const keys = {
            "account": `account_list`,
        };
        STORAGE.setMap(keys);   //set the storage map, avoid to write without control
    },
    reg:()=>{
        return {
            get:["callback","integer"],
            set:["object","callback"],
            remove:["integer","callback"],
            load:["string","callback"],
            download:["password","callback","integer"]
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

    get:(ck,order)=>{
        const index=order===undefined?0:order;
        const fa = STORAGE.getKey("account");
        if(fa===false) return  ck && ck(Error.get("FAILED_TO_GET_STORAGE","system","Not account data."));
        if(fa===null){
            const saved=STORAGE.setKey("account",[]);       //init the account storage
            if(saved===false) return ck && ck(Error.get("FAILED_TO_SET_STORAGE","system"));
            return ck && ck(null);
        }else{
            return ck && ck(!fa[index]?null:fa[index]);
        }
    },

    set:(obj,ck,index)=>{
        //STORAGE.setKey("account", obj);

    },


    //load account from JSON file
    load:(file,ck)=>{

    },
    download:(password,ck,order)=>{
        const index=order===undefined?0:order;
        Account.get(()=>{
            //1.confirm the password the allow to download the json file

        },order);
    },
    remove:(order,ck)=>{
        STORAGE.removeKey("account");
        return true;
    },
    password:(addr,pass,ck)=>{

    },
}
export default Account;