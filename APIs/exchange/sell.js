/* 
*  W3OS coins selling
*  @auth [ ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.selling coins to different networks by AC ( Anchor Coin )
*  2.selling assets to different networks by AC ( Anchor Coin )
*/

//This is a pretty complex part

const Sell={
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
    selling:(mine,coin,amount,price,ck)=>{

    },
}
export default Sell;