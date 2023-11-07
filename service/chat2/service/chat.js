const format={
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

const self={
    getFormat:(type)=>{
        if(!format[type]) return false;
        return JSON.parse(JSON.stringify(format[type]));
    },
}

module.exports = {
    active:(obj,from)=>{
        const todo=self.getFormat("notification");
        todo.params.msg={count:1};
        todo.params.to=from;
        return [todo];
    },
    to:(obj,from)=>{
        const todo=self.getFormat("message");
        todo.params.msg=obj.msg;
        todo.params.to=obj.to;
        todo.params.from=from;
        return [todo];
    },
    online:(obj,from)=>{

    },
    offline:(obj,from)=>{

    },
    block:(obj,from)=>{

    },
}