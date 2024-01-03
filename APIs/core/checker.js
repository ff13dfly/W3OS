/* 
*  W3OS parameters checker
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-02
*  @version 1.0.0
*  @functions
*  1.check valid of parameters
*/

const router={
    callback:(param)=>{

    },
    string:(param)=>{

    },
    function:(param)=>{

    },
    integer:(param)=>{

    },
    ss58:(param)=>{

    },
    alink:(param)=>{
        return true;
    },
}

const Checker=(input,type)=>{
    if(!router[type]) return false;
    return router[type](input);
}
export default Checker;