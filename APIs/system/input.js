/* 
*  W3OS input management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. decode input;
*  2. manage input functions to call;
*/

import Error from "./error";

const map={}

const Input={
    reg:(key,fun)=>{
        if(!map[key]) return false;
        map[key]=fun;
        return true;
    },
    remove:(key)=>{
        
    },
}
export default Input;