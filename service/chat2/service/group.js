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
}

module.exports = {
    message:(obj,from)=>{

    },
    create:(obj,from)=>{
        if(!self.validAccounts(obj.list)) return error("INPUT_INVALID_ACCOUNT");

        //1.prepare the group default data
        const gid=self.getGID();
        const data=format("group");
        data.update=tools.stamp();
        data.create=tools.stamp();
        data.group=obj.list;
        DB.key_set(gid,data);

        //2.sent notification to customer
        const todo=task("notification");
        todo.params.msg={id:gid};
        todo.params.to=from;
        return [todo];
    },
    chat:(obj,from)=>{
        const gid=obj.to;
        const data=DB.key_get(gid);
        console.log(`From group.js, input: ${JSON.stringify(obj)}`);
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

    },
    detail:(obj,from)=>{
        const gid=obj.id;
        const data=DB.key_get(gid);
        return {act: "detail",cat:"group",data:data};
    },
    join:(obj,from)=>{
        console.log(obj);
        console.log(from);
        return {act:"chat"};
    },
    leave:(obj,from)=>{

    },
    destory:(obj,from)=>{

    },
}