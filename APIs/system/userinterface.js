/* 
*  W3OS input management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. decode input;
*  2. manage input functions to call;
*/

const replacment={
    log:null,
};

const Userinterface={
    //reset the system functions
    set:(key,fun)=>{

    },

    //reset to default functions
    reset:(key)=>{
        delete replacment[key];
        replacment[key]=null;
    },

    //system log, default is the 
    log:(str)=>{
        if(replacment.log!==null) return replacment.log(str);
        console.log(str);
    },
}
export default Userinterface;