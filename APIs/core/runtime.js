/* 
*  W3OS runtime function
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-02
*  @version 1.0.0
*  @functions
*  1.modules register here, functions and parameters definition
*  2.basic information
*  3.call permission control
*/

//functions for router
import Friend from "../contact/friend.js";
import Stranger from "../contact/stranger.js";

import Account from "../account/local.js";
import Wallet from "../account/wallet.js";

import Pay from "../payment/pay.js";
import Vertify from "../payment/vertify.js";

import Chat from "../message/chat.js";
import Group from "../message/group.js";

import Root from "../system/root.js";
import Setting from "../system/setting.js";
import Node from "../system/node.js";
import Loader from "../system/loader.js";
import Input from "../system/input.js";
import Userinterface from "../system/userinterface.js";
import Error from "../system/error.js";

import Network from "../service/network.js";
import Link from "../service/link.js";

import Local from "../storage/local.js";
import DB from "../storage/DB.js";
import Anchor from "../storage/anchor.js";
import IPFS from "../storage/IPFS.js";
import Chain from "../storage/chain.js";

import Market from "../exchange/market.js";
import Price from "../exchange/price.js";
import Buy from "../exchange/buy.js";
import Sell from "../exchange/sell.js";

import Xloader from "../util/xloader.js";
import Convertor from "../util/convertor.js";

//core functions here to import
import Status from "./status.js";
import Format from "./format.js";
import Information from "./information.js";
import Permit from "./permit.js";
import Checker from "./checker.js";
import Default from "./default.js";
import Launch from "./launch.js";

import NodeWS from 'websocket';     //nodeJS websocket client

const router = {
    account: {       //Account management
        local: Account,      //local account management
        wallet: Wallet,      //normal web3.0 account way
    },
    payment: {       //Anchor Network payment
        pay: Pay,            //transaction of Anchor Network 
        vertify: Vertify,    //vertification on Anchor Network
    },
    contact: {       //W3OS contact management
        friend: Friend,      //friend management
        stranger: Stranger,  //stranger management
    },
    message: {       //W3OS basic message service
        chat: Chat,          //IM functions
        group: Group,        //Group functions
    },
    system: {       //W3OS system functions
        root:Root,           //W3OS root login functions
        setting: Setting,    //System setting functions
        node: Node,          //Anchor network management
        loader: Loader,      //Anchor loader, decode API from Anchor Network
        input: Input,        //Input from URL, can call the system function
        UI: Userinterface,   //W3OS UI functions, need to be injected from outside    
        decoder:null,        //Default Anchor decoder ( Easy Protocol )
    },
    definition: {        //W3OS system difinitions
        error: Error,        //Errors
        status: Status,      //W3OS system status
        //format:Format.data, //data structure
        //agent:Format.agent, //W3OS agent definition
    },
    SDK: {},        //On-chain API/SDK will be loaded here. The loader is "system.loader"
    service: {       //service links management
        network: Network,    //different blockchain network
        link: Link,          //W3OS service management
    },
    storage: {       //W3OS storage functions
        local: Local,        //frontend storage, encry storage
        DB: DB,              //frontend database functions
        anchor: Anchor,      //anchor storage
        IPFS: IPFS,          //on-chain IPFS support
        chain: Chain,        //other on-chain storage support
    },
    exchange: {     //Market functions
        price: Price,        //the price of tokens
        buy: Buy,            //buy coins function
        sell: Sell,          //sell coins function
        market: Market,      //market APIs to exchange
    },
    util: {        //Tools support by W3
        xloader: Xloader,    //Raw Dapps loader, different from W3 loader, no need W3 support
        convertor: Convertor,//Convert application and deploy on chain. Only NodeJS support
    }
}

/************************************************************************/
/*************************** Sysetem Variants ***************************/
/************************************************************************/
let debug = false;
const tree = {};              //functions node
const params = {};            //params node
const permits = {};           //default permits setting

let ws = null;        //W3 system ws link, will close after get the basic libs.
const state = {       //runtime state, when system start, these state need to set automatically
    env: "",             //["frontend","backend"]
    network: false,      //wether linked to active node
    index: 0,            //active index node
}
//set call dapp alink here. When this is set to special anchor link. All call need to use this one to get permission.
let call_dapp="";       

