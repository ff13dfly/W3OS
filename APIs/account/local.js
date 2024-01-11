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

const keys = {
    "account": `account_list`,
};

STORAGE.setMap(keys);

const Account={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        //console.log(`W3OS start,account_local running...`);
        STORAGE.setMap(keys);
        //STORAGE.setKey("account",[]);
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
        if(fa===null){
            STORAGE.setKey("account",[]);       //init the account storage
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