/* 
*  W3OS data structure
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*/

const map={
    contact:{
        short: "",
        intro: "",
        status: 1,          //account status [1.normal, 0.removed, 3.pending ]
        type: "friend",
        network: "anchor"   //network name
    },
    stranger:{
        short: "",
        intro: "",
        status: 1,          //account status [1.normal, 0.removed, 3.pending ]
        type: "stranger",
        network: "anchor",  //network name
    },
    message:{},
    payment:{},
}

const Formate={
    get:(name)=>{
        if(!map[name]) return null;
        return map[name];
    },
}
export default Formate;