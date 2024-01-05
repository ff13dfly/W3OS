/* 
*  W3OS runtime function
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-02
*  @version 1.0.0
*  @functions
*  1.modules register here, functions and parameters definition
*  2.basic information
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
        setting: Setting,    //System setting functions
        node: Node,          //Anchor network management
        loader: Loader,      //Anchor loader, decode API from Anchor Network
        input: Input,        //Input from URL, can call the system function
        UI: Userinterface,   //W3OS UI functions, need to be injected from outside
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
    env: "",             //["browser","nodejs"]
    network: false,      //wether linked to active node
    index: 0,            //active index node
    relink: 500,         //the interval to retry network
}


/************************************************************************/
/************************** Private Functions ***************************/
/************************************************************************/
const self = {
    getWebsocket:(url)=>{
        if(!isNodeJS) return new WebSocket(url);
        //TODO, here to return the nodeJS websocket client;

    },
    checkServers: (ck) => {
        if (debug) Userinterface.debug("Try linking to Anchor Network node ...");
        const url = Default.node[state.index];     //get the default node
        if (state.index === Default.node.length) {
            return ck && ck(false);     //failed to link to node when all nodes tried
        }
        try {
            ws = self.getWebsocket(url);
            ws.onerror = (res) => {
                state.index++;
                return self.checkServers(ck);  //faild to link, retry
            };
            ws.onopen = (res) => {
                state.network = true;
                return ck && ck(true);      //link successful, ready to get basic libs
            };
        } catch (error) {
            Userinterface.debug(error, "error");     //unknown error, retry
            state.index++;
            return self.checkServers(ck);
        }
    },
    envNodeJS: () => {
        if (typeof process !== 'undefined' && typeof process.env === 'object') {
            return true;
        } else {
            return false;
        }
    },
    launch: () => {

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

        console.log(permits);
        if (debug) Userinterface.debug("Modules ready.");

        return ck && ck();
    },
};

/************************************************************************/
/************************** Public Functions ****************************/
/************************************************************************/
const isNodeJS = self.envNodeJS();
console.log(isNodeJS);
const RUNTIME = {
    setDebug: (val) => {
        debug = !!val;
        return true;
    },
    start: (ck) => {
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

            //2.2.setup permissions

            //2.3.check system login

            //3. check the link state.

            self.checkServers((res) => {
                if (debug) Userinterface.debug(res ? `Linked to Anchor Network node: ${Default.node[state.index]}` : `Failed to link to Anchor Network node`);

                //4. ready to get basic libs.
                const libs=Default.libs[isNodeJS?"backend":"frontend"];
                Launch(ws,libs,()=>{

                });
            });

            return ck && ck();
        });
    },

    call: (path, params, alink) => {
        if (debug) {
            Userinterface.debug(`Call ** ${path.join("_")} **, from ** ${alink} **, parameters:`, "warn");
            Userinterface.debug(params);
        }

        if (alink) {
            if (!Checker(alink, "alink")) return Error.throw("INVALID_ANCHOR_LINK", "core");
        }
        const [cat, mod, fun] = path;

        //1.check permission by path, set status to pending     
    },

    def: (path, ck) => {
        if (!path) return ck && ck(Error.get("INVALID_CALL_PATH", "core"));

        //ck && ck(Error.get("INVALID_CALL_PATH","core","abc"));
        //return ck && ck(Error.get("INVALID_CALL_PATH","core","More details"));
    },
    version: () => {
        return Information;
    },
}
export default RUNTIME;