/* 
*  W3OS anchor lib loader
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. load SDK from Anchor Network
*/

import tools from "../lib/tools.js";

const code={};      //cache the Anchor SDK code here

const self={

};

const Loader={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        console.log(`W3OS start,system_loader running...`);
    },
    reg:()=>{
        return {
            get:["string","callback"],
            run:["string","callback"],
            map:["[string]"],
        };
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            get:1,    //no need to check permit
            run:1,    //no nedd to check permit
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    
    get:(name,ck)=>{    //get the target SDK, system will check wether support
        console.log(`name: ${name}`);
        return ck && ck();
    },
    run:(name,ck)=>{

    },
    map:(list,ck)=>{
        for(let i=0;i<list.length;i++){
            const name=list[i];
            code[name]={support:true,create:tools.stamp()}
        }
        return ck && ck(true);
    },
}
export default Loader;