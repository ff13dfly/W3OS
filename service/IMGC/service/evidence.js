const {output}=require("../common/output");
const anchorJS=require("../lib/anchor.node");
const CryptoJS = require("crypto-js");

//Vertification on chain part;
const vdata=[];
let vlocker=false;      //locker for vdata writing
let password="";        //encried password string;
let salt={};            //salt for encrying password;

//Functions
const self={
    md5: (str) => {
        return CryptoJS.MD5(str).toString();
    },
    char: (n, pre) => {
        n = n || 7;
        pre = pre || "";
        for (let i = 0; i < n; i++) pre += i % 2 ? String.fromCharCode(self.rand(65, 90)) : String.fromCharCode(self.rand(97, 122));
        return pre;
    },
    rand: (m, n) => {
        return Math.round(Math.random() * (m - n) + n);
    },
    getHash:(from,to,amount,salt)=>{
        return self.md5(`${salt}.${from}.${amount}.${to}`);
    },
}

module.exports={
    save:(addr,target,amount,ck)=>{
        const salt=self.char(10);
        const hash=self.getHash(addr,target,amount,salt);
        

        const obj={
            t:addr,     //vertify account
            n:amount,   //amount to vertify
            v:target,   //money reciever
        }
        if(vlocker){
            vdata.push(obj);
            return ck && ck({msg:"cached"});
        }
        vlocker=true;

        

        console.log(`Ready to write, ${JSON.stringify(obj)}, string: ${salt}.${amount}.${target}, md5: ${hash}`);

        //1.get the list to write and pop from vdata;

        //2.

        //console.log(anchorJS);

        setTimeout(()=>{
            console.log(`Mock to write`);
            vlocker=false;
            return ck && ck({msg:"done"});
        },1500);
    },
    confirm:()=>{

    },
}