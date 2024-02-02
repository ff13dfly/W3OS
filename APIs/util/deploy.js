/* 
*  W3OS Anchor Deploy of SDK
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-30
*  @functions
*  1. deploy SDK to Anchor Network by following Easy Protocol. NodeJS support only.
*  2. auto package SDK by Esbuild.
*/

const self={

};

const Deploy={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            price:["string[]"],
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
    get:(alink,ck)=>{

    },
    run:(alink,ck)=>{

    },
}
export default Deploy;