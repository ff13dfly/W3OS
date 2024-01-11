/* 
*  W3OS IPFS service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. storage file to IPFS;
*  2. get file from IPFS;
*/

const IPFS={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },

    reg:()=>{
        return {
            get:["string","callback"],
            set:["string","string","callback"],
        }
    },
    permit:()=>{

    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    
    insert:()=>{

    },
    page:()=>{

    },
}
export default IPFS;