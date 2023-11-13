//!important, all standard format here, three parts: storage data structure, internal task format, error
//!important, be very careful to modify here.

//Internal Task Format
//Websocket server will decode these rows to do the real actions
const task={
    "message":{
        action:"message",
        params:{
            act:"chat",                 //frontend need this to render
            cat:"chat",
            msg:"CHAT_CONTENT",
            from:"SS58_ACCOUNT",
            to:"SS58_ACCOUNT",
        },
    },
    "notice":{
        action:"notice",
        params:{
            act:"notice",
            cat:"chat",
            msg:{},
            from:"System",
            to:"SS58_ACCOUNT",
            method:{},
        },
    },
}

//Storage Data Structure
//The data storaged on server standard format
const storage={

    //group data structure storage on server
    group:{         
        id:"",              //group unique id
        group:[],           //group account list
        status:1,           //group status
        create:0,           //group create time
        update:0,           //group update time
        notice:[],          //announce list
        manager:"",         //group manager, only this one can destory the group
        founder:"",         //group init account
        announce:{          //group announce setting
            content:"",     //announce content
            expired:0,      //the announce expired time
        },
        permit:{            //permit setting
            free:true,      //free to join
            announce:false, //free to set notice
        }, 
        block:[],           //block list         
    },

    //account setting on server
    account:{                   //account setting after vertification
        expired:0,              //message expired on server
        block_stranger:false,   //wether block stranger
    },

    //chat message format, both on server and send to client
    chat:{
        from:"",            //SS58 message sender
        to:"",              //SS58 message acceptor / group id ( 12 bytes)
        msg:"",             //Chat content
        expired:0,          //Message expire time, if not sent
    },

    //notice format, both on server and send to client
    notice:{
        to:"",              //SS58 message acceptor
        type:"",            //
        msg:"",             //Chat content
        expired:0,          //Message expire time, if not sent
        method:{
            act:"",
            cat:"",
            from:"",        //if there is sender, put here
        },
    },
}

//Websocket API calls parameters
const APIs={
    group:{
        create:{
            cat:"group",
            act:"create",
            list:[],                //SS58 list
            spam:"",
        },
        join:{
            cat:"group",
            act:"join",
            id:"",
            account:"",
            spam:"",
        },
        leave:{
            cat:"group",
            act:"leave",
            id:"",
            spam:"",
        },
        divert:{
            cat:"group",
            act:"divert",
            id:"",
            spam:"",
        },
        deport:{
            cat:"group",
            act:"divert",
            acc:"",             //SS58 account need to block
            spam:"",
        },
        destory:{
            cat:"group",
            act:"divert",
            id:"", 
            spam:"",
        },

        message:{
            cat:"group",
            act:"message",
            id:"",
            ctx:"",
            spam:"",
        },

        notice:{
            cat:"group",
            act:"notice",
            id:"",
            ctx:"",
            spam:"",
        },

        announce:{
            cat:"group",
            act:"announce",
            id:"",
            ctx:"",
            start:0,
            expired:0,
            spam:"",
        }
    }
}

//Error
//All error collected here.
const errors={
    "SYSTEM_INVALID_REQUEST":{
        error:"Invalid request.",
        code:41400,
    },

    "INPUT_MISSING_PARAMETERS":{
        error:"Missing parameters.",
        code:44001,
    },

    "INPUT_INVALID_ACCOUNT":{
        error:"Invalid SS58 account format.",
        code:44009,
    },

    "INPUT_INVALID_GROUP_ID":{
        error:"Invalid Group ID.",
        code:44100,
    },

    "INPUT_UNEXCEPT":{
        error:"Invalid Group ID.",
        code:44744,
    },
}

module.exports={
    format:(type)=>{
        if(!storage[type]) return false;
        return JSON.parse(JSON.stringify(storage[type]));
    },
    task:(type)=>{
        if(!task[type]) return false;
        return JSON.parse(JSON.stringify(task[type]));
    },
    error:(type,toString)=>{
        if(!errors[type]) return false;
        return !toString?JSON.parse(JSON.stringify(errors[type])):JSON.stringify(errors[type]);
    },
    params:(cat,action)=>{
        if(!task[cat] || task[cat][action]) return false;
        return JSON.parse(JSON.stringify(task[cat][action]));
    }
}