/* 
*  W3OS Anchor loader
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. convert web2.0 project to Anchors and deploy on chain.
*/

const self={

};

const Convertor={
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

    check:(folder,ck)=>{

    },
    run:(folder,ck)=>{

    },
    write:(folder,ck)=>{

    },
}
export default Convertor;