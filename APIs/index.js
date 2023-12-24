import Friend from "./contact/friend";
import Stranger from "./contact/stranger";

const W3API={
    account:{       //Account management
        local:null,     //local account management
        wallet:null,    //normal web3.0 account way
    },
    exchange:{
        price:null,     //the price of tokens
        buy:null,       //buy coins function
        sell:null,      //sell coins function
        market:null,
    },
    payment:{
        payto:null,
        vertify:null,
    },
    contact:{
        friend:Friend,          
        stranger:Stranger,
    },
    group:{
        chat:null,
        manage:null,
    },
    IM:{

    },
    system:{
        setting:null,
        network:null,
    },
    storage:{

    },
    chain:{     //chain API functions.

    },
}
export default W3API;