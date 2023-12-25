/* 
*  contacts part: friend
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.contacts [add, remove, update, list&view ]
*  2.storaged on localstorage and encried. 
*/

//TODO, need to define very well
//data structure of friend
const format={
    short: "",
    intro: "",
    status: 1,          //account status [1.normal, 0.removed, 3.pending ]
    type: "friend",
    network: "anchor"   //network name
};

const Friend={
    list:(ming,page)=>{

    },
    add:(mine,address)=>{
    
    },
    remove:(mine,addr)=>{

    },
    update:(mine,addr,data)=>{

    },

    //The basic data structure of friend
    format:()=>{
        return JSON.parse(JSON.stringify(format));
    },
}
export default Friend;