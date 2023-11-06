module.exports = {
    active:(obj,from)=>{
        console.log(obj);
        console.log(from);
        return {count:1,act: "active" };
    },
    offline:(obj,from)=>{

    },
}