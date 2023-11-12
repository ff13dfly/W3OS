//! Function test of W3OS IMS ( Instance Message Service );

//# Overview
// Will mock the target accounts to chat with each other.
// 1. record the send/receive amount to check IMS
// 2. will disconnect live account, to check IMS history functions

//## Running
// node benchmark_IMS.js

const { WebSocket } = require('ws');
const tools = require('../common/tools');

const theme = {
    error: '\x1b[31m%s\x1b[0m',
    success: '\x1b[36m%s\x1b[0m',
    primary: '\x1b[33m%s\x1b[0m',
    dark: '\x1b[90m%s\x1b[0m',
};
const output =(ctx, type, skip) => {
    const stamp = () => { return new Date().toLocaleString(); };
    if (!type || !theme[type]) {
        if (skip) return console.log(ctx);
        console.log(`[${stamp()}] ` + ctx);
    } else {
        if (skip) return console.log(theme[type], ctx);
        console.log(theme[type], `[${stamp()}] ` + ctx);
    }
};
console.clear()
const start=new Date();
output(`Start to benchmark W3OS IMS ( Instance Message Service ) functions\n At ${start}`);

//setting part
const config={
    url:"ws://localhost:7788",      //
    account:10,                     //client numbers
};

const mock={
    accounts:(n)=>{
        const list=[];
        for(let i=0;i<n;i++){
            list.push(mock.ss58("5mock"));
        }
        return list;
    },
    ss58:(pre)=>{
        const str="abcdefghijkmnopqrstuvwxyz23456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
        let acc=!pre?"":pre;
        const max=!pre?48:48-pre.length;
        for(let i=0;i<max;i++){
            acc+=str[tools.rand(0,str.length-1)];
        }
        return acc;
    },
}

//Websocket link
const active={}         //active websocket links
const spams={}
const spamToWebsocket={},accountToSpam={};
const self={
    link:(url,amount,ck)=>{
        if(amount<1) return ck && ck();
        const ws=new WebSocket(url);
        ws.onopen=(res)=>{
            //output(`Link successful.`,"success",true);
        };
        ws.onmessage=(res)=>{
            try {
                const input=JSON.parse(res.data);
                spams[amount]=input.spam;
            } catch (error) {
                output(error,"error");
            }
        };
        ws.onclose=(res)=>{

        };
        ws.onerror=(res)=>{
            output(res,"error");
        };
        
        active[amount]=ws;
        //console.log(amount);
        amount--;
        return self.link(url,amount,ck);
    },
    reg:(accs,ck)=>{
        //console.log(accs);
        for(let i=accs.length;i>0;i--){
            const ss58=accs[i-1],spam=spams[i-1];
            //console.log(i,ss58);
            spamToWebsocket[spam]=active[i];
            accountToSpam[ss58]=spam;
            const req={
                act:"active",
                acc:ss58,
                spam:spam,
            }
            self.first(req,i);
        }
        return ck && ck();
    },
    first:(obj,index)=>{
        if(!active[index]) return false;
        const ws=active[index];
        ws.send(JSON.stringify(obj));
        return true;
    },
    send:(obj,spam)=>{
        if(!spamToWebsocket[spam]) return false;
        const ws=spamToWebsocket[spam];
        ws.send(JSON.stringify(obj));
        return true;
    },
    run:(funs,ck,len)=>{
        if(!len) len=funs.length;
        if(funs.length===0) return ck && ck();
        const fun=funs.shift();
        fun(len-funs.length-1,()=>{
            output(`Ready to next test, 2s later...`);
            setTimeout(()=>{
                self.run(funs,ck,len);
            },2000);
        });
    },
}

const ts=[
    test_group_create,
    test_group_details,
    test_group_join,
    test_group_leave,
    test_group_divert,
    test_group_deport,
    test_group_destory,
    test_group_message,
    test_group_notice,
    test_group_announce,
]

const accounts=mock.accounts(config.account);
output(`Mocked accounts: ${JSON.stringify(accounts)}`);

self.link(config.url,config.account,()=>{
    output(`Websockets link created, amount: ${config.account}`,"success",true);
    const at=2;
    output(`Please hold ${at}s to wait the websocket ready.`,"info",true);
    setTimeout(()=>{
        self.reg(accounts,()=>{
            output(`Mock accounts are related to Websocket\n`,"success",true);
            output(`Ready to run tests.`,"info",true);
            const test_start=tools.stamp();
            self.run(ts,()=>{
                const test_end=tools.stamp();
                output(`All test cases done. Cost: ${(test_end-test_start).toLocaleString()}ms`);
            });
        });
    },at*1000);
});

const gs=[];        //Created group ids here.
const details={};   //Group details cached here.

function test_group_create(order,ck){
    output(`------------------- [${order}] test_group_create start -------------------`,"info",true);
    const creator=accounts[tools.rand(0,accounts.length-1)];
    const spam=accountToSpam[creator];
    output(`Random creator: ${creator}, spam: ${spam}`);

    const ws=spamToWebsocket[spam];
    ws.onmessage=(res)=>{
        output(res.data,"primary");
        try {
            const rsp=JSON.parse(res.data);
            if(rsp.type==="notice"){
                if(rsp.method.act==="create"){
                    const gid=rsp.msg.id;
                    gs.push(gid);

                    const req_2={
                        cat:"group",
                        act:"detail",
                        id:gid,
                        spam:spam,
                    }
                    self.send(req_2,spam);
                }

                if(rsp.method.act==="detail"){
                    details[rsp.msg.id]=rsp.msg;
                    output(`------------------- [${order}] test_group_details end ---------------------\n`,"info",true);
                    return ck && ck();
                }
            }
        } catch (error) {
            output(`Error from test_group_create`,"error",true);
            output(error);
        }
    }

    const req={
        cat:"group",
        act:"create",
        list:[creator],
        spam:spam,
    }
    self.send(req,spam);
}

function test_group_details(order,ck){
    output(`------------------- [${order}] test_group_details start -------------------`,"info",true);
    const gid=gs[0];


    output(`------------------- [${order}] test_group_details end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_join(order,ck){
    output(`------------------- [${order}] test_group_join start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_join end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_leave(order,ck){
    output(`------------------- [${order}] test_group_leave start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_leave end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_divert(order,ck){
    output(`------------------- [${order}] test_group_divert start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_divert end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_deport(order,ck){
    output(`------------------- [${order}] test_group_deport start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_deport end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_destory(order,ck){
    output(`------------------- [${order}] test_group_destory start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_destory end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_message(order,ck){
    output(`------------------- [${order}] test_group_message start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_message end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_notice(order,ck){
    output(`------------------- [${order}] test_group_notice start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_notice end ---------------------\n`,"info",true);
    return ck && ck();
}

function test_group_announce(order,ck){
    output(`------------------- [${order}] test_group_announce start -------------------`,"info",true);

    output(`------------------- [${order}] test_group_announce end ---------------------\n`,"info",true);
    return ck && ck();
}