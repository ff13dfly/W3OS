/* 
*  W3OS parameters checker
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-02
*  @version 1.0.0
*  @functions
*  1.check valid of parameters
*  2. array support. For example, type "[string]" define means the params are all string
*/

import Error from "../system/error.js";

const router={
    callback:(param)=>{
        if(param===undefined) return true
        if(typeof param === 'function') return true;
        return false;
    },
    string:(param)=>{
        //console.log(`Checking ${param}`)
        if(typeof param !== 'string') return false;
        return true;
    },
    function:(param)=>{
        if(typeof param !== 'function') return false;
        return true;
    },
    integer:(param)=>{
        if(!Number.isInteger(param)) return false;
        return true;
    },
    ss58:(param)=>{
        if(param.length!==48) return false;
        //TODO, need to check the SS58 account by Polkadot suggestion

        return true;
    },
    alink:(param)=>{
        const prefix="anchor://";
        if(param.length<=prefix.length) return false;
        const str=param.toLocaleLowerCase();
        const head=str.substring(0,prefix.length);

        if(head!==prefix)  return false;
        return true;
    },
}

//Checker(value,type)
//Checker(value[],type[])

const Checker=(input,type)=>{
    if(Array.isArray(type)){
        if(!Array.isArray(input)) return Error.get("INVALID_INPUT","system",`Wrong input to check.`);
        for(let i=0;i<input.length;i++){
            const param=!input[i]?undefined:input[i],tp=type[i];
            if(!router[tp]) return Error.get("INVALID_INPUT","system",`No such type: ${tp}, index: ${i}`);
            if(!router[tp](param)){
                return Error.get("INVALID_INPUT","system",`Param is not such type: ${tp}, index: ${i}`);
            }
        }
        return true;
    }else{
        if(!router[type]) return Error.get("INVALID_INPUT","system",`No such type: ${type}`);
        return router[type](input);
    }
}
export default Checker;