/************************************************************************/
/************************** Private Functions ***************************/
/************************************************************************/
const self = {
    getWebsocket:(url)=>{
        return state.env==="frontend"?new WebSocket(url):new NodeWS.client(url);
    },
    checkServers: (ck) => {
        if (debug) Userinterface.debug("Try linking to Anchor Network node ...");
        const url = Default.node[state.index];     //get the default node
        if (state.index === Default.node.length) {
            return ck && ck(false);     //failed to link to node when all nodes tried
        }

        ws = self.getWebsocket(url);
        if(state.env==="frontend"){
            //1. frontend side to confirm Anchor Network status
            try {
                ws.onerror = (res) => {
                    state.index++;
                    return self.checkServers(ck);  //faild to link, retry
                };
                ws.onopen = (res) => {
                    state.network = true;
                    ws.close();                 //confirm the url then close
                    return ck && ck(true);      //link successful, ready to get basic libs
                };
            } catch (error) {
                Userinterface.debug(error, "error");     //unknown error, retry
                state.index++;
                return self.checkServers(ck);
            }
        }else{
            //1. backend ( NodeJS ) side to confirm Anchor Network status
            ws.on('connectFailed', function(error) {
                Userinterface.debug(error, "error");     //unknown error, retry
                state.index++;
                return self.checkServers(ck);
            });

            ws.on('connect', function(connection) {
                connection.on('error', function(error) {
                    Userinterface.debug(error, "error");     //unknown error, retry
                    state.index++;
                    return self.checkServers(ck);
                });

                state.network = true;
                connection.close();                 //confirm the url then close
                return ck && ck(true);      //link successful, ready to get basic libs
            });
            ws.connect(url);
        }
    },
    envNodeJS: () => {
        if (typeof process !== 'undefined' && typeof process.env === 'object') {
            return true;
        } else {
            return false;
        }
    },
    regModules: (ck) => {
        if (debug) Userinterface.debug("Ready to run modules init hook.");

        const hooks = Format.hook;
        const rkey = hooks.reg.name;
        const pkey = hooks.permit.name;
        const ikey = hooks.init.name;

        for (var cat in router) {
            const funs = router[cat];
            for (var name in funs) {
                //1. run the reg hook
                const mod = funs[name];
                let param = null, permit = null
                if(mod===null) continue;

                //1.1.get the param definition
                if (mod[rkey]) param = mod[rkey]();

                //1.2.get the default permission
                if (mod[pkey]) permit = mod[pkey]();

                //1.3.autorun start
                if (mod[ikey]) mod[ikey]();

                //2. create the tree of functions
                for (var fun in mod) {
                    const key = [cat, name, fun].join("_");
                    tree[key] = mod[fun];
                    if (param !== null) {
                        params[key] = param[fun];
                    }
                    if (permit != null && permit[fun]) {
                        permits[key] = permit[fun];
                    }
                }
            }
        }

        if (debug){
            //Userinterface.debug("Modules ready.");
            Userinterface.debug("Modules ready.");
        }
         

        return ck && ck();
    },
    filterCallback:(input,type)=>{
        for(let i=0;i<type.length;i++){
            if(type[i]==="callback" && input[i]) return i;
        }
        return false;
    },
    checkPermit:(ck)=>{
        //1.get the account; if not, record as "SYSTEM"

        return ck && ck(false);
    },
    savePermit:(alink,ck)=>{
        //TODO,here to save the permission.

        //1.get the account; if not, record as "SYSTEM"

        //2.check the record of target permission

        return ck && ck(false);
    },
};

/************************************************************************/
/************************** Public Functions ****************************/
/************************************************************************/

const RUNTIME = {
    setDebug: (val) => {
        debug = !!val;
        return true;
    },
    setDapp:(alink)=>{
        if(!Checker(alink,"alink")) return false;
        call_dapp=alink;
        return true;
    },

    start: (ck) => {
        //0. check env, frontend or nodejs
        state.env=!self.envNodeJS()?"frontend":"backend";

        //1.check system status to avoid reloading
        if (Status.code() === 6) {
            if (debug) Userinterface.debug("W3OS is starting, wait ...");
            return setTimeout(() => {
                RUNTIME.start(ck);
            }, 200);
        }
        if (Status.code() !== 0) return ck && ck(true);        //if system is not init status, return
        if (debug) Userinterface.debug("W3OS start...");
        Status.flip(6);

        //2.init process
        //2.1.reg the system modules
        self.regModules(() => {
            Status.flip(1);     //change the system status;

            //2.2. login to W3OS system by root.
            if(debug) Userinterface.debug("W3OS is ready, please login as root.");
            Root.login((logged)=>{
                if(debug) Userinterface.debug(logged?"Root login successful.":"Failed to login.");
                if(!logged){
                    Status.flip(8);     //set system status
                }
            });

            //3. check the nodes status, confirm the network.
            self.checkServers((res) => {
                if (debug) Userinterface.debug(res ? `Linked to Anchor Network node: ${Default.node[state.index]}` : `Failed to link to Anchor Network node`);
                if(!res){
                    return ck && ck(Error.get("NO_ACTIVE_NODE","core"));
                }

                //4. ready to get basic libs.
                const libs=Default.libs[state.env];
                Launch(Default.node[state.index],libs,(data)=>{
                    //4.1. combine the code
                    const funs={};
                    for(let i=0;i<data.length;i++){
                        const row=data[i];
                        const fun=new Function(row.data.raw)
                        funs[row.data.name]=fun();
                    }

                    //4.2. dock the basic decoder to system, use Easy as the default decoder of Anchor Network
                    router.system.decoder=((funs)=>{
                        const {easy,anchorjs,polkadot}=funs;
                        const {ApiPromise,WsProvider}=polkadot;
                        const url=Default.node[state.index];
                        //console.log(anchorjs);
                        let ready=false;
                        const startAPI = {
                            common: {
                                "latest": anchorjs.latest,
                                "target": anchorjs.target,
                                "history": anchorjs.history,
                                "owner": anchorjs.owner,
                                "subcribe": anchorjs.subcribe,
                                "block": anchorjs.block,
                            }
                        };
                        ApiPromise.create({ provider: new WsProvider(url) }).then((api) => {
                            anchorjs.set(api);
                            ready=true;
                        });

                        return (alink,ck)=>{
                            //TODO, the logical need to improve.
                            if(!ready){
                                setTimeout(()=>{
                                    easy.easyRun(alink, startAPI, (res) => {
                                        return ck && ck(res);
                                    });
                                },300)
                            }else{
                                easy.easyRun(alink, startAPI, (res) => {
                                    return ck && ck(res);
                                });
                            }
                        };
                    })(funs);
                    Loader.setDecoder(router.system.decoder);

                    //4.3. get the support SDK list from Anchor Network
                    router.system.decoder(Default.support,(res)=>{
                        const adata=res.data[`${res.location[0]}_${res.location[1]}`];
                        const slist=JSON.parse(adata.raw);      //get the support SDK list.
                        Loader.map(slist,()=>{      //set the SDK maps for permission control.
                            return ck && ck();
                        });
                    });
                });
            });
            
        });
    },

    call: (path, input, alink) => {
        if (debug) {
            Userinterface.debug(`Call ** ${path.join("_")} **, from ** ${alink} **, parameters:`, "warn");
            Userinterface.debug(input);
        }

        //0. check the alink format, requirement of permission setting.
        if (alink!=="SYSTEM") {
            if (!Checker(alink, "alink")) return Error.throw("INVALID_ANCHOR_LINK", "core");
        }

        const [cat, mod, fun] = path;
        if(!router[cat] || !router[cat][mod] || !router[cat][mod][fun]){
            return Error.throw("UNKNOWN_CALL", "core",`Call path: ${path.join("_")}` );
        }

        //1.check parameters.
        const key=path.join("_");
        if(!params[key]){
            return Error.throw("UNKNOWN_CAINVALID_INPUTLL", "system",`No parameters types record` );
        }
        
        const types=params[key];
        const cresult=Checker(input,types);     //the result may be Error object
        const index=self.filterCallback(input,types);   //get the callback input index, for the next progress
        if(cresult!==true){
            if(index!==false){
                return input[index](cresult);
            }else{
                return Userinterface.log(cresult);
            }
        }

        //2.check permission
        if(alink!=="SYSTEM"){
            Userinterface.debug(`Checking call ( ${path.join("_")} ) permission`);
            //2.1. check wether permission setting;
            self.checkPermit((allowed)=>{
                if(!allowed){
                    //2.2. user action to confirm the permission;
                    Userinterface.confirm(`Calling "${path.join("_")}" needs permission.\n From "${alink}"`,(confirmed)=>{
                        if(!confirmed){
                            if(index!==false){
                                return input[index](Error.get("USER_REJECT_ACTION", "system"));
                            }else{
                                return Error.throw("USER_REJECT_ACTION", "system");
                            }
                        }
                        //2.2 save the permission for the next call;
                        self.savePermit(alink,(saved)=>{
                            //2.3. if failed to save setting, call the callback or warning in console. 
                            if(!saved){
                                Error.throw("FAILED_SAVE_SETTING", "system", `Permission is not saved for ${alink}`);
                            }

                            //3.0.call the real function, when get confirm from user action
                            Userinterface.debug(`The ${alink} call ( ${path.join("_")} ), permission checked`);
                            router[cat][mod][fun].apply(null,input);
                        });
                    });
                }else{
                   //3.1.call the real function, when the alink is recorded "allowed"
                   Userinterface.debug(`The ${alink} call ( ${path.join("_")} ), permission allowed.`);
                   router[cat][mod][fun].apply(null,input); 
                }
            });
        }else{
            //3.2.call the real function, when it is called by system
            Userinterface.debug(`System call ( ${path.join("_")} ), ignore permission checking`);
            router[cat][mod][fun].apply(null,input);
        }
    },

    def: (path, ck) => {
        if (!path) return ck && ck(Error.get("INVALID_CALL_PATH", "core"));

        //ck && ck(Error.get("INVALID_CALL_PATH","core","abc"));
        //return ck && ck(Error.get("INVALID_CALL_PATH","core","More details"));
    },
    version: () => {
        return Information;
    },
    env:()=>{
        return state;
    },
}
export default RUNTIME;