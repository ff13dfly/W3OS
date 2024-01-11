/* 
*  W3OS local database service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. encry the data and save to local database;
*  2. get the data from local database;
*/

const DB={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },

    reg:()=>{
        return {
            get:["string","callback"],
            set:["string","string","callback"],
        }
    },
    permit:()=>{

    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    insert:()=>{

    },
    page:()=>{

    },
}
export default DB;