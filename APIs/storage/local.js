/* 
*  W3OS localstorage service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. save encried data to localstorage
*  2. get encried  data from localstorage
*/

import STORAGE from "../lib/storage.js";
import Error from "../system/error.js";

const self={

};



const LocalKV={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },

    reg:()=>{
        return {
            get:["string","callback"],
            set:["string","string","callback"],
        }
    },
    permit:()=>{

    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    set:(key,val,ck)=>{

    },
    get:(key,ck)=>{

    },
}
export default LocalKV;