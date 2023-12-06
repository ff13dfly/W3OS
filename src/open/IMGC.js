import RUNTIME from "../lib/runtime";
import INDEXED from "../lib/indexed";
import tools from "../lib/tools";
import IO from "./IO";

let SVC=null;
let recoder=null;
let spam="";
let mine="";

//unique group format
const table = {
  table: "TABLE_NAME",
  keyPath: "id",
  map: {
    id: { unique: false },        // group id or account address
    type: { unique: false },      // data type
    last: { unique: false },      // last chat details
    update: { unique: false },    // last update stamp
    status: { unique: false },    // group/account status
    more: { unique: false },      // more information of Group/Account
  },
};


let DBname = "w3os_indexed";
let prefix = "talking_";
const DB={
  setConfig: (name, pre) => {
    DBname = name;
    prefix = pre;
  },
  checkTable: (from, list) => {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === from) return true;
    }
    return false;
  },
  getTable: (name) => {
    const data = JSON.parse(JSON.stringify(table));
    data.table = name;
    return data;
  },
  save: (mine,id,data,ck)=>{
    const table = `${prefix}${mine}`;
    INDEXED.checkDB(DBname, (res) => {
      const tbs = res.objectStoreNames;
      const row = {
        id: id,
        type: data.type,
        last:data.last,
        update: tools.stamp(),
        status:1,
      };
      delete data.id;
      delete data.type;
      delete data.last;
      row.more=data;

      if (!DB.checkTable(table, tbs)) {
        const tb = DB.getTable(table);
        INDEXED.initDB(DBname, [tb], res.version + 1).then((db) => {
          INDEXED.insertRow(db, table, [row]);
          return ck && ck();
        });
      } else {
        INDEXED.insertRow(res, table, [row]);
        return ck && ck();
      }
    });
  },
  update:(mine,rows,ck)=>{
    const table = `${prefix}${mine}`;
    INDEXED.checkDB(DBname, (db) => {
      INDEXED.updateRow(db, table, rows, ck);
    });
  },
  view:(mine,id,ck)=>{
    const table = `${prefix}${mine}`;
    INDEXED.checkDB(DBname, (db) => {
      INDEXED.searchRows(db, table, "id",id, (list)=>{
        if(list.length===1) return ck && ck(list[0]);
        return ck && ck(list);
      });
    });
  },
  page: (mine, page, ck) => {
    INDEXED.checkDB(DBname, (db) => {
      const tbs = db.objectStoreNames;
      const table = `${prefix}${mine}`;
      //console.log(table);
      if (!DB.checkTable(table, tbs)) return ck && ck(false);
      const step = 20;
      INDEXED.pageRows(db, table, ck, { page: page, step: step });
    });
  },
  groupList:(id,data,ck)=>{
    const nlist=[data];
    RUNTIME.getTalking((list)=>{
      for(let i=0;i<list.length;i++){
        const row=list[i];
        if(row.id!==id) nlist.push(row);
      }
       RUNTIME.setTalking(nlist,ck);
    });
  },
}

const map={}

const self={
  send:(obj)=>{
    if(!spam) return false;
    obj.spam=spam;
    if(SVC!==null) SVC.send(JSON.stringify(obj));
    console.log(`Req: ${JSON.stringify(obj)}`);
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
    const data={
      id:res.id,
      type:"group",
      last:{
        from:"",
        msg:"",
      }
    }
    console.log(data);
    DB.save(mine,res.id,data,()=>{
      const odata={
        id:res.id,
        type:"group",
        group:[mine],
        nick:"",
        update:tools.stamp(),
        last:{
          from:"",
          msg:"",
        }
      }
      DB.groupList(res.id,odata,(res)=>{
        //console.log(`Group oreder index saved`);
      });
    });

    //2.callback if there is
    if(callback!==undefined){
      map[callback](res);
      delete map[callback];
    } 
  },
  group_detail:(res,callback)=>{
    //1.check the group exsist
    const row={
      id:res.id,
      type:"group",
      last:{
        from:"",
        msg:"",
      },
      more:res,
      status:1,
      update:res.update,
    }
    delete res.id;
    delete res.update;
    DB.update(mine,[row],()=>{
      console.log(`Group[${row.id}] updated.`);
      const odata={
        id:row.id,
        type:"group",
        group:res.group,
        nick:"",
        update:row.update,
        last:{
          from:"",
          msg:"",
        }
      }
      DB.groupList(row.id,odata,(res)=>{
        //console.log(`Group oreder index saved, data: ${JSON.stringify(res)}`);
      });
    });

    //2.callback if there is
    if(callback!==undefined){
      map[callback](res);
      delete map[callback];
    } 
  },

  group_join:(res,callback)=>{
    //1.

    //2.callback if there is
    if(callback!==undefined){
      map[callback](res);
      delete map[callback];
    }
  },
};

const decoder={
  try:(input)=>{
    //console.log(input);
    if(recoder!==null) recoder(input);
    //console.log(input.type);
    switch (input.type){
      case "notice":
        //console.log("here to go");
        const name=`${input.method.cat}_${input.method.act}`;
        const callback=!input.method.callback?undefined:input.method.callback;
        
        if(router[name]) router[name](input.msg,callback);
        break;

      case "message":
        //1.send the message to acitve postman.
        const postman = RUNTIME.getMailer(!input.group?input.from:input.group);
        postman(input);
        
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
  setRecoder:(fun)=>{
    recoder=fun;
  },
  init:(fun)=>{
    if(fun) IMGC.setRecoder(fun); //set out recoder

    //Set IO decoder
    IO.regOpen("IMGC",(params,UI)=>{
      console.log(params);
    });

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
    chat:(ctx,to)=>{
      //console.log(`From ${mine} to ${to}: ${ctx}`);
      const req={
        cat:"group",
        act:"chat",
        to:to,
        msg:ctx,
      }
      self.send(req);
    },

    //!important, key/val string only
    //update target group parameter
    update:(key,val)=>{   
      const req={
        cat:"group",
        act:"params",
        key:key,
        val:val,
      }
      self.send(req);
    },
    switcher:(key,value)=>{

    },
  },
  chat:(ctx,to)=>{
    //console.log(`From ${mine} to ${to}: ${ctx}`);
    const req={
      cat:"chat",
      act:"chat",
      to:to,
      msg:ctx,
    }
    self.send(req);
  },
  vertify:{
    reg:(acc)=>{
      const req={
        cat:"vertify",
        act:"reg",
        account:acc,
      }
      self.send(req);
    },
  },
  list:(ck)=>{    //get the group list
    RUNTIME.getAccount((fa)=>{
      if(!fa) return false;
      mine=fa.address;

      let page=0;
      DB.page(mine,page,(res)=>{
        console.log(res);
      });
    });
  },
  local:{
    view:DB.view,
  },
}

export default IMGC;