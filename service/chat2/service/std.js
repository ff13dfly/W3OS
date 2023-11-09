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
    "notification":{
        action:"notification",
        params:{
            act:"notification",
            cat:"chat",
            msg:{},
            from:"System",
            to:"SS58_ACCOUNT",
        },
    },
}

//Storage Data Structure
//The data storaged on server standard format
const storage={
    group:{
        id:"",              //group unique id
        group:[],           //group account list
        status:1,           //group status
        create:0,           //group create time
        update:0,           //group update time
        notice:[],          //announce list
        permit:{            //permit setting
            free:true,      //free to join
            notice:false,   //free to set notice
        },          
    },
    chat:{
        from:"",            //SS58 message sender
        to:"",              //SS58 message acceptor
        msg:"",             //Chat content
        expired:0,          //Message expire time, if not sent
    },
    notification:{
        to:"",              //SS58 message acceptor
        type:"",            //
        msg:"",             //Chat content
        expired:0,          //Message expire time, if not sent
        more:{
            from:"",        //if there is sender, put here
        },
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
    }
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
}