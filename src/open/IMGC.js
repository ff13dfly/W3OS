import RUNTIME from "../lib/runtime";
import INDEXED from "../lib/indexed";
import tools from "../lib/tools";

let SVC=null;
let spam="";
let mine="";

const map={}

const self={
  send:(obj)=>{
    if(!spam) return false;
    obj.spam=spam;
    if(SVC!==null) SVC.send(JSON.stringify(obj));
    return true;
  },
  reg:()=>{
    const req={act:"active",acc:mine,spam:spam}
    self.send(req);
  },
  callbackKey:()=>{
    return `${tools.char(3)}_${tools.stamp()}`;
  },
  setCallback:(fun)=>{
    const key=self.callbackKey();
    map[key]=fun;
    return key;
  },
};

const router={
  //!important, when your friend create a group which you are included, then you will get a notice.
  //!important, there is no callback, but still need to create the target group
  group_create:(res,callback)=>{
    //1.update group index

    //2.callback if there is
    if(callback!==undefined){
      map[callback](res);
      delete map[callback];
    } 
  },
  group_detail:(res,callback)=>{
    //1.check the group exsist

    //2.callback if there is
    if(callback!==undefined){
      map[callback](res);
      delete map[callback];
    } 
  },

  group_join:(res,callback)=>{

    //2.callback if there is
    if(callback!==undefined){
      map[callback](res);
      delete map[callback];
    }
  },
};

const decoder={
  try:(input)=>{
    console.log(input);
    switch (input.type) {
      case "notice":
        const name=`${input.method.cat}_${input.method.act}`;
        if(router[name])router[name](input.msg,!input.method.callback?undefined:input.method.callback);
        break;
    
      default:
        break;
    }
  },
};

// agent to websocket to accept the input
const agent={
  open:(res)=>{},
  message:(res)=>{
    try {
      const input=JSON.parse(res.data);
      if(input.act==="init"){
        spam=input.spam;
        self.reg();
      }else{
        decoder.try(input);
      }
    } catch (error) {
        
    }
  },
  close:(res)=>{
    SVC=null;   //set websocket
  },
  error:(res)=>{
    console.log(res);
  },
};

const IMGC={
  init:()=>{
    if(SVC!==null) return true;
    RUNTIME.getAccount((fa)=>{
      if(!fa) return false;
      mine=fa.address;
      const cfg=RUNTIME.getConfig("system");
      const uri=cfg.basic.talking[0];
      RUNTIME.websocket(uri,(ws)=>{
        SVC=ws;
      },agent)
    });
  },
  group:{
    create:(accounts,ck)=>{
      //1.basic function
      const req={
        cat:"group",
        act:"create",
        list:accounts,
      }
      if(ck) req.callback=self.setCallback(ck); //2.callback support
      self.send(req);
    },
    detail:(id,ck)=>{
      const req={
        cat:"group",
        act:"detail",
        id:id,
      }
      if(ck) req.callback=self.setCallback(ck); //2.callback support
      self.send(req);
    },
    leave:(id)=>{
      const req={
        cat:"group",
        act:"leave",
        id:id,
      }
      self.send(req);
    },
    chat:(ctx)=>{

    },
  },
  chat:{

  },
}

export default IMGC;
