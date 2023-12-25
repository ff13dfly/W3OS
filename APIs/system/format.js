/* 
*  W3OS data structure
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
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
    app:{
        
    },
    message:{},
    payment:{},
}

const agent={
    userinterface:{

    },
    startup:{
        init:{
            salt:"",            //encry salt
            login:()=>{},       //login fun from UI side
            render:()=>{},      //render fun from UI side
        },
    }
}

const Formate={
    //get w3os data structure definition
    get:(name)=>{
        if(!map[name]) return null;
        return map[name];
    },
    //get w3os agent definition
    agent:(name)=>{
        
    },
}
export default Formate;