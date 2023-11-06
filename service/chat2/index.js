//########## RUNNING ##########
// node index.js

// ## build command
// yarn add esbuild
// ../../node_modules/esbuild/bin/esbuild server.js --bundle --minify --outfile=./chat_server.min.js --platform=node

// ## abanded, runner will be on config.json
// node index.js config.json 5CSTSUDaBdmET2n6ju9mmpEKwFVqaFtmB8YdB23GMYCJSgmw

// ## server iptables
// iptables -I INPUT -p tcp --dport 7788 -j ACCEPT

const { WebSocketServer } = require('ws');

const Valid = require("./common/valid");        //check config file
const Client = require("./common/client");      //comman websocket client management
const { output } = require("./common/output");  //console output function

const Chat = require("./service/chat");        //check config file
const Group = require("./service/group");        //check config file

//Functions group here.
const delegate={
    chat:{              //normal chat functions
        to:null,
        active:Chat.active,
        notification:null,
        offline:null,
    },
    group:{             //normal group functions
        create:Group.create,
        join:null,
        leave:null,
        destory:null,
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
    const wss = new WebSocketServer({ port: port});
    output(`Websocket server start on ${port}.`, "dark", true);
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
                    if(!input.spam) return output(`Invalid request.`, "error");     //check spam
                    if(input.spam!==uid) return output(`Invalid spam.`, "error");     //check spam
                    delete input.spam;
                    Client.message(input,uid,delegate);
                }catch (error) {
                    output(`Error: ${error}`, "error");
                }
            });
        });
    });
});