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
import Error from "./system/error.js";

const queue=[];         //call queue, the call need to cache here then run after login
let debug = false;      //debug module
const W3 = {
    /*
    * W3 caller, only way to call the functions W3OS supported
    * @param method string | array | object     //method name or call path
    * @param alink  string                      //anchor link ( anchor://name/block_number ), need this to set permission
    * @param ...                                //the left params follow the target functions
    * return
    * the result or standard error
    */

    //Three way of call path
    //["account","local","get"],"account_local_get","account.local.get"

    //Two way of send parameters
    //W3.call("function", p_0,p_1, ... );
    //W3.call("function", [p_0,p_1]);

    //Usage of call function 
    //W3.call("account_local_get", ... );
    //W3.call(["account","local","get"], ... )
    //W3.call({method:["account","local","get"]}, ... )
    //W3.call({method:["account","local","get"],alink:"anchor://w3os"}, ... )
    //W3.call({method:"account_local_get"}, ... )
    //W3.call({method:"account_local_get",alink:"anchor://w3os/2343"}, ... )

    call: function (input) { // need to function way, or can not get the arguments
        //1.check input type;
        const type = typeof input;
        if (!["string","object"].includes(type)) return Error.throw("INVALID_CALL_PATH", "core");
        if(input===null) return Error.throw("INVALID_CALL_PATH", "core");
        
        //2.format input, get the proper call parameters 
        let method, alink, path;
        if (type === "object") {
            if (!Array.isArray(input)){
                if (!input.method) return Error.throw("INVALID_CALL_OBJECT", "core");
                method = input.method;
                path=!Array.isArray(method)?method.split("_"):method;

                if (input.alink && typeof input.alink !== "string") return Error.throw("INVALID_ANCHOR_LINK", "core");
                alink = !input.alink ? "SYSTEM" : input.alink;
            } else {
                path = input;
            }
        } else {
            alink = "SYSTEM";
            path = input.split("_");
        }

        //3.format the parameters
        const params = [];
        if (arguments.length > 1) {
            for (let i = 1; i < arguments.length; i++) {
                params.push(arguments[i]);
            }
        }

        queue.push({path:path,params:params,alink:alink});

        //0.start the W3 API anyway.
        RUNTIME.setDebug(debug);    //W3OS API debug mode.
        RUNTIME.start((state) => {         //Start W3OS, will not reload. Even the call is failed.        
            //0.check wether login ( first time to run the W3OS API )
            if(state!==1) return Error.throw("FAILED_LOGIN", "core");
            const loop=()=>{
                if(queue.length===0) return true;
                const task=queue.pop();
                const {path,params,alink}=task;
                RUNTIME.call(path, params, alink);
                loop();
            };
            loop();
        });
    },

    /*
    * W3 method definition
    * @param method string | array | undefined      //method name or call path
    * return
    * the details of the method, such as parameters and response result sample
    */
    def: function (method, ck) {
        RUNTIME.start((res) => {
            RUNTIME.def(method, ck);
        });
    },

    //Anchor toolbox here, such as loader, converter
    util:{

    },

    //set W3OS to debug mode.
    debug: () => {
        debug = true;
    },

    //set W3 to dapp mode. When this is set to special anchor link. All call need to use this one to get permission.
    //return a W3 instance to the Dapp
    dapp:(alink)=>{
        
        return RUNTIME.setDapp(alink);
    },

    //W3OS version details
    version: RUNTIME.version(),



    //TODO, following functions are scheduled.
    //array of calls, to impl complex functions
    task:(todo,ck)=>{
        //Error.throw("UNDER_DEVELOPPING", "core", "Just a joke, :-)");
        return ck && ck(Error.get("UNDER_DEVELOPPING", "core", "Just a joke, :-)"));
    },
    //get help details from Anchor Network
    help:(search,ck)=>{

    },

    //Just for debug, test
    ext:{
        getDapp:()=>{
            return RUNTIME.getDapp();
        }
    },
}

export default W3;