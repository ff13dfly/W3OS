const {task,error}=require("./std");

module.exports = {
    online:(obj,from)=>{
        const todo=task("notice");
        todo.params.msg={count:1};
        todo.params.to=from;
        return [todo];
    },
    to:(obj,from)=>{
        if(!obj.to) return error("INPUT_MISSING_PARAMETERS");
        if(!obj.msg) return error("INPUT_MISSING_PARAMETERS");

        const todo=task("message");
        todo.params.msg=obj.msg;
        todo.params.to=obj.to;
        todo.params.from=from;

        return [todo];
    },

    offline:(obj,from)=>{
        const todo=task("notice");
        todo.params.msg={count:1};
    },
    block:(obj,from)=>{
        const todo=task("notice");
        todo.params.msg={count:1};
    },
}