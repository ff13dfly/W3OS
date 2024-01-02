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

import Friend from "../contact/friend.js";
import Stranger from "../contact/stranger.js";
import Startup from "../system/startup.js";

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
import Status from "../system/status.js";


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

import Format from "./format.js";
import Information from "./information.js";

const router={
    account:{       //Account management
        local:Account,      //local account management
        wallet:Wallet,      //normal web3.0 account way
    },
    payment:{       //Anchor Network payment
        pay:Pay,            //transaction of Anchor Network 
        vertify:Vertify,    //vertification on Anchor Network
    },
    contact:{       //W3OS contact management
        friend:Friend,      //friend management
        stranger:Stranger,  //stranger management
    },
    message:{       //W3OS basic message service
        chat:Chat,          //IM functions
        group:Group,        //Group functions
    },
    system:{       //W3OS system functions
        setting:Setting,    //System setting functions
        node:Node,          //Anchor network management
        loader:Loader,      //Anchor loader, decode API from Anchor Network
        input:Input,        //Input from URL, can call the system function
        UI:Userinterface,   //W3OS UI functions, need to be injected from outside
    },
    definition:{        //W3OS system difinitions
        error:Error,        //Errors
        status:Status,      //W3OS system status
        //format:Format.data, //data structure
        //agent:Format.agent, //W3OS agent definition
    },
    web3:{},        //On-chain API/SDK will be loaded here. The loader is "system.loader"
    service:{       //service links management
        network:Network,    //different blockchain network
        link:Link,          //W3OS service management
    },
    storage:{       //W3OS storage functions
        local:Local,        //frontend storage, encry storage
        DB:DB,              //frontend database functions
        anchor:Anchor,      //anchor storage
        IPFS:IPFS,          //on-chain IPFS support
        chain:Chain,        //other on-chain storage support
    },
    exchange:{     //Market functions
        price:Price,        //the price of tokens
        buy:Buy,            //buy coins function
        sell:Sell,          //sell coins function
        market:Market,      //market APIs to exchange
    }
}


let debug=false;
let SYSTEM_STATUS=0;
const tree={};              //functions node
const params={};            //params node

const self={
    initSystem:(ck)=>{
        if(debug) Userinterface.debug("Ready to run modules init hook.");

        const reg=Format.hook.reg.name;

        for(var cat in router){
            const funs=router[cat];
            for(var name in funs){
                //1. run the reg hook
                const mod=funs[name];
                let param=null;
                if(mod[reg]){   //Run the init function
                    param=mod[reg]();
                }       

                //2. create the tree of functions
                for(var fun in mod){
                    const key=[cat,name,fun].join("_");
                    tree[key]=mod[fun];
                    if(param!==null){
                        params[key]=param[fun];
                    }
                }
            }
        }

        if(debug) Userinterface.debug("Modules ready.");
        return ck && ck();
    },
};

const RUNTIME={
    setDebug:(val)=>{
        debug=!!val;
        return true;
    },
    start:(ck)=>{
        //1.check system status to avoid reloading
        if(debug) Userinterface.debug("Start...");
        if(Status.code()!==0) return ck && ck(true);        //if system is not init status, return

        //2.init the system
        self.initSystem(()=>{
            console.log(tree);
            console.log(params);
        });
    },
}
export default RUNTIME;