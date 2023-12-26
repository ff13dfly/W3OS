/* 
*  contacts part: stranger
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.strangers [add, remove, update, list&view ]
*  2.storaged on localstorage and encried. 
*/

const format = {
    short: "",
    intro: "",
    status: 1,          //account status [1.normal, 0.removed, 3.pending ]
    type: "stranger",
    network: "anchor",  //network name
};

const Stranger = {
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{

    },

    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    list: (ming, page) => {

    },
    add: (mine, addr) => {

    },
    remove: (mine, addr) => {

    },
    to: (mine, addr) => {

    },
    update: (mine, addr, data) => {

    },

    //The basic data structure of friend
    format: () => {
        return JSON.parse(JSON.stringify(format));
    },
}
export default Stranger;