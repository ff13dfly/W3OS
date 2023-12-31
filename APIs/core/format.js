/* 
*  W3OS data structure
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @version 1.0.0
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

const hooks={
    reg:{       //reg module functions and parameters
        name:"reg",
        info:"Reg the parameters to W3OS, to check the input",
    },
    init:{
        name:"init",
        info:"Module autorun function, only one time."
    },
    permit:{
        name:"permit",
        info:"Module permission setting."
    },
};

const FORMAT={
    //get w3os data structure definition
    data:{
        get:(name)=>{
            if(!map[name]) return null;
            return map[name];
        },
    },
    //get w3os agent definition
    agent:{
        get:(name)=>{
        
        },
    },
    hook:hooks,
}
export default FORMAT;