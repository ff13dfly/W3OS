const tools = require("../common/tools");
const DB = require("../common/mndb");

const format={
    group:{
        id:"",              //group unique id
        group:[],           //group account list
        status:1,           //group status
        create:0,           //group create time
        update:0,           //group update time
        announce:[],        //announce list
        permit:{},          //permit setting
    },
}

const self={
    format:(type)=>{

    },
}

module.exports = {
    message:(obj,from)=>{

    },
    create:(obj,from)=>{
        //1.prepare the group default data
        const accs=obj.list;

        const gid=tools.char(10);
        const data=self.format("group");
        data.update=tools.stamp();
        data.create=tools.stamp();
        data.group=accs;

        DB.key_set(gid,data);

        return {count:1,act: "create",cat:"group",id:gid };
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