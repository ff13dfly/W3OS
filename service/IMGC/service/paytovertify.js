const {output}=require("../common/output");
const anchorJS=require("../lib/anchor.node")

// Storage part 
const map={};
let target="";

let checker=null;   //checking interval
const agent={
    success:null,
    failed:null,
};

//Vertification on chain part;
const vdata=[];
let vlocker=false;      //locker for vdata writing
let password="";        //encried password string;
let salt="";            //salt for encrying password;


// Config part
const config={
    expired:10*60000,       // 10 minutes to expire the vertification
    at:4000,                // checking interval
};


//Functions
const self={
    amount:(address,force)=>{
        if(!map[address]){
            const n=5+self.rand(1,9999)*0.0001;
            map[address]={  //set the amount and expired time
                amount:n, 
                expired:self.stamp()+config.expired,
            };
        }else{
            map[address].stamp=self.stamp()+config.expired;
        }
        return map[address].amount;
    },
    stamp:()=>{
        return new Date().getTime();
    },
    rand:(m,n)=>{return Math.round(Math.random() * (m-n) + n);},

    load:(write_addr,pass,()=>{

    }),
}

module.exports={
    account:(acc)=>{
        target=acc;
    },
    target:()=>{
        return target;
    },
    agent:(success,failed)=>{
        agent.success=success;
        agent.failed=failed;
    },
    writeCheck:(addr,amount,ck)=>{
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
        console.log(`Ready to write, ${JSON.stringify(obj)}`);

        //1.get the list to write and pop from vdata;

        //2.
        console.log(anchorJS);

        setTimeout(()=>{
            console.log(`Mock to write`);
            vlocker=false;
            return ck && ck({msg:"done"});
        },1500);
    },
    subcribe:(fun,convert)=>{
        if(agent.success===null || agent.failed===null) return {error:"No agent to sent the result"};

        if(checker===null){
            checker=setInterval(()=>{
                //1.chcke the expired link
                for(let acc in map){
                    if(map[acc].expired < self.stamp()){
                        output(`Deleting expired: ${acc}`,"error");
                        delete map[acc];
                    }
                };
                
            },config.at);
        }

        fun((block,trans)=>{
            console.log(`Block[${block}], trasactions ( ${trans.length} ).`);
            const list=convert(trans);
            console.log(`Successful payments: JSON.stringify(list)`);
            for(let i=0;i<list.length;i++){
                const row=list[i];
                output(`Transaction got, ${JSON.stringify(row)}`,"primary");
                if(!map[row.from]){
                    if(row.to===target) agent.failed({from:row.from,amount:row.amount,msg:"Unknow or Expired account",block:block});
                    continue;
                } 
                const detail=map[row.from];
                output(`Ready to verify account ${row.from}`,"primary");
                if(row.to===target && self.stamp()<detail.expired){
                    if((detail.amount*1000000000000).toLocaleString()===row.amount){
                        agent.success({from:row.from,amount:row.amount,block:block});
                        delete(map[row.from]);
                    }else{
                        agent.failed({from:row.from,amount:row.amount,msg:"Wrong amount",block:block});
                    }
                }
            }
        });
    },
    add:(address,force,ck)=>{
        const amount=self.amount(address,force);
        return amount;
    },
}