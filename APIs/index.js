import Friend from "./contact/friend";
import Stranger from "./contact/stranger";
import Startup from "./system/startup";
const W3API={
    startup:Startup,//W3API init process
    account:{       //Account management
        local:null,     //local account management
        wallet:null,    //normal web3.0 account way
    },
    payment:{       //Anchor Network payment
        payto:null,     //transaction of Anchor Network 
        vertify:null,   //vertification on Anchor Network
    },
    contact:{       //W3OS contact management
        friend:Friend,      //friend management
        stranger:Stranger,  //stranger management
    },
    message:{       //W3OS basic message service
        chat:null,      //IM functions
        manage:null,    //IMGC service management
        group:null,     //Group functions
    },
    system:{       //W3OS system functions
        setting:null,       //System setting functions
        node:null,          //Anchor network management
        loader:null,        //Anchor loader
    },
    web3:{        //On-chain API/SDK loaded here.

    },
    service:{       //service links management
        network:null,       //different blockchain network
        link:null,          //W3OS service management
    },
    storage:{       //W3OS storage functions
        local:null,         //frontend storage, encry storage
        DB:null,            //frontend database functions
        IPFS:null,          //on-chain IPFS support
        chain:null,         //other on-chain storage support
    },
    exchange:{     //Market functions
        price:null,     //the price of tokens
        buy:null,       //buy coins function
        sell:null,      //sell coins function
        market:null,    //market APIs to exchange
    },
}
export default W3API;