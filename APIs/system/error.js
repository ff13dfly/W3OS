/* 
*  W3OS error definition
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. definition of errors
*  2. decode different errors
*/

import Userinterface from "./userinterface.js";

const errs={
    core:{
        "NO_ERROR_DETAILS":{
            code:40000,
            msg:"The first W3.call parameter should be the type of Object, Array or String, and not null.",
        },
        "INVALID_CALL_PATH":{
            code:40001,
            msg:"This parameter should be the type of Object, Array or String.",
        },
        "INVALID_CALL_OBJECT":{
            code:40002,
            msg:"The first W3.call parameter object is invalid, please check.",
        },
        "INVALID_ANCHOR_LINK":{
            code:40003,
            msg:"Invalid anchor link .",
        },
        "NO_ACTIVE_NODE":{
            code:40003,
            msg:"Failed to link to Anchor Network nodes, please try later.",
        },
        "UNKNOWN_CALL":{
            code:40010,
            msg:"Unrecongnized call module.",
        },
        "UNDER_DEVELOPPING":{
            code:77777,
            msg:"This function is under developping. Why do you know this? ",
        },
    },
    system:{
        
        "INVALID_INPUT":{
            code:40110,
            msg:"Please check the input vallues.",
        },
        "USER_REJECT_ACTION":{
            code:40111,
            msg:"User reject the action.",
        },
        "DECODER_IS_NOT_READY":{
            code:40120,
            msg:"System decoder of Anchor Network is not ready yet.",
        },
        
    },
    message:{
        
    },
    payment:{

    },
};
const map={};

const Error={
    init:()=>{
        //console.log(`W3OS start,error running, need to create the code map...`);

        //1.create the map of code -> ERROR_NAME
        for(var cat in errs){
            const rows=errs[cat];
            for(var name in rows){
                const row=rows[name];
                map[row.code]=name;
            }
        }
    },

    get:(name,cat,ext)=>{
        if(cat===undefined) cat="system";
        if(!errs[cat] || !errs[cat][name]) return null;
        const err=JSON.parse(JSON.stringify(errs[cat][name]));
        if(ext) err.ext=ext;    //extend the error message;
        return  err;
    },
    
    decode:(code)=>{

    },

    //core error, thrown to console directly
    throw:(name,cat,ext)=>{
        if(cat===undefined) cat="system";
        if(!errs[cat] || !errs[cat][name]){
            return Userinterface.debug(Error.get("NO_ERROR_DETAILS","core"),"error",true); 
        } 
        return Userinterface.debug(Error.get(name,cat,ext),"error",true);
    },
}
export default Error;