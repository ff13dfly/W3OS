/* 
*  W3OS coins buying
*  @auth [ ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.buy coins from different networks by AC ( Anchor Coin )
*  2.buy assets from different networks by AC ( Anchor Coin )
*/

//This is a pretty complex part

const Buy={
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
    price:(coin,ck)=>{

    },
}
export default Buy;