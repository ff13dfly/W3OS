//########## RUNNING ##########
// node index.js

//########## BUILD ##########
// yarn add esbuild
// ../../node_modules/esbuild/bin/esbuild index.js --bundle --minify --outfile=./chat_server.min.js --platform=node

// ## server iptables, without set the permit, firewall will block the request
// iptables -I INPUT -p tcp --dport 7788 -j ACCEPT

//########## LOADER ##########
// node loader.nodejs.js anchor://chat/

const { WebSocketServer } = require('ws');

const Valid = require("./common/valid");        //check config file
const Client = require("./common/client");      //comman websocket client management
const { output } = require("./common/output");  //console output function

const Chat = require("./service/chat");         //check config file
const Group = require("./service/group");       //check config file
const {error} = require("./service/std");       //Standard error message

const DB = require("./common/mndb");           //Memory DB
const History = require("./common/history");
const Recover = require("./service/recover");   //System backup and autosave function

// const Paytovertify = require("./service/paytovertify");   //System backup and autosave function
// const Chain=require("./service/network");
// const reg=(acc,ck)=>{
//     output(`Ready to reg "${acc}"`);
//     Paytovertify.account(cfg.server.vertification);
//     Paytovertify.agent(
//         (res)=>{    //when vertification successful
//             output(`Verification successful, ready to sent notification.`,"success");
//             //Chat.notification(res.from,{status:1,msg:"Payment vertification successful"});
//         },
//         (res)=>{    //when vertification failed
//             output(`Verification failed, ready to sent notification.`,"error");
//             //Chat.notification(res.from,{status:0,msg:"Payment vertification failed"});
//         }
//     );

//     Paytovertify.subcribe(Chain.subcribe,Chain.convert);

//     Paytovertify.add(acc,false,(amount)=>{
//         output(`The pay amount is ${amount}`);
//         return ck && ck(amount,cfg.server.vertification);
//     });
// };

//Functions group here.
const delegate={
    chat:{              //normal chat functions
        chat:Chat.to,               //single chat function
        to:Chat.to,                 //single chat function
        active:Chat.online,         //set the SS58 user active on server
        notice:null,
        offline:Chat.offline,       //set the SS58 user offline on server
        block:Chat.block,           //set the block SS58 list on server
    },
    group:{             //normal group functions
        create:Group.create,        //create a chat group, the owner must be in 
        detail:Group.detail,        //get the group detail by GID
        join:Group.join,            //join a target group
        leave:Group.leave,          //leave a target group 
        divert:Group.divert,        //change the group manager
        deport:Group.deport,        //add account to the block list
        recover:Group.recover,      //remove account from block list
        destory:Group.destory,      //destory a group 
        chat:Group.message,         //chat in a group
        notice:Group.notice,        //sent notice to a target
    },
    veritfy:{           //server vertification functions
        init:null,
        reg:reg,
        token:null,
    },
    debug:{             //debug functions
        status:null,
    }
}
const empty=(obj)=>{
    for(var k in obj) return false;
    return true;
}

const getData=()=>{
    const gs=DB.key_dump();
    const his=History.dump();
    return {group:gs,history:his}
};

const setData=(json)=>{
    if(json.group && !empty(json.group)){
        for(var k in json.group){
            DB.key_set(k,JSON.parse(JSON.stringify(json.group[k])));
        }
        output(`Group information recoverd`, "primary", true);
    }

    if(json.history && !empty(json.history)){
        History.recover(json.history);
        output(`Chat history recoverd`, "primary", true);
    }
};

Valid(process.argv.slice(2),(res)=>{
    if(res.error) return output(`Error:${JSON.stringify(res)}`,"error",true);
    if(!res.data || !res.data.server || !res.data.server.port)  return output(`Invalid config file.`,"error",true);
    const cfg=res.data;
    const port=cfg.server.port;

    Recover(getData,setData,()=>{
        try {
            //1.create websocket linker.
            const wss = new WebSocketServer({ port: port});
            output(`W3OS IMS and GCS server start on ${port}.`, "dark", true);
            output(`ws://127.0.0.1:${port}`, "primary", true);
            
            wss.on('connection',(ws,request,client)=>{
                Client.connection(ws,(uid)=>{
                    ws.on('close', (res) => {
                        Client.close(uid,res);
                    });
                    ws.on('error', (err) => {
                        Client.error(err);
                    });
                    ws.on('message', (res)=>{
                        const str = res.toString();
                        if (!str) return output(`Empty request.`, "error");
                        try {
                            const input = JSON.parse(str);
                            if(!input.spam) return output(error("SYSTEM_INVALID_REQUEST"), "error");     //check spam
                            if(input.spam!==uid) return output(`Invalid spam.`, "error");     //check spam
                            delete input.spam;
                            Client.message(input,uid,delegate);
                        }catch (error) {
                            output(`Error: ${error}`, "error");
                        }
                    });
                });
            });
    
    
        } catch (error) {
            output(`Failed to create Websocket server on ${port}.`, "error", true);
        }
    });
});