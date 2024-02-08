/* 
*  W3OS NFT support
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-02-08
*  @functions
*  1.create iNFT ( Identifiable NFT ) from single png file
*  2.base on Anchor, sold just one time
*/

const self={
    
}

const NFT={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            view:["alink","callback"],
            source:["file","number[]","number[]","callback"],
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

    //review the iNFT.
    view:(alink,ck)=>{

    },

    //write the image resource to chain
    source:(file,cell,size,ck)=>{

    },

    //mint an iNFT from "tpl" by target "source"
    mint:(tpl,source,ck)=>{

    },
}
export default NFT;