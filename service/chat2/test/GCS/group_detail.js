const tools = require('../../common/tools');
const {output}= require('../../common/output');

module.exports={
    test_group_details(env,order,ck){
        output(`------------------- [${order}] test_group_details start -------------------`,"info",true);
        const gid=env.groups[0];
        const group=env.details[gid];
        const creator=group.manager;
        const spam=env.accountToSpam[creator];
        output(`Group Manager: ${creator}, spam: ${spam}`);
    
        const ws=env.spamToWebsocket[spam];
        ws.onmessage=(res)=>{
            output(res.data,"primary");
            try {
                const rsp=JSON.parse(res.data);
                if(rsp.type==="notice"){
                    output(`------------------- [${order}] test_group_details end ---------------------\n`,"info",true);
                    return ck && ck();
                }
            } catch (error) {
                output(`Error from test_group_create`,"error",true);
                output(error);
            }
        }
    
        const req={
            cat:"group",
            act:"detail",
            id:gid,
            spam:spam,
        }
        env.send(req,spam);
    
        
    },
    test_account_not_in_group:(env,order,ck)=>{
        output(`------------------- [${order}] test_account_not_in_group start -------------------`,"info",true);

        output(`------------------- [${order}] test_account_not_in_group end ---------------------\n`,"info",true);
        return ck && ck();
    },
}