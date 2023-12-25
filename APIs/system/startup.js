/* 
*  W3OS startup functions
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.init all stuffs
*  2.account JSON file storage 
*/


const agent_sample={
    init:{
        salt:"",            //encry salt
        login:()=>{},       //login fun from UI side
        render:()=>{},      //render fun from UI side
    },   
}

//TODO, whole system status, it is important
//system status: [0,started;  9.noraml;]
const status=0;     

const map={}        //startup functions
const Startup={
    start:(agent,ck)=>{
        //1.encry init;

    },

    //reg startup funs
    reg:(key,fun)=>{

    },
    //remove startup funs
    remove:(key)=>{

    },
}
export default Startup;