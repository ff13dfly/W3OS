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

const prefix="w3api";
const keys = {
    account: `${prefix}_account_file`,
    stranger: `${prefix}_stranger_list`,
    apps: `${prefix}_apps_list`,
    salt: `${prefix}_salt`,
    vertify: `${prefix}_check`,
};
STORAGE.setMap(keys);

let active_address="";          //active account.

const Account={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        console.log(`W3OS start,account_local running...`);
    },
    reg:()=>{
        return {
            get:["callback"],
            set:["object","callback"],
            remove:["callback"],
            load:["string","callback"],
            download:["address","string","callback"]
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
    
    get:(ck)=>{
        // const fa = STORAGE.getKey("account");
        // return ck && ck(fa);
        //const fa={address:"aaa",metadata:{}};

        const fa = STORAGE.getKey("account");
        return ck && ck(fa);
    },
    set:(obj,ck)=>{
        STORAGE.setKey("account", obj);
    },
    //load account from JSON file
    load:(file,ck)=>{

    },
    //download target JSON file
    download:(addr,password,ck)=>{

    },
    remove:(ck)=>{
        STORAGE.removeKey("account");
        return true;
    },
    password:(addr,pass,ck)=>{

    },
}
export default Account;