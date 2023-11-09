const tools = require("../common/tools");
const DB = require("../common/mndb");
const {format,task}=require("./std");

module.exports = {
    message:(obj,from)=>{

    },
    create:(obj,from)=>{
        //1.prepare the group default data
        const accs=obj.list;

        const gid=tools.char(10);
        const data=format("group");
        data.update=tools.stamp();
        data.create=tools.stamp();
        data.group=accs;

        DB.key_set(gid,data);

        const todo=task("notification");
        todo.params.msg={id:gid};
        todo.params.to=from;
        return [todo];
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