/* 
*  W3OS system status
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*/

const map={
    0:{

    },
    4:{

    },
    9:{

    },
};

//The listener of system status
const queue={}

const Status={
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
}
export default Status;