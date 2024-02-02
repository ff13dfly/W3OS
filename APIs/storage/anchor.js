/* 
*  W3OS anchor storage service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. save data to Anchor Network ( Easy Protocol )
*  2. get data from Anchor Network
*/

const self={

}

const Anchor={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            set:["string","string","callback"],
            get:["string","callback"]
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            set:2,       //need to check permit
            get:2,        
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    set:(key,val,ck)=>{

    },
    get:(key,ck)=>{

    },
}
export default Anchor;