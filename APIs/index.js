import Friend from "./contact/friend.js";
import Stranger from "./contact/stranger.js";
import Startup from "./system/startup.js";

import Account from "./account/local.js";
import Wallet from "./account/wallet.js";

import Pay from "./payment/pay.js";
import Vertify from "./payment/vertify.js";

import Chat from "./message/chat.js";
import Group from "./message/group.js";

import Setting from "./system/setting.js";
import Node from "./system/node.js";
import Loader from "./system/loader.js";
import Input from "./system/input.js";
import Userinterface from "./system/userinterface.js";
import Error from "./system/error.js";
import Status from "./system/status.js";
import Format from "./system/format.js";

import Network from "./service/network.js";
import Link from "./service/link.js";

import Local from "./storage/local.js";
import DB from "./storage/DB.js";
import Anchor from "./storage/anchor.js";
import IPFS from "./storage/IPFS.js";
import Chain from "./storage/chain.js";

import Market from "./exchange/market.js";
import Price from "./exchange/price.js";
import Buy from "./exchange/buy.js";
import Sell from "./exchange/sell.js";

const W3API={
    startup:Startup,//W3API init process
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
        chat:Chat,       //IM functions
        manage:null,    //IMGC service management
        group:Group,     //Group functions
    },
    system:{       //W3OS system functions
        setting:Setting,       //System setting functions
        node:Node,          //Anchor network management
        loader:Loader,        //Anchor loader, decode API from Anchor Network
        input:Input,         //Input from URL, can call the system function
        UI:Userinterface,            //W3OS UI functions, need to be injected from outside
        definition:{        //W3OS system difinitions
            error:Error,     //Errors
            status:Status,    //W3OS system status
            format:Format.data,    //data structure
            agent:Format.agent,     //W3OS agent definition
        }
    },
    web3:{},        //On-chain API/SDK will be loaded here. The loader is "system.loader"
    service:{       //service links management
        network:Network,       //different blockchain network
        link:Link,          //W3OS service management
    },
    storage:{       //W3OS storage functions
        local:Local,         //frontend storage, encry storage
        DB:DB,            //frontend database functions
        anchor:Anchor,        //anchor storage
        IPFS:IPFS,          //on-chain IPFS support
        chain:Chain,         //other on-chain storage support
    },
    exchange:{     //Market functions
        price:Price,     //the price of tokens
        buy:Buy,       //buy coins function
        sell:Sell,      //sell coins function
        market:Market,    //market APIs to exchange
    },
    funs:{        //functions for W3API, such as added the SDK to "web3" key
        setSDK:(name,fun)=>{

        },
    },
}
export default W3API;