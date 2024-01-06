/* 
*  W3OS runtime function
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2024-01-04
*  @version 1.0.0
*  @functions
*  1.default system setting
*/

const Default={
    node:["ws://127.0.0.1:9922","ws://127.0.0.1:9944","ws://127.0.0.1:6666"],       //entry nodes, will try one by one
    server:"anchor://active",           //anchor of more node and server list, used to update the node list
    libs:{                              //basice libs which are loaded from the startup, will added to `W3.SDK`
        frontend:["anchor://polkadot","anchor://anchorjs","anchor://easy"],
        backend:["anchor://polkadot","anchor://anchorjs","anchor://easy"],
    },
    dev:{                               //not stable SDKs
        frontend:["anchor://devpok","anchor://devanchor","anchor://deveasy"],
        nodejs:["","",""],
    },
    support:"sdks",         //the SDKs supportted by W3OS, anchor data, get the latest
}

export default Default;