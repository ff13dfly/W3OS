/* 
*  W3OS chat message service or instance message service
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. sent message from one SS58 account to another SS58 account
*/

//WebRTC can create P2P message channel
//https://web.dev/articles/webrtc-basics?hl=zh-cn

//https://github.com/webrtc/samples/tree/gh-pages/src/content/peerconnection/pc1

//IMGC server will exchange the peers information to create the link between them.
//Problem is that, the cached message can not be send properly.
//Will notice the user about this.

const Chat={
    /**********************************************************/
    /******************** W3OS system hook ********************/
    /**********************************************************/
    init:()=>{},
    reg:()=>{
        return {
            list:["ss58","callback","integer","integer"],
            add:["ss58","ss58","callback"],
            remove:["ss58","ss58","callback"],
            update:["ss58","ss58","kv","callback"],
        }
    },
    permit:()=>{
        //if no record, default to allow
        //[0,refused; 1. accepted; 2.not confirm yet; ]
        return {
            list:2,       //need to check permit
            add:2,
            remove:2,   
            load:2,         
            download:2, 
        }
    },
    /***************************************************/
    /******************** Functions ********************/
    /***************************************************/
    message:(mine,addr,msg,ck)=>{

    },
    online:(mine,gid,msg,ck)=>{

    },
    offline:(mine,gid,msg,ck)=>{

    },
    
    link:()=>{

    },
}
export default Chat;