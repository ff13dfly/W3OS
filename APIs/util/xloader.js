/* 
*  W3OS Anchor loader
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. load Dapps ( Not CDapps, these apps did not need W3 to run ) from Anchor Network
*  2. following Easy Protocol
*/

const self={

};

const Xloader={
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
export default Xloader;