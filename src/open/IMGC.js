import RUNTIME from "../lib/runtime";
import INDEXED from "../lib/indexed";
import tools from "../lib/tools";

let SVC=null;
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
        more:data,
      };
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
  update:(mine,id,data,ck)=>{

  },
  page: (mine, page, ck) => {
    // INDEXED.checkDB(DBname, (db) => {
    //   const tbs = db.objectStoreNames;
    //   const table = `${prefix}${mine}`;
    //   if (!BILL.checkTable(table, tbs)) return ck && ck(false);
    //   const step = 20;
    //   INDEXED.pageRows(db, table, ck, { page: page, step: step });
    // });
  },
}

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
    const data={
      id:res.id,
      type:"group",
      last:{
        from:"",
        msg:"",
      }
    }
    DB.save(mine,res.id,data,()=>{
      console.log('Group saved');
    });

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
      case "message":

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
  list:(ck)=>{    //get the group list
    console.log("here");
  },
}

export default IMGC;
