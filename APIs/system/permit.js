/* 
*  W3OS permit management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-28
*  @functions
*  1. save the user permit setting
*  2. check the Dapps permit of system functions
*/

import STORAGE from "../lib/storage.js";
import Error from "../system/error.js";

const self={
    set:(acc,anchor,value,ck)=>{

    },
};

const Permit={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        const keys = {
            "permit": `permit_list`,
        };
        STORAGE.setMap(keys);   //set the storage map, avoid to write without control
    },

    reg:()=>{
        return {
            get:["callback","ss58"],
            check:["alink","callback","ss58"],
        }
    },

    //check customer permission of dapps ( by anchor name ) 
    check:(alink,ck,acc)=>{

    },
    get:(ck,acc)=>{

    },
}
export default Permit;