/* 
*  W3OS data structure
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @version 1.0.0
*  @functions
*/

const map={
    friend:{
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
    app:{},
    message:{},
    payment:{},
    node:{
        linker:null,
        //status:2,               //[ 0,not yet; 1.normal; 2.pendding; 4.failed; ]
        type:"websocket",       //["websocket","http"]
        start:0,                //timestamp of 
        //creator:"",             //alink as creator
    },
    service:{       //service definition
        name:"",                //short name of service, ["IM","GC","VS", ... ]
        desc:"",                //description of service
        node:[],
    },
    websocket:{     //websocket standard
        act:"",             //action of this websocket message
        index:0,            //message index, if need order, this is important
        params:{}           //params that is sent to server
    },
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

//difinition of hooks
const hooks={
    register:{       //reg module functions and parameters
        name:"reg",
        info:"Reg the parameters to W3OS, to check the input",
    },
    initialization:{
        name:"init",
        info:"Module autorun function, only one time."
    },
    permission:{
        name:"permit",
        info:"Module permission setting."
    },
};

const FORMAT={
    //get w3os data structure definition
    data:{
        get:(name)=>{
            if(!map[name]) return null;
            return JSON.parse(JSON.stringify(map[name]));
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