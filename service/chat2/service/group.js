module.exports = {
    create:(obj,from)=>{
        console.log(obj);
        console.log(from);
        return {count:1,act: "active" };
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