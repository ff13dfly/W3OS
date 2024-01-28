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
            list:["ss58","callback","integer","integer"],
            add:["ss58","ss58","callback"],
            remove:["ss58","ss58","callback"],
            update:["ss58","ss58","kv","callback"],
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
    asset:(list,ck)=>{

    }
}
export default Group;