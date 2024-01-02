/* 
*  W3OS wallet management
*  @auth [ ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.link to different wallets
*  2.get the related local account 
*/

//# Metamask API document
//https://docs.metamask.io/wallet/

const Wallet={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{
        console.log(`W3OS start,account_wallet running...`);
    },
    reg:()=>{
        return {
            launch:["string","callback"]
        }
    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    launch:()=>{

    },
}
export default Wallet;