const tools = require("./tools");      //comman websocket client management
const { output } = require("./output");
const History =require("./history");

const clients = {};
const accountSpam = {}, spamToAccount = {};




//!important, the module of IMS and GCS will return the list of actions
//!important, client here to check the status and decode the task to do real work of network

const actions={
    message:(params)=>{
        console.log(params);
        if(!accountSpam[params.to]){
            console.log("Not active");
        }else{
            console.log("Ready to send");
        }
    },
    notification:(params)=>{
        const data=params.msg;
        data.act=params.act;
        data.cat=params.cat;

        if(!accountSpam[params.to]){
            console.log("Not active");
        }else{
            console.log("Ready to send notification");
            self.success(data,accountSpam[params.to]);
        }
    },
    announce:(params)=>{

    }
}

const self = {
    send: (obj, spam, order) => {
        if (!clients[spam]) return false;
        if (order !== undefined) obj.order = order;
        clients[spam].websocket.send(JSON.stringify(obj));
    },
    success: (obj, spam, order) => {
        obj.success = true;
        self.send(obj, spam, order);
    },
    failed: (obj, spam, order) => {
        obj.act = "error";
        self.send(obj, spam, order);
    },
    decode:(list)=>{    //the task need to do
        //console.log(`Standard action to do:`);
        for(let i=0;i<list.length;i++){
            const todo=list[i];
            if(actions[todo.action]){
                actions[todo.action](todo.params); 
            }
        }
    },
}

module.exports = {
    connection: (ws, ck) => {
        const uid = tools.char(12);
        clients[uid] = {
            websocket: ws,
            stamp: tools.stamp(),
            status: 1,              //[1.reg;2.payed;]     
            IP: "",
        }
        output(`Client linked, uid: ${uid} at ${new Date(clients[uid].stamp)}`, "success");
        ws.send(JSON.stringify({ "spam": uid, "act": "init" }));

        return ck && ck(uid);
    },
    close: (spam, res) => {
        delete clients[spam];
        const acc = spamToAccount[spam];
        delete spamToAccount[spam];
        delete accountSpam[acc];
        output(`Client removed, uid: ${spam}`, "error");
    },
    error: (err) => {
        output(`Error: ${err}`, "error");
    },
    message: (input, spam, delegate) => {
        if (input.act === "active") {
            if (!input.acc) return output(`Invalid active. request: ${JSON.stringify(input)}`, "error");
            spamToAccount[spam] = input.acc;
            accountSpam[input.acc] = spam;

        } else {
            if (!spamToAccount[spam]) return output(`Unknown spam. request: ${JSON.stringify(input)}`, "error");
        }

        const cat = !input.cat ? "chat" : input.cat;  //router to different service
        const act = input.act;                    //action 
        if (!delegate[cat] || !delegate[cat][act]) {
            return output(`Unknown request: ${JSON.stringify(input)}, to ${spam}`, "error");     //check spam
        }
        const fun = delegate[cat][act];
        delete input.act;
        delete input.cat;

        const result = fun(input,spamToAccount[spam]);
        if (!result || result.error) {
            self.failed(result, spam, input.order);
        } else {
            self.decode(result);
        }
    },
};