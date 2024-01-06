/* 
*  W3OS system status
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*/

//Basic system status
let SYSTEM_STATUS=0;

const map={
    0:{
        msg:"W3OS init status.",
    },
    1:{
        msg:"W3OS system start and work perfect.",
    },
    2:{
        msg:"W3OS system start but do not get the basic SDK yet.",
    },
    6:{
        msg:"W3OS is pending, ask for permission normally.",
    },
    4:{
        msg:"W3OS inner error, system done.",
    },
    9:{
        msg:"",
    },
};

//The listener of system status
const queue={}

const Status={
    code:()=>{
        return SYSTEM_STATUS;
    },
    get:(index)=>{
        if(!map[index]) return null;
        return map[index];
    },
    listen:(key,fun)=>{
        if(!queue[key]){
            queue[key]=fun;
        }else{
            delete queue[k];
            queue[key]=fun;
        }
    },
    remove:(key)=>{
        
    },
    
    //switch the system status
    flip:(code)=>{
        SYSTEM_STATUS=parseInt(code);
    },
}
export default Status;