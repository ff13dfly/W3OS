/* 
*  W3OS NFT support
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-02-08
*  @functions
*  1.create NFT from single png file
*  2.base on Anchor, sold just one time
*/

const NFT={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            view:["alink","callback"],
            mint:["string","alink","callback"],
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            get:2,       //need to check permit
            load:2,         
            download:2, 
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    view:(alink,ck)=>{

    },
    mint:(name,source,ck)=>{

    },
}
export default NFT;