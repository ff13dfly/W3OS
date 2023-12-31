//########## RUNNING ##########
// node index.js

//########## BUILD ##########
// yarn add esbuild
// ../../node_modules/esbuild/bin/esbuild index.js --bundle --minify --outfile=./paybill_server.min.js --platform=node

const { WebSocketServer } = require('ws');
const Valid = require("./common/valid");
const { output } = require("./common/output");  //console output function

Valid(process.argv.slice(2), (res) => {
    const cfg = res.data;
    console.log(typeof cfg);
    console.log(cfg);
    if(!cfg.server) return output(`Failed to get server setting.`, "error", true);
    const port = cfg.server.port;

    try {
        const wss = new WebSocketServer({ port: port });
        output(`W3OS Transaction service start on ${port}.`, "dark", true);
        output(`ws://127.0.0.1:${port}`, "primary", true);

        //TODO, start the W3OS transaction service here.

    } catch (error) {
        output(`Failed to create Websocket server on ${port}.`, "error", true);
    }
});