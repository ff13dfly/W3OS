import RUNTIME from "../lib/runtime";
//import INDEXED from "../lib/indexed";
//import tools from "../lib/tools";

let SVC=null;
let spam="";
let mine="";

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
};

const router={
  group_create:(res)=>{
    IMGC.group.detail(res.id);

  },
  group_detail:(res)=>{
    console.log(res);
    //1.check the group exsist

    //2.update group information
  },
};

const decoder={
  try:(input)=>{
    console.log(input);
    switch (input.type) {
      case "notice":
        const name=`${input.method.cat}_${input.method.act}`;
        if(router[name])router[name](input.msg);
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
    create:(accounts)=>{
      const req={
        cat:"group",
        act:"create",
        list:accounts,
      }
      self.send(req);
    },
    detail:(id)=>{
      const req={
        cat:"group",
        act:"detail",
        id:id,
      }
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
