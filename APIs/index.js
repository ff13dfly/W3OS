/* 
*  W3OS APIs entry
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-02
*  @version 1.0.0
*  @functions
*  1.modules register here, functions and parameters definition
*  2.basic information
*  3.debug mode
*/

import RUNTIME from "./core/runtime.js";

let debug=false;       //debug module
const W3={
    /*
    * W3 caller, only way to call the functions W3OS supported
    * @param method string | array      //method name or call path
    * @param ...                      //the left params follow the target functions
    * return
    * the result or standard error
    */
    call:function(method){ // need to function way, or can not get the arguments
        RUNTIME.setDebug(debug);    //W3OS API debug module.
        RUNTIME.start(()=>{         //Start W3OS, will not reload
            //1.format the path
            const rlist=[];
            if(Array.isArray(method)){
                console.log(`Array type.`);
            }else{
    
            }
            const type=typeof method;
            console.log(`Path type: ${type}`);
    
            //2.get the params by map
            console.log(arguments);
    
            //3.check permit here or ask for permission
        });
    },

    /*
    * W3 method definition
    * @param method string | array | undefined      //method name or call path
    * return
    * the details of the method, such as parameters and response result sample
    */
    def:function(method,ck){
        RUNTIME.def(method,ck);
    },

    //set W3OS to debug mode.
    debug:()=>{
        debug=true;
    },

    //W3OS version details
    version:RUNTIME.version(),
}

export default W3;