//########## RUNNING ##########
// node index.js

// ## build command
// yarn add esbuild
// ../../node_modules/esbuild/bin/esbuild server.js --bundle --minify --outfile=./chat_server.min.js --platform=node

// ## abanded, runner will be on config.json
// node index.js config.json 5CSTSUDaBdmET2n6ju9mmpEKwFVqaFtmB8YdB23GMYCJSgmw

// ## server iptables
// iptables -I INPUT -p tcp --dport 7788 -j ACCEPT


//1.start websocket, manage the relationship of customers
//2.
const { WebSocketServer } = require('ws');

const Valid = require("./common/valid");        //check config file
const Client = require("./common/client");      //comman websocket client management
const { output } = require("./common/output");  //console output function

const delegate={
    chat:{              //normal chat functions

    },
    group:{             //normal group functions

    },
    veritfy:{           //server vertification functions

    },
    debug:{             //debug functions

    }
}

Valid(process.argv.slice(2),(res)=>{
    const cfg=res.data;
    const wss = new WebSocketServer({ port: cfg.server.port});
    wss.on('connection', Client.connection);
    wss.on('close', Client.close);
    wss.on('error', Client.error);

    wss.on('message', (res)=>{
        const str = res.toString();
        if (!str) return output(`Empty request.`, "error");
        try {
            const input = JSON.parse(str);
            if(!input.spam) return output(`Invalid request.`, "error");     //check spam

            const cat=!input.cat?"chat":input.cat;  //router to different service
            const act=input.act;                    //action 
            if(!delegate[cat] || !delegate[cat][act]){ 
                return output(`Unknown request.`, "error");     //check spam
            }

            const fun=delegate[cat][act];
            const result=fun(input,input.spam);

            console.log(result);

        }catch (error) {
            output(`Error: ${error}`, "error");
        }
    });
});