/* 
*  W3OS group chat service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. group management [ create, members, destory, announce, modification ]
*  2. group chat
*/

const Group={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{},
    reg:()=>{
        return {
            message:["ss58","gid","string","callback","string"],
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            list:2,       //need to check permit
            add:2,
            remove:2,   
            load:2,         
            download:2, 
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    create:()=>{

    },
    detail:()=>{

    },
    members:()=>{},
    join:()=>{},
    leave:()=>{},
    divert:()=>{},
    deport:()=>{},
    recover:()=>{},
    destory:()=>{},
    notice:()=>{},
    announce:()=>{},
    update:()=>{},
    message:(from,to,message,ck,type)=>{

    }
}
export default Group;