/* 
*  W3OS parameters checker
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-02
*  @version 1.0.0
*  @functions
*  1.check valid of parameters
*  2. array support. For example, type "[string]" define means the params are all string
*/

const router={
    callback:(param)=>{
        if(Array.isArray(param)){

        }else{

        }
    },
    string:(param)=>{
        if(Array.isArray(param)){

        }else{
            
        }
    },
    function:(param)=>{
        if(Array.isArray(param)){

        }else{
            
        }
    },
    integer:(param)=>{
        if(Array.isArray(param)){

        }else{
            
        }
    },
    ss58:(param)=>{
        if(Array.isArray(param)){

        }else{
            
        }
    },
    alink:(param)=>{
        if(Array.isArray(param)){

        }else{
            
        }
        return true;
    },
}

const Checker=(input,type)=>{
    //check wether "input" is array.
     


    if(!router[type]) return false;
    return router[type](input);
}
export default Checker;