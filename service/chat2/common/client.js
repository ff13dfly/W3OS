const tools = require("./tools");      //comman websocket client management
const { output } = require("./output");

const clients = {};
const accountSpam = {}, spamToAccount = {};

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
            if(result.task){
                const task=result.task;
                delete result.task;
                self.decode(task);
            }
            self.success(result, spam, input.order);
        }
    },
};