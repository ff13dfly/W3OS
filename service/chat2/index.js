//########## RUNNING ##########
// node index.js

// ## build command
// yarn add esbuild
// ../../node_modules/esbuild/bin/esbuild server.js --bundle --minify --outfile=./chat_server.min.js --platform=node

// ## server iptables, without set the permit, firewall will block the request
// iptables -I INPUT -p tcp --dport 7788 -j ACCEPT

const { WebSocketServer } = require('ws');

const Valid = require("./common/valid");        //check config file
const Client = require("./common/client");      //comman websocket client management
const { output } = require("./common/output");  //console output function

const Chat = require("./service/chat");        //check config file
const Group = require("./service/group");        //check config file
const {error} = require("./service/std");        //Standard error message

//Functions group here.
const delegate={
    chat:{              //normal chat functions
        chat:Chat.to,               //single chat function
        to:Chat.to,                 //single chat function
        active:Chat.online,         //set the SS58 user active on server
        notification:null,
        offline:Chat.offline,       //set the SS58 user offline on server
        block:Chat.block,           //set the block SS58 list on server
    },
    group:{             //normal group functions
        create:Group.create,        //create a chat group, the owner must be in 
        detail:Group.detail,        //get the group detail by GID
        join:Group.join,            //join a target group
        leave:Group.leave,          //leave a target group 
        destory:Group.destory,      //destory a group
        chat:Group.chat,            //chat in a group
        notice:Group.notice,        //sent notice to a target
    },
    veritfy:{           //server vertification functions
        init:null,
        reg:null,
        token:null,
    },
    debug:{             //debug functions
        status:null,
    }
}

Valid(process.argv.slice(2),(res)=>{
    const cfg=res.data;
    const port=cfg.server.port;
    try {
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
                        console.log(str);
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