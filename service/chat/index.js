//########## RUNNING ##########
// node index.js

// ## build command
// yarn add esbuild
// ../../node_modules/esbuild/bin/esbuild index.js --bundle --minify --outfile=./chat_server.min.js --platform=node

// ## abanded, runner will be on config.json
// node index.js config.json 5CSTSUDaBdmET2n6ju9mmpEKwFVqaFtmB8YdB23GMYCJSgmw  

// ## server iptables
// iptables -I INPUT -p tcp --dport 7788 -j ACCEPT

const {output}=require("./lib/output");
const Valid = require("./lib/valid");
const Chat=require("./IMS/chat");
const Paytovertify=require("./lib/paytovertify");
const Chain=require("./lib/chk_polkadot");
const History=require("./lib/history");
const tools=require("./lib/tools");

const version="1.0.1";
console.clear();
output(`W3OS chatting service ( v${version} ) running...`,"dark",true);

Valid(process.argv.slice(2),(res)=>{
    const cfg=res.data;

    //1. start IMS
    Chain.endpoint(cfg.server.polkadot);
    const agent={
        reg:(acc,ck)=>{
            output(`Ready to reg "${acc}"`);
            Paytovertify.account(cfg.server.vertification);
            Paytovertify.agent(
                (res)=>{    //when vertification successful
                    output(`Verification successful, ready to sent notification.`,"success");
                    Chat.notification(res.from,{status:1,msg:"Payment vertification successful"});
                },
                (res)=>{    //when vertification failed
                    output(`Verification failed, ready to sent notification.`,"error");
                    Chat.notification(res.from,{status:0,msg:"Payment vertification failed"});
                }
            );

            Paytovertify.subcribe(Chain.subcribe,Chain.convert);

            Paytovertify.add(acc,false,(amount)=>{
                output(`The pay amount is ${amount}`);
                return ck && ck(amount,cfg.server.vertification);
            });
        },
        active:(address,count)=>{
            History.clean(address,count);
            return true;
        },
        leave:()=>{

        },
        offline:(from,to,msg)=>{
            History.message(from,to,msg);
        },
        group:{

        },
        get:{
            message:(address)=>{
                return History.mine(address);
            },
        }
    }
    Chat.init(cfg.server.port,agent);

    //2. start GCS
    const koa = require("koa");
    const bodyParser = require("koa-bodyparser");
    const koaRouter = require("koa-router");
    const app = new koa(),router=new koaRouter();
    const exposed = {
        call:{
            create:null,
            join:null,
            leave:null,
            list:null,
            destrory:null,
        },
    }
    const listen={
        run:(obj)=>{
            app.use(bodyParser({
                detectJSON: function (ctx) {
                    return ctx;
                }
            }));
            app.use(router.routes());
            listen.http();

            const port=obj.port;
            app.listen(port, () => {
                output(`[ GCS url ] http://localhost:${port}`,"primary",true);
                output(`Testing command lines:`,"",true);
                output(`curl "http://localhost:${port}" -d '{"jsonrpc":"2.0","method":"echo","params":{"text":"hello world"},"id":3334}'`,"",true);
                output(`Enjoy the Group Chat Service.`,"success",true);
            });
        },
        http:()=>{
            router.get("/", async (ctx) => {
                const params = listen.getParams(ctx.request.url);
                const start = tools.stamp();
                output(`--------------------------- request start ---------------------------`,"success",true);
                output(`[ call ] stamp: ${start}. Params : ${JSON.stringify(params)}`,"",true);
            
                const jsonp = listen.formatParams(params);
                const method = jsonp.request.method;
                const IP = listen.getClientIP(ctx.req);
                if (method !== 'spam') {
                    if (!jsonp.request.params.spam) return ctx.body = listen.export({ error: "no spam" }, jsonp.request.id, jsonp.callback);
                    const spam = jsonp.request.params.spam;
                    const spamResult = listen.checkSpam(spam, IP);
                    if (spamResult !== true) {
                        return ctx.body = listen.export({ error: spamResult }, jsonp.request.id, jsonp.callback);
                    }
                }
                
                if (!method || !exposed.call[method]) {
                    return ctx.body = listen.export({ error: "unkown call" }, jsonp.request.id, jsonp.callback);
                }
            
                const env = { IP: IP };
                const result = await exposed.call[method](method, jsonp.request.params, jsonp.request.id, config, env);
                ctx.body = listen.export(result, jsonp.request.id, jsonp.callback);
            
                const end = tools.stamp();
                output(`[ manage ] stamp: ${end}, cost: ${end - start}ms, Result : ${JSON.stringify(result)}`,"",true);
                output(`---------------------------- request end ----------------------------\n`,"success",true);
            });
        },
        getParams: (str, pre) => {
            const map = {};
            if (!str) return map;
            const txt = str.replace(((!pre ? '' : pre) + "/?"), "");
            const arr = txt.split("&");
            for (let i = 0; i < arr.length; i++) {
                const kv = arr[i].split("=");
                map[kv[0]] = kv[1];
            }
            return map;
        },
        export: (data, id, callback) => {
            let output = { jsonrpc: '2.0', id: id };
            if (!data) {
                output.error = 'No response from server';
            } else {
                if (data.error) output.error = data.error;
            }
    
            if (output.error) return !callback ? output : `${callback}(${JSON.stringify(output)})`;
            output.result = data;
            return !callback ? output : `${callback}(${JSON.stringify(output)})`;
        },
        formatParams: (map) => {
            const params = {};
            let callback = '';
            const json = {
                id: "",
                method: "",
                params: {},
            }
            for (var k in map) {
                if (k === "_") {
                    continue;
                }
                if (k === "callback") {
                    callback = map[k];
                    continue;
                }
                if (k === "id") {
                    json.id = map[k];
                    continue;
                }
                if (k === "method") {
                    json.method = map[k];
                    continue;
                }
                params[k] = map[k];
            }
            json.params = params;
    
            return { request: json, callback: callback }
        },
        getClientIP: (req) => {
            let ip = req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
                req.ip ||
                req.connection.remoteAddress || // 判断 connection 的远程 IP
                req.socket.remoteAddress || // 判断后端的 socket 的 IP
                req.connection.socket.remoteAddress || ''
            if (ip) {
                ip = ip.replace('::ffff:', '')
            }
            return ip;
        },
        getRequestURI: (port) => {
            const host="localhost";
            const uri = `http://${host}:${port}`;
            return uri;
        },
    }

    listen.run({port:7777});
});