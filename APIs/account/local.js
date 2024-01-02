/* 
*  W3OS local account management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.new account by mnemonic
*  2.account JSON file storage 
*/

import STORAGE from "../lib/storage";

const Account={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },

    reg:()=>{
        return {
            get:{
                ck:"callback"
            },
            load:{
                file:"string",
                ck:"callback",
            },
            download:{
                address:"address",
                password:"string",
                ck:"callback"
            }
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    
    get:(ck)=>{
        const fa = STORAGE.getKey("account");
        return ck && ck(fa);
    },
    //load account from JSON file
    load:(file,ck)=>{

    },
    //download target JSON file
    download:(addr,password,ck)=>{

    },
    remove:(addr,ck)=>{

    },
    password:(addr,pass,ck)=>{

    },
}
export default Account;