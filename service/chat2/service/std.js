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

const storage={
    group:{
        id:"",              //group unique id
        group:[],           //group account list
        status:1,           //group status
        create:0,           //group create time
        update:0,           //group update time
        announce:[],        //announce list
        permit:{},          //permit setting
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

module.exports={
    format:(type)=>{
        if(!storage[type]) return false;
        return JSON.parse(JSON.stringify(storage[type]));
    },
    task:(type)=>{
        if(!task[type]) return false;
        return JSON.parse(JSON.stringify(task[type]));
    },
    content:(type)=>{

    },
}