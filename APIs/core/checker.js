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

//different type of data checker
const router={
    callback:(param,isArray)=>{
        if(param===undefined) return true
        if(typeof param === 'function') return true;
        return false;
    },
    string:(param,isArray)=>{
        if(typeof param !== 'string') return false;
        return true;
    },
    password:(param,isArray)=>{
        if(typeof param !== 'string') return false;
        if(param.length>64) return false;
        return true;
    },
    function:(param,isArray)=>{
        if(typeof param !== 'function') return false;
        return true;
    },
    integer:(param,isArray)=>{
        if(!Number.isInteger(param)) return false;
        return true;
    },
    ss58:(param,isArray)=>{
        if(param.length!==48) return false;
        //TODO, need to check the SS58 account by Polkadot suggestion

        return true;
    },
    gid:(param,isArray)=>{      //group ID check
        return true;
    },
    kv:(param,isArray)=>{   //one levev key-value object
        return true;
    },
    alink:(param,isArray)=>{
        const prefix="anchor://";
        if(param.length<=prefix.length) return false;
        const str=param.toLocaleLowerCase();
        const head=str.substring(0,prefix.length);

        if(head!==prefix)  return false;
        return true;
    },
}

const self={
    //check wether type array, for example, "string[]" means the input param are ["string","string"]
    isTypeArray:(type)=>{
        //TODO, here to check wether array type.
        return false
    },
}

/* check the data type
* support array to check, call as follow
* @param input any || any[]         //the input need to check
* @param type  string || string[]   //the defined input data type
* return 
* true || false
*/
const Checker=(input,type)=>{
    //console.log(input,type);
    if(Array.isArray(type)){
        if(!Array.isArray(input)) return Error.get("INVALID_INPUT","system",`Wrong input to check.`);
        for(let i=0;i<input.length;i++){
            const param=input[i]!==undefined?input[i]:undefined,tp=type[i];
            if(!router[tp]) return Error.get("INVALID_INPUT","system",`No such type: ${tp}, index: ${i}`);
            const is=self.isTypeArray(tp);
            if(!router[tp](param,is)){
                return Error.get("INVALID_INPUT","system",`Param is not such type: ${tp}, index: ${i}`);
            }
        }
        return true;
    }else{
        if(!router[type]) return Error.get("INVALID_INPUT","system",`No such type: ${type}`);
        const is=self.isTypeArray(type);
        return router[type](input);
    }
}
export default Checker;