/* 
*  W3OS anchor lib loader
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. load SDK from Anchor Network
*/

const Loader={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        console.log(`W3OS start,system_loader running...`);
    },
    reg:()=>{
        return {
            get:["string","callback"],
            run:["string","callback"]
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            get:1,    //no need to check permit
            run:1,    //no nedd to check permit
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    
    get:(name,ck)=>{    //get the target SDK, system will check wether support
        console.log(`name: ${name}`);
    },
    run:(name,ck)=>{

    },
}
export default Loader;