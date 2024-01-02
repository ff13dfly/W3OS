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
    * @param method string | array | object     //method name or call path
    * @param alink  string                      //anchor link, need this to set permission
    * @param ...                                //the left params follow the target functions
    * return
    * the result or standard error
    */

    //Usage of call function 
    //W3.call("account_local_get", ... );
    //W3.call(["account","local","get"], ... )
    //W3.call({method:["account","local","get"]}, ... )
    //W3.call({method:["account","local","get"],anchor:"w3os"}, ... )
    //W3.call({method:"account_local_get"}, ... )
    //W3.call({method:"account_local_get",anchor:"w3os"}, ... )

    //TODO, need to check wether call from CDapps. Will regroup the parameters check
    call:function(method){ // need to function way, or can not get the arguments
        //1.check input type;

        const obj={
            method:"",
            anchor:"",
        }
        const alink=""

        //2.format input;
        RUNTIME.setDebug(debug);    //W3OS API debug module.
        RUNTIME.start(()=>{         //Start W3OS, will not reload
            //1.format the path
            const path=!Array.isArray(method)?method.split("_"):method;

            //2.format the parameters
            const params=[];
            if(arguments.length>2){
                for(let i=1;i<arguments.length;i++){
                    params.push(arguments[i]);
                }
            }
            return RUNTIME.call(path,params,alink);
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