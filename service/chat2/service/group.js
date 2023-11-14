const tools = require("../common/tools");
const DB = require("../common/mndb");
const {format,task,error}=require("./std");
const {count,toast}=require("./state");

const prefix="GD";
const self={
    //get unique group id
    getGID:()=>{
        const unique=prefix+tools.char(10);
        if(DB.key_get(unique)!==null) return self.getGID();
        return unique;
    },

    //check input accounts validity
    validAccounts:(list)=>{
        for(let i=0;i<list.length;i++){

        }
        return true;
    },

    //check input group ID validity
    validGID:(gid)=>{

    },

    //check wether account not in account list
    validNewAccount:(acc,list)=>{
        for(let i=0;i<list.length;i++){
            if(acc===list[i]) return false;
        }
        return true;
    },

    //check wether account in account list
    validInAccount:(acc,list)=>{
        for(let i=0;i<list.length;i++){
            if(acc===list[i]) return true;
        }
        return false;
    },
}

module.exports = {

    /*****************************************************/
    /***************** group operations ******************/
    /*****************************************************/

    //create a new group
    create:(input,from)=>{
        console.log(`From group.js/chat, input: ${JSON.stringify(input)}`);

        if(!self.validAccounts(input.list)) return error("INPUT_INVALID_ACCOUNT");

        //1.prepare the group default data
        const gid=self.getGID();
        const data=format("group");
        data.id=gid;
        data.update=tools.stamp();      
        data.create=tools.stamp();
        data.group=input.list;
        data.manager=from;
        DB.key_set(gid,data);

        //2.sent notification to customer
        const todo=task("notice");
        todo.params.msg={id:gid};
        todo.params.to=from;
        todo.params.method={
            act:"create",
            cat:"group"
        };
        //if(input.callback)todo.callback=input.callback;
        return [todo];
    },

    //get the group details
    detail:(input,from)=>{
        const gid=input.id;
        const data=DB.key_get(gid);

        //1.check valid, only member of group can get it
        if(!self.validInAccount(from,data.group)) return error("INPUT_UNEXCEPT");

        const todo=task("notice");
        todo.params.msg=data;
        todo.params.to=from;
        todo.params.method={
            act:"detail",
            cat:"group"
        };
        return [todo];
    },

    //join a group
    join:(input,from)=>{
        console.log(`From group.js/join, input: ${JSON.stringify(input)}`);

        //1.save new account
        const gid=input.id;
        const data=DB.key_get(gid);
        if(!self.validNewAccount(input.account,data.group)) return error("INPUT_UNEXCEPT");
        data.group.push(input.account);
        DB.key_set(gid,data);

        //2.check the block list

        //3.sent notice to all
        const todos=[];
        
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            const todo=task("notice");
            todo.params.msg=`${input.account} join to chat`;
            todo.params.to=to;
            todo.params.method={
                act:"join",
                cat:"group"
            };
            todos.push(todo);
        }

        toast(todos.length);    //inc the notice amount

        return todos;
    },

    //member leave the group
    leave:(input,from)=>{
        console.log(`From group.js/leave, input: ${JSON.stringify(input)}`);

        const gid=input.id;
        const data=DB.key_get(gid);
        if(!self.validInAccount(input.account,data.group)) return error("INPUT_UNEXCEPT");

        //1.notice to all and move target account
        const todos=[];
        const ngroup=[];
        console.log(data.group);
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            const todo=task("notice");
            todo.params.msg={
                from:from,
                group:gid,
            };
            todo.params.to=to;
            todo.params.method={
                act:"leave",
                cat:"group"
            };
            todos.push(todo);
            if(to!==input.account) ngroup.push(to);
        }

        data.group=ngroup;
        DB.key_set(gid,data);       //set the new group

        toast(todos.length);    //inc the notice amount

        return todos;
        
    },

    //transfer the manager 
    divert:(input,from)=>{
        console.log(`From group.js/divert, input: ${JSON.stringify(input)}`);

        //1.check the permit and set new manager
        const gid=input.id;
        const data=DB.key_get(gid);
        if(!data) return error("INPUT_UNEXCEPT");
        if(data.manager!==from) return error("INPUT_UNEXCEPT");
        data.manager=input.manager;
        DB.key_set(gid,data);

        //2.sent notice to related member
        //2.1.sent notice to all
        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            const todo=task("notice");
            todo.params.msg=`Group manager is ${input.manager} now`;
            todo.params.to=to;
            todo.params.method={
                act:"devert",
                cat:"group"
            };
            todos.push(todo);
        }

        //2.2.sent notice to new manager
        const n_new=task("notice");
        n_new.params.msg=`You are the new group manager`;
        n_new.params.to=input.manager;
        n_new.params.method={
            act:"devert",
            cat:"group"
        };
        todos.push(n_new);

        //2.3.sent notice to old manager
        const o_new=task("notice");
        o_new.params.msg=`You are not the group manager`;
        o_new.params.to=from;
        o_new.params.method={
            act:"devert",
            cat:"group"
        };
        todos.push(o_new);

        toast(todos.length);    //inc the notice amount
        
        return todos;
    },

    //deport target account from group, the account will be set to block list
    deport:(input,from)=>{
        //1.check the permit and set new manager
        const gid=input.id;
        const data=DB.key_get(gid);
        if(!data) return error("INPUT_UNEXCEPT");
        if(data.manager!==from) return error("INPUT_UNEXCEPT");

        //2.add the account to block list
        data.block.push(input.account);
        DB.key_set(gid,data);

        //3.sent notice to proper accounts.
        const todo=task("notice");
        todo.params.msg=`${input.account} is added to block list`;
        todo.params.to=from;
        todo.params.method={
            act:"deport",
            cat:"group"
        };
        return [todo];
    },

    recover:(input,from)=>{
        //1.check the permit and set new manager
        const gid=input.id;
        const data=DB.key_get(gid);
        if(!data) return error("INPUT_UNEXCEPT");
        if(data.manager!==from) return error("INPUT_UNEXCEPT");

        //2.remove the account from block list
        const nlist=[];
        for(let i=0;i<data.block.length;i++){
            if(data.block[i]!==input.account) nlist.push(data.block[i]);
        }
        data.block=nlist;
        DB.key_set(gid,data);

        //3.sent notice to proper accounts.
        const todo=task("notice");
        todo.params.msg=`${input.account} is removed from block list`;
        todo.params.to=from;
        todo.params.method={
            act:"recover",
            cat:"group"
        };
        return [todo];
    },

    //destory the group on server
    destory:(input,from)=>{
        console.log(`From group.js/destory, input: ${JSON.stringify(input)}`);

        //1.check the permit to remove group
        const gid=input.to;
        const data=DB.key_get(gid);
        if(!data) return error("INPUT_UNEXCEPT");
        if(data.manager!==from) return error("INPUT_UNEXCEPT");
        DB.key_del(gid);

        //2.notice to all members.
        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            const todo=task("notice");
            todo.params.msg=`Group destoried`;
            todo.params.to=to;
            todos.push(todo);
        }
        toast(todos.length);    //inc the notice amount

        return todos;

    },

    /*****************************************************/
    /***************** message functions *****************/
    /*****************************************************/

    //sent message to group
    message:(input,from)=>{
        console.log(`From group.js/chat, input: ${JSON.stringify(input)}`);

        const gid=input.to;
        const data=DB.key_get(gid);
        if(data===null) return error("INPUT_INVALID_GROUP_ID");

        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            if(to===from) continue;

            const todo=task("message");
            todo.params.msg=input.msg;
            todo.params.to=to;
            todo.params.from=from;
            todos.push(todo);
        }
        count(todos.length);    //inc the message send amount

        return todos;
    },

    //sent notice to group
    notice:(input,from)=>{
        console.log(`From group.js/notice, input: ${JSON.stringify(input)}`);

        const gid=input.to;
        const data=DB.key_get(gid);
        if(data===null) return error("INPUT_INVALID_GROUP_ID");

        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            if(to===from) continue;

            const todo=task("notice");
            todo.params.msg=input.msg;            //notic message from input
            todo.params.to=to;
            todos.push(todo);
        }

        toast(todos.length);    //inc the notice send amount

        return todos;
    },

    //set the announcement of the group
    announce:(input,from)=>{

    }
}