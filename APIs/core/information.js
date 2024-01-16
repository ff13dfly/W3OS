/* 
*  W3OS information
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-28
*  @functions
*  1.version information
*  2.licence information
*/

//start from "0.0.2", the first version is in W3OS mobile, not isolated.

const Information={
    version:"0.0.2",            //version of W3OS APIs
    nick:"Flamingo",            //nick name for this version, a place everytime
    description:[               //description for this version
        "Isolate APIs of W3OS, command line support",
    ],             
    licence:{
        type:"Apache2.0",       //licence type
        url:"",                 //github url of licence
        anchor:"",              //anchor link of licence
    },
    create:"2023-12-25",        //development start date
    release:"2024-03-*",        //version release date
    auth:["Fuu"],               //developer of this version
    base:"Anchor Network",      //Need Anchor Network support, all data and dapps on chain
    protocol:"Easy Protocol",   //Data protocol, 
}
export default Information;