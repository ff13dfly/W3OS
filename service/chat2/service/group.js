const tools = require("../common/tools");
const DB = require("../common/mndb");
const {format,task,error}=require("./std");

const self={
    getGID:()=>{
        return "GD"+tools.char(10);
    },
    validAccounts:(list)=>{
        for(let i=0;i<list.length;i++){

        }
        return true;
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