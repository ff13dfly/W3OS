/* 
*  W3OS error definition
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. definition of errors
*  2. decode different errors
*/

import Userinterface from "./userinterface";

const errs={
    core:{
        "NO_ERROR_DETAILS":{
            code:40000,
            msg:"The first W3.call parameter should be the type of Object, Array or String, and not null.",
        },
        "INVALID_CALL_PATH":{
            code:40001,
            msg:"The first W3.call parameter should be the type of Object, Array or String.",
        },
        "INVALID_CALL_OBJECT":{
            code:40002,
            msg:"The first W3.call parameter object is invalid, please check.",
        },
        "INVALID_CALL_ANCHOR_LINK":{
            code:40003,
            msg:"The first W3.call parameter invalid object anchor link .",
        },
    },
    system:{
        "INVALID_INPUT":{
            code:40110,
            msg:"",
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
    },
    get:(name,cat)=>{
        if(cat===undefined) cat="system";
        if(!errs[cat] || !errs[cat][name]) return null;
        return errs[cat][name];
    },
    
    decode:(code)=>{

    },

    //core error, thrown to console directly
    throw:(name,cat)=>{
        if(cat===undefined) cat="system";
        if(!errs[cat] || !errs[cat][name]) return Userinterface.debug(errs.core.NO_ERROR_DETAILS,"error");;
        Userinterface.debug(errs[cat][name],"error");
    },
}
export default Error;