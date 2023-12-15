import INDEXED from "./indexed";
import tools from "./tools";

//const DBname='w3os_history';
let DBname = "w3os_indexed";
let prefix = "chat_";

const table = {
  table: "TABLE_NAME",
  keyPath: "stamp",
  map: {
    address: { unique: false },
    way: { unique: false },
    stamp: { unique: false },
    status: { unique: false },
  },
};

const status = {
  UNREAD: 3,
  NORMAL: 1,
  REMOVE: 0,
};

const map = {};

const CHAT = {
  preInit:(acc,ck)=>{
    const table=`${prefix}${acc}`;
    const tb=CHAT.getTable(table);
    INDEXED.checkDB(DBname, (res) => {
      const tbs = res.objectStoreNames;
      return ck && ck(!INDEXED.checkTable(tbs,table)?tb:false);
    });
  },
  friends: (fs) => {
    //set friend list
    for (var k in fs) map[k] = true;
  },
  setConfig: (name, pre) => {
    DBname = name;
    prefix = pre;
  },
  getTable: (name) => {
    const data = JSON.parse(JSON.stringify(table));
    data.table = name;
    return data;
  },
  save: (mine,from, ctx, way,group,un,ck) => {
    console.log(`My account: ${mine}, from: ${from}, way: ${way}, group:${group}, un: ${un}, content: ${ctx}`);
    const table = `${prefix}${mine}`;
    INDEXED.checkDB(DBname, (res) => {
      let row=null;
      const state= way === "to" ? status.NORMAL: (!un? status.UNREAD :status.NORMAL);
      //console.log(state,from,un);
      if(!group){
        row = {
          address: from,
          msg: ctx,
          status:state,
          way: way,
          stamp: tools.stamp(),
        };
      }else{
        row = {
          address: group,
          from: from,
          msg: ctx,
          status: state,
          way: way,
          stamp: tools.stamp(),
        };
      }
      
      const tbs = res.objectStoreNames;
      if (!INDEXED.checkTable(tbs, table)) {
        const tb = CHAT.getTable(table);
        INDEXED.initDB(DBname, [tb], res.version + 1).then((db) => {
          INDEXED.insertRow(db, table, [row]);
          return ck && ck(map[from] ? true : from);
        });
      } else {
        INDEXED.insertRow(res, table, [row]);
        return ck && ck(map[from] ? true : from);
      }
    });
  },
  page: (mine, from, step, page, ck) => {
    INDEXED.checkDB(DBname, (db) => {
      const target = `${prefix}${mine}`;
      const tbs = db.objectStoreNames;
      if (!INDEXED.checkTable(tbs,target)) return ck && ck(false);
      INDEXED.searchRows(db, target, "address", from, ck);
    });
  },

  unread: (mine, from, ck) => {
    const status = 3;
    const target = `${prefix}${mine}`;
    INDEXED.checkDB(DBname, (db) => {
      INDEXED.countRows(db, target, "address", from, status, ck);
    });
  },

  toread: (mine, rows, ck) => {
    const target = `${prefix}${mine}`;
    INDEXED.checkDB(DBname, (db) => {
      INDEXED.updateRow(db, target, rows, ck);
    });
  }
};

export default CHAT;
