/* 
*  W3OS system root account management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-08
*  @functions
*  1. system login management, when start the W3OS API, will check the login password
*/

import STORAGE from "../lib/storage.js";
import tools from "../lib/tools.js";

const keys ={
    "salt":"root_salt",
    "vertify":"root_vertify",
};

const self={
    salt:()=>{      //function to create a random string
        let str=tools.char(9);
        for(let i=0;i<6;i++){
            str+=tools.rand(0,9);
        }
        str+=tools.char(9);
        return str;
    },
};


const Root={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        console.log(`W3OS start,account_root running...`);
        STORAGE.setMap(keys);

        //1.check wether local salt, if not, create one
        STORAGE.setIgnore(["salt", "vertify"]); //public data;
        if (STORAGE.getKey("salt") === null) STORAGE.setKey("salt", self.salt());
    },
    reg:()=>{
        return {
            set:["string","callback"],
            reset:[],
            login:["callback"],
        }
    },
    permit:()=>{

    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/

    login:(ck)=>{       //login to W3OS system
        
        if (STORAGE.getKey("vertify") !== null){

        }
    },
    set:(pass,ck)=>{
        
    },
    reset:()=>{
        STORAGE.removeKey("salt");
        STORAGE.removeKey("vertify");
        return true;
    },
}
export default Root;