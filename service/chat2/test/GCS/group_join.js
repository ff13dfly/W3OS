const tools = require('../../common/tools');
const {output}= require('../../common/output');

const self={
    getRandomAccount:(accs,skip)=>{
        const acc=accs[tools.rand(0,accs.length-1)];
        if(acc!==skip) return acc;
        return self.getRandomAccount(accs,skip);
    },
}

module.exports={
    test_group_join_free:(env,order,ck)=>{
        output(`------------------- [${order}] test_group_join_free start -------------------`,"info",true);
        const gid=env.groups[0];
        const group=env.details[gid];
        const creator=group.manager;
        const from=self.getRandomAccount(env.accounts,creator);
        const spam=env.accountToSpam[from];
        output(`New member: ${from}, spam: ${spam}`);

        const ws=env.spamToWebsocket[spam];
        ws.onmessage=(res)=>{
            output(`${res.data} sent to ${from}`,"primary");
            try {
                const rsp=JSON.parse(res.data);
                console.log(rsp);
                if(rsp.type==="notice"){
                    output(`------------------- [${order}] test_group_join_free end ---------------------\n`,"info",true);
                    return ck && ck();
                }
            } catch (error) {
                output(`Error from test_group_join_free`,"error",true);
                output(error);
            }
        }
    
        const req={
            cat:"group",
            act:"join",
            id:gid,
            account:from,
            spam:spam,
        }
        env.send(req,spam);
    },
    test_error_group_id:(env,order,ck)=>{

    },
    test_account_blocked:(env,order,ck)=>{

    },
}