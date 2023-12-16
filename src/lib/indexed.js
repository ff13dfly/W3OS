import Encry from "./encry";

let hash = "";

let dbname = "";
let timer = null;
let lock = false;  //write locker
let queue = {
  update: {},
  insert: {},
}
const INDEXED = {
  getEncry: () => {
    return hash;
  },
  setEncry: (md5) => {
    hash = md5;
    Encry.auto(md5);
    return true;
  },
  clearEncry: () => {
    hash = "";
  },
  setName: (str) => {
    dbname = str;
  },

  //pending locker
  setPending: (table) => {

  },
  getPending: (table) => {

  },
  empty: (obj) => {
    for (var k in obj) return false;
    return true;
  },

  initDB: (name, tables, version, ck) => {
    return new Promise((resolve, reject) => {
      const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
      const request = indexedDB.open(name, version);
      request.onsuccess = (ev) => {
        //console.log(`IndexedDB successful, switch lock?`);
        resolve(ev.target.result);
      };
      request.onerror = (ev) => {
        //console.log(`IndexedDB failed, switch lock?`);
        resolve(false);
      };
      request.onupgradeneeded = (ev) => {
        const db = ev.target.result;
        for (let i = 0; i < tables.length; i++) {
          const row = tables[i];
          const store = db.createObjectStore(row.table, {
            keyPath: row.keyPath,
            unique: true,
          });
          for (var k in row.map) {
            store.createIndex(k, k, row.map);
          }
        }
        return ck && ck(true);
      };
    });
  },
  checkDB: (name, ck) => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    const request = indexedDB.open(name);
    request.onsuccess = (ev) => {
      return ck && ck(ev.target.result);
    };
    request.onerror = (ev) => {
      return ck && ck(false);
    };
  },

  searchRows: (db, table, key, val, ck) => {
    let list = [];
    var store = db.transaction(table, "readwrite").objectStore(table);
    var request = store.index(key).openCursor(IDBKeyRange.only(val));

    request.onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        // 必须要检查
        list.push(cursor.value);
        cursor.continue(); // 遍历了存储对象中的所有内容
      } else {
        return ck && ck(list);
      }
    };
    request.onerror = function (e) { };
  },
  checkTable: (tables, name) => {
    let valid = false;
    if (tables.length === 0) return valid;
    for (let i = 0; i < tables.length; i++) {
      const row = tables[i];
      if (row === name) valid = true;
    }
    return valid;
  },
  countRows: (db, table, key, val, status, ck) => {
    if (!INDEXED.checkTable(db.objectStoreNames, table))
      return ck && ck({ count: 0, latest: 0 });
    let count = 0;
    let latest = 0;
    var store = db.transaction(table, "readwrite").objectStore(table);
    var request = store.index(key).openCursor(IDBKeyRange.only(val));

    request.onsuccess = function (e) {
      var cursor = e.target.result;
      if (cursor) {
        if (cursor.value.status === status) {
          count++;
          if (cursor.value.stamp > latest) latest = cursor.value.stamp;
        }

        cursor.continue(); // 遍历了存储对象中的所有内容
      } else {
        return ck && ck({ count: count, latest: latest });
      }
    };
    request.onerror = function (e) { };
  },
  getDB: (ck) => {
    const indexedDB =
      window.indexedDB ||
      window.mozIndexedDB ||
      window.webkitIndexedDB ||
      window.msIndexedDB;
    const request = indexedDB.open(dbname);
    request.onsuccess = (ev) => {
      return ck && ck(ev.target.result);
    };
  },
  tiktok: () => {
    if (timer === null) {
      timer = setInterval(() => {
        console.log(`Check the indexedDB queue, data: ${JSON.stringify(queue)}`);
        if (!INDEXED.empty(queue.insert)) {
          INDEXED.getDB((db) => {
            for (let table in queue.insert) {
              const todo = JSON.parse(JSON.stringify(queue.insert[table]));
              delete queue.insert[table];
              return INDEXED.insertRow(db, table, todo);
            }
          });
        }

        if (!INDEXED.empty(queue.update)) {
          INDEXED.getDB((db) => {
            for (let table in queue.update) {
              const todo = JSON.parse(JSON.stringify(queue.update[table]));
              delete queue.update[table];
              return INDEXED.updateRow(db, table, todo);
            }
          });
        }
      }, 1500);
    }
  },
  //When the IndexedDB is pending, cache requests to queue
  cacheRows: (name, table, list, action) => {
    INDEXED.setName(name);
    if (!queue[action]) return false;
    if (!queue[action][table]) queue[action][table] = [];
    for (let i = 0; i < list.length; i++) {
      queue[action][table].push(list[i]);
    }
    INDEXED.tiktok();
    return true;
  },
  insertRow: (db, table, list, ck) => {
    console.log(`Function[insertRow], locker: ${lock}, table: ${table}`);
    if (lock) return INDEXED.cacheRows(db.name, table, list, "insert");
    lock = true;
    const request = db.transaction([table], "readwrite").objectStore(table);
    console.log(request);

    // if(queue.insert[table] && queue.insert[table].length!==0){
    //   for (let i = 0; i < queue.insert[table].length; i++) {
    //     request.add(queue.insert[table][i]);
    //   }
    // }

    let count = list.length;
    for (let i = 0; i < list.length; i++) {
      const reqObj = request.add(list[i]);
      reqObj.onsuccess = function (ev) {
        console.log(`Function[insertRow] done.`);
        count--;
        if (count === 0) lock = false;
        return ck && ck(true);
      };

      reqObj.onerror = function (ev) {
        count--;
        if (count === 0) lock = false;
        return ck && ck({ error: "Failed to insert" });
      };
    }
  },
  updateRow: (db, table, list, ck) => {
    if (lock) return INDEXED.cacheRows(db.name, table, list, "update");
    lock = true;

    const request = db.transaction(table, "readwrite").objectStore(table);

    // if(queue.update[table] && queue.update[table].length!==0){
    //   for (let i = 0; i < queue.update[table].length; i++) {
    //     request.add(queue.update[table][i]);
    //   }
    // }

    let count = list.length;
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      const reqObj = request.add(list[i]);
      reqObj.onsuccess = function (ev) {
        console.log(`Function[updateRow] done.`);
        count--;
        if (count === 0) lock = false;
        return ck && ck(true);
      };

      reqObj.onerror = function (ev) {
        count--;
        if (count === 0) lock = false;
        return ck && ck({ error: "Failed to insert" });
      };
    }
  },
  pageRows: (db, table, ck, nav, search) => {
    let list = [];
    const store = db.transaction(table, "readwrite").objectStore(table);

    let request = null;
    if (!search) {
      request = store.openCursor();
    } else {
      //TODO, here to add the filter
      const smap = {}
    }
    if (request === null) return ck && ck(false);

    let advanced = true;
    request.onsuccess = function (e) {
      const cursor = e.target.result;
      if (advanced && nav !== undefined && nav.page !== undefined && nav.step !== undefined) {
        const skip = (nav.page - 1) * nav.step;
        if (skip > 0) cursor.advance((nav.page - 1) * nav.step);
        advanced = false;
      }

      if (cursor) {
        list.push(cursor.value);
        cursor.continue(); // 遍历了存储对象中的所有内容
      } else {
        return ck && ck(list);
      }
    };
    request.onerror = function (e) { };
  },
  test: () => {
    //https://juejin.cn/post/7026900352968425486
    const name = "w3os_chat";
    //const name =`w3os_chat_${address}`;
    INDEXED.checkDB(name, (db) => {
      INDEXED.insertRow(db, "address_a", [
        { address: "acc", msg: "hello", status: 3, stamp: 0 },
        { address: "acc_a", msg: "hello a", status: 3, stamp: 0 },
        { address: "acc_b", msg: "hello b", status: 3, stamp: 0 },
      ]);
      INDEXED.searchRows(db, "address_a", "status", 3, (list) => {
        console.log(list);
      });
      // INDEXED.initDB(name,[
      // 	{ table: "address_"+tools.rand(1,100), keyPath: "address", map: { stamp: { unique: false },status: { unique: false } } },
      // 	{ table: "address_"+tools.rand(1,100), keyPath: "address", map: { stamp: { unique: false },status: { unique: false } } },
      // ],db.version+1)
    });
  },
};

export default INDEXED;
