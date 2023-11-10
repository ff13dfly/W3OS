const tools = require("../common/tools");
const DB = require("../common/mndb");
const {format,task,error}=require("./std");

const prefix="GD";
const self={
    getGID:()=>{
        const unique=prefix+tools.char(10);
        if(DB.key_get(unique)!==null) return self.getGID();
        return unique;
    },
    validAccounts:(list)=>{
        for(let i=0;i<list.length;i++){

        }
        return true;
    },
    validGID:(gid)=>{

    },
    validNewAccount:(acc,list)=>{
        for(let i=0;i<list.length;i++){
            if(acc===list[i]) return false;
        }
        return true;
    },
    validInAccount:(acc,list)=>{
        for(let i=0;i<list.length;i++){
            if(acc===list[i]) return true;
        }
        return false;
    },
}

module.exports = {
    create:(obj,from)=>{
        console.log(`From group.js/chat, input: ${JSON.stringify(obj)}`);

        if(!self.validAccounts(obj.list)) return error("INPUT_INVALID_ACCOUNT");

        //1.prepare the group default data
        const gid=self.getGID();
        const data=format("group");
        data.update=tools.stamp();
        data.create=tools.stamp();
        data.group=obj.list;
        DB.key_set(gid,data);

        //2.sent notification to customer
        const todo=task("notice");
        todo.params.msg={id:gid};
        todo.params.to=from;
        return [todo];
    },
    message:(obj,from)=>{
        console.log(`From group.js/chat, input: ${JSON.stringify(obj)}`);

        const gid=obj.to;
        const data=DB.key_get(gid);
        if(data===null) return error("INPUT_INVALID_GROUP_ID");

        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            if(to===from) continue;

            const todo=task("message");
            todo.params.msg=obj.msg;
            todo.params.to=to;
            todo.params.from=from;
            todos.push(todo);
        }
        return todos;
    },
    notice:(obj,from)=>{
        console.log(`From group.js/notice, input: ${JSON.stringify(obj)}`);

        const gid=obj.to;
        const data=DB.key_get(gid);
        if(data===null) return error("INPUT_INVALID_GROUP_ID");

        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            if(to===from) continue;

            const todo=task("notice");
            todo.params.msg=obj.msg;            //notic message from input
            todo.params.to=to;
            todos.push(todo);
        }
        return todos;
    },
    detail:(obj,from)=>{
        const gid=obj.id;
        const data=DB.key_get(gid);
        //1.check valid, only member of group can get it


        return {act: "detail",cat:"group",data:data};
    },
    join:(obj,from)=>{
        console.log(`From group.js/join, input: ${JSON.stringify(obj)}`);

        //1.save new account
        const gid=obj.to;
        const data=DB.key_get(gid);
        if(!self.validNewAccount(obj.account,data.group)) return error("INPUT_UNEXCEPT");
        data.group.push(obj.account);
        DB.key_set(gid,data);

        //2.sent notice to all
        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            if(to===from) continue;

            const todo=task("notice");
            todo.params.msg=`${obj.account} join to chat`;
            todo.params.to=to;
            todos.push(todo);
        }
        return todos;
    },
    leave:(obj,from)=>{
        console.log(`From group.js/leave, input: ${JSON.stringify(obj)}`);

        const gid=obj.to;
        const data=DB.key_get(gid);
        if(!self.validInAccount(obj.account,data.group)) return error("INPUT_UNEXCEPT");

        //1.notice to all and move target account
        const todos=[];
        const ngroup=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            if(to===obj.account) continue;

            const todo=task("notice");
            todo.params.msg=`${obj.account} leave`;
            todo.params.to=to;
            todos.push(todo);
            ngroup.push(to);
        }

        data.group=ngroup;
        DB.key_set(gid,data);       //set the new group

        return todos;
        
    },
    divert:(obj,from)=>{
        console.log(`From group.js/divert, input: ${JSON.stringify(obj)}`);

        //1.check the permit and set new manager
        const gid=obj.to;
        const data=DB.key_get(gid);
        if(!data) return error("INPUT_UNEXCEPT");
        if(data.manager!==from) return error("INPUT_UNEXCEPT");
        data.manager=obj.manager;
        DB.key_set(gid,data);

        //2.sent notice to related member
        //2.1.sent notice to all
        const todos=[];
        for(let i=0;i<data.group.length;i++){
            const to=data.group[i];
            const todo=task("notice");
            todo.params.msg=`Group manager is ${obj.manager} now`;
            todo.params.to=to;
            todos.push(todo);
        }

        //2.2.sent notice to new manager
        const n_new=task("notice");
        n_new.params.msg=`You are the new group manager`;
        n_new.params.to=obj.manager;
        todos.push(n_new);

        //2.3.sent notice to old manager
        const o_new=task("notice");
        o_new.params.msg=`You are not the group manager`;
        o_new.params.to=from;
        todos.push(o_new);
        
        return todos;
    },
    destory:(obj,from)=>{
        console.log(`From group.js/destory, input: ${JSON.stringify(obj)}`);

        //1.check the permit to remove group
        const gid=obj.to;
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
        return todos;

    },
}