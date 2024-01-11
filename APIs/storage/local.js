/* 
*  W3OS localstorage service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. save encried data to localstorage
*  2. get encried  data from localstorage
*/


import Encry from "../lib/encry.js";
import tools from "../lib/tools.js";

const self={

};

const Anchor={
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
export default Anchor;