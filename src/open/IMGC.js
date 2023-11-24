import RUNTIME from "../lib/runtime";
import INDEXED from "../lib/indexed";
import tools from "../lib/tools";

let SVC=null;
let spam="";
let mine="";
let map={};

const self={
  send:(obj)=>{
    if(!spam) return false;
    if(SVC!==null) SVC.send(JSON.stringify(obj));
    return true;
  },
  reg:()=>{
    const req={act:"active",acc:mine,spam:spam}
    self.send(req);
  },
};

const decoder={
  try:(input)=>{
    console.log(input);
  },
}

const agent={
  open:(res)=>{
    console.log(res);
  },
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
      const key="group_create";
      const req={
        cat:"group",
        act:"create",
        list:accounts,
        spam:spam,
      }
      self.send(req);
      map[key]=ck;
    },
    leave:()=>{

    }
  },
  chat:{

  },
}

export default IMGC;
