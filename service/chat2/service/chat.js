const {task,error}=require("./std");
const {online,offline,count,toast,status}=require("./state");

module.exports = {
    online:(input,from)=>{
        const data=status();        //get the server status

        const todo=task("notice");
        todo.params.msg={count:data.alive+1};
        todo.params.to=from;

        online();   //set online amount
        toast();    //ince notice amount
        return [todo];
    },
    to:(input,from)=>{
        if(!input.to) return error("INPUT_MISSING_PARAMETERS");
        if(!input.msg) return error("INPUT_MISSING_PARAMETERS");

        //1.format message 
        const todo=task("message");
        todo.params.type="message";
        todo.params.msg=input.msg;
        todo.params.to=input.to;
        todo.params.from=from;
        delete todo.params.group;

        count();        //inc message account;

        return [todo];
    },

    offline:(input,from)=>{
        const todo=task("notice");
        todo.params.msg="Be off-line.";
        todo.params.to=from;

        offline();   //set online amount
        toast();    //ince notice amount

        return [todo];
    },

    /*****************************************************/
    /**************** addional functions *****************/
    /*****************************************************/

    block:(input,from)=>{
        const todo=task("notice");
        todo.params.msg={count:1};
    },
}