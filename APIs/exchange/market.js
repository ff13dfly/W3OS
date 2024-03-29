/* 
*  W3OS market management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.get selling price of different coins/tokens
*  2.link to the current market
*/


//binance referral
//https://www.binance.com/zh-CN/activity/referral/offers

//CPA_00HTH25YVX
//https://www.binance.com/zh-CN/activity/referral-entry/CPA?ref=CPA_00HTH25YVX

//different market router.
const router={

};

const Market={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            list:["string[]"],
            exchange:["string"],
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
    list:(page,ck)=>{

    },
    exchange:(mine,from,to,ck)=>{

    },
}
export default Market;