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
            error:40000,
            msg:"The first W3.call parameter should be the type of Object, Array or String, and not null.",
        },
        "INVALID_CALL_PATH":{
            error:40001,
            msg:"This parameter should be the type of Object, Array or String.",
        },
        "INVALID_CALL_OBJECT":{
            error:40002,
            msg:"The first W3.call parameter object is invalid, please check.",
        },
        "INVALID_ANCHOR_LINK":{
            error:40003,
            msg:"Invalid anchor link .",
        },
        "NO_ACTIVE_NODE":{
            error:40004,
            msg:"Failed to link to Anchor Network nodes, please try later.",
        },
        "FAILED_LOGIN":{
            error:40005,
            msg:"Failed login, please fresh to try.",
        },
        "UNKNOWN_CALL":{
            error:40010,
            msg:"Unrecongnized call module.",
        },
        "UNDER_DEVELOPPING":{
            error:77777,
            msg:"This function is under developping. Why do you know this? ",
        },
    },
    system:{
        
        "INVALID_INPUT":{
            error:40110,
            msg:"Please check the input vallues.",
        },
        "USER_REJECT_ACTION":{
            error:40111,
            msg:"User reject the action.",
        },
        "FAILED_SAVE_SETTING":{
            error:40114,
            msg:"Failed to save the setting, please check the env.",
        },
        "DECODER_IS_NOT_READY":{
            error:40120,
            msg:"System decoder of Anchor Network is not ready yet.",
        },

        "FAILED_TO_GET_STORAGE":{
            error:40130,
            msg:"Can not get the target storage.",
        },
        "FAILED_TO_SET_STORAGE":{
            error:40131,
            msg:"Failed to set storage, please confirm the login status.",
        },
        "NETWORK_NOT_SUPPORT":{
            error:40140,
            msg:"Network is not support by W3OS right now.",
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
                map[row.error]=name;
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