/* 
*  W3OS payment function
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. pay AC ( Anchor Coins ) to target SS58 account and record it.
*  2. get the transaction list of your account
*/

const Pay={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },
    reg:()=>{
        return {
            to:["ss58","ss58","integer","callback"],
            list:["ss58"],
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
    to:(mine,addr,amount,ck)=>{
        

    },
    list:(mine)=>{

    },
}
export default Pay;