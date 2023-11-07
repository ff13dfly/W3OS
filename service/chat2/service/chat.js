module.exports = {
    active:(obj,from)=>{
        console.log(obj);
        console.log(from);
        return {count:1,act: "active" };
    },
    to:(obj,from)=>{
        console.log(obj);
        console.log(from);

        return {act:"chat"};
    },
    offline:(obj,from)=>{

    },
    block:(obj,from)=>{

    },
}