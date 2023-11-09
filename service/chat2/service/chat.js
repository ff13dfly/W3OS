const {task}=require("./std");

module.exports = {
    online:(obj,from)=>{
        const todo=task("notification");
        todo.params.msg={count:1};
        todo.params.to=from;
        return [todo];
    },
    to:(obj,from)=>{
        const todo=task("message");
        todo.params.msg=obj.msg;
        todo.params.to=obj.to;
        todo.params.from=from;
        return [todo];
    },

    offline:(obj,from)=>{

    },
    block:(obj,from)=>{

    },
}