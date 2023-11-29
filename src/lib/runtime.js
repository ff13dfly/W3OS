import STORAGE from "./storage";
import tools from "./tools";
import Encry from "./encry";
import Config from "../data/setting";
import Vertify from "../open/vertify";

let API = null;
let wsAPI = null;
let wss = {};
let spams = {};
let nets = {};
let UI = null;
let mailer = {}; //mailer cache

let base="";  //avatar base URL
let type="";  //avatar type set

//keys and prefix for localstorage
const prefix = "w3os";
const keys = {
  account: `${prefix}_account_file`,
  stranger: `${prefix}_stranger_list`,
  apps: `${prefix}_apps_list`,
  salt: `${prefix}_salt`,
  vertify: `${prefix}_check`,
  talking:`${prefix}_talking`,
};
STORAGE.setMap(keys);

//default OS setting
const config = {
  accounts: require("../data/accounts"),
  apps: require("../data/apps"), //Official Dapps
  contacts: require("../data/contacts"), //Official contact
  system: require("../data/setting"), //Official settings for both system and Dapps
};

// const AnchorJS = require("../../public/package/anchor.min");
// const Easy=require("../../public/package/easy.min");
// const Pok=require("../../public/package/polkadot.min");

const AnchorJS = window.AnchorJS;
const Easy = window.Easy;
const Pok = window.Polkadot;

const RUNTIME = {
  /************************************************/
  /********** System initialization ***************/
  /************************************************/
  //1. set the password for W3OS;
  //!important, if there is no password, the data will be encode by default salt.
  //!important, the storage will be fresh when the password changed
  init: (setPass, ck) => {
    //1. creat salt anyway.
    STORAGE.setIgnore(["salt", "vertify"]); //public data;
    let salt = STORAGE.getKey("salt");
    if (salt === null) {
      //1.first time to run W3OS
      const char = tools.char(28, prefix);
      STORAGE.setKey("salt", char);
    }
    salt = STORAGE.getKey("salt");
    const login = STORAGE.getEncry(); //check storage md5 password hash
    if (!login) {
      setPass((pass) => {
        const md5 = Encry.md5(`${salt}${pass}`);
        const check = STORAGE.getKey("vertify");
        //console.log(check);
        if (check === null) {
          //a. no password check, create one
          STORAGE.setEncry(md5);
          STORAGE.setKey("vertify", md5);
        } else {
          //b. no password check, create one
          if (check !== md5) return ck && ck({ msg: "Error password" });
          STORAGE.setEncry(md5);
          //console.log(`vertify:${check},pass:${md5}`);
          return ck && ck(true);
        }
      });
    }
  },
  isLogin: () => {
    return STORAGE.getEncry();
  },
  isSalted: () => {
    const salt = STORAGE.getKey("salt");
    //console.log(salt);
    return !salt ? false : true;
  },
  clean: () => {
    //1.clear all storage
    //2.clear all IndexedDB data
  },
  /************************************************/
  /************** System setting ******************/
  /************************************************/

  getConfig: (name) => {
    if (!name) return config;
    if (!config[name]) return false;
    return config[name];
  },

  getSetting: (ck) => {
    return ck && ck(config.system);
  },

  /************************************************/
  /************** Network status ******************/
  /************************************************/

  networkReg: (net, fun) => {
    nets[net] = fun;
    return true;
  },
  networkStatus: (net, ck) => {
    if (!nets[net]) return ck && ck(false);
    nets[net](ck);
  },

  getAccount: (ck) => {
    const fa = STORAGE.getKey("account");
    return ck && ck(fa);
  },
  setAccount: (obj) => {
    STORAGE.setKey("account", obj);
  },
  removeAccount: () => {
    STORAGE.removeKey("account");
    return true;
  },

  /************************************************/
  /************* Contcat Functions ****************/
  /************************************************/

  //contact functions
  addContact: (address, ck, stranger) => {
    RUNTIME.getAccount((acc) => {
      if (!acc || !acc.address) return ck && ck(false);
      const mine = acc.address;
      const nkey = !stranger ? mine : `${mine}_stranger`;
      let list = STORAGE.getKey(nkey);
      if (list === null) list = {};
      list[address] = {
        intro: "",
        status: 1,
        type: !stranger ? "friend" : "stranger",
        network: "Anchor",
      };
      STORAGE.setKey(nkey, list);
      return ck && ck(true);
    });
  },
  removeContact: (list, ck, stranger) => {
    RUNTIME.getAccount((acc) => {
      if (!acc || !acc.address) return ck && ck(false);
      const mine = acc.address;
      const nkey = !stranger ? mine : `${mine}_stranger`;
      let map = STORAGE.getKey(nkey);
      if (map === null) map = {};
      for (let i = 0; i < list.length; i++) {
        const acc = list[i];
        if (map[acc]) delete map[acc];
      }
      STORAGE.setKey(nkey, map);

      return ck && ck(true);
    });
  },
  getContact: (ck, stranger) => {
    RUNTIME.getAccount((acc) => {
      if (!acc || !acc.address) return ck && ck(false);
      const mine = acc.address;
      const nmap = {};
      const skey = !stranger
        ? `${prefix}_${mine}`
        : `${prefix}_${mine}_stranger`;
      const nkey = !stranger ? mine : `${mine}_stranger`;
      nmap[nkey] = skey;
      STORAGE.setMap(nmap);

      const list = STORAGE.getKey(nkey);
      if (list === null) {
        STORAGE.setKey(nkey, !stranger ? config.contacts : {});
      }
      return ck && ck(STORAGE.getKey(nkey));
    });
  },
  clearContact: (ck, stranger) => {
    RUNTIME.getAccount((acc) => {
      if (!acc || !acc.address) return ck && ck(false);
      const mine = acc.address;
      const nkey = !stranger ? mine : `${mine}_stranger`;
      STORAGE.removeKey(nkey);
      return ck && ck(true);
    });
  },

  setMailer: (acc, fun) => {
    mailer[acc] = fun;
    return true;
  },
  exsistMailer:(acc)=>{
    if(mailer[acc]) return true;
    return false;
  },
  clearMailer:(acc)=>{
    if(mailer[acc]) delete mailer[acc];
    return true;
  },
  getMailer: (acc) => {
    if (!mailer[acc]) return false;
    return mailer[acc];
  },

  /************************************************/
  /*************** Talking Setting ****************/
  /************************************************/

  getTalking:(ck)=>{
    const key="talking";
    const list = STORAGE.getKey(key);
    if (list === null) {
      STORAGE.setKey(key,[]);
    }
    return ck && ck(STORAGE.getKey(key));
  },
  setTalking:(list,ck)=>{
    const key="talking";
    STORAGE.setKey(key,list);
    return ck && ck();
  },

  /************************************************/
  /************ Application Launch ****************/
  /************************************************/

  getApps: (ck) => {
    const key="apps";
    const list = STORAGE.getKey(key);
    if (list === null) {
      STORAGE.setKey(key, config.apps);
    }
    return ck && ck(STORAGE.getKey(key));
  },
  inArray: (index, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (parseInt(index) === arr[i]) return true;
    }
    return false;
  },
  removeApp: (map, ck) => {
    const key="apps";
    const list = STORAGE.getKey(key);
    //console.log(JSON.stringify(list));
    for (var page in map) {
      if (!list[page]) break;
      const todo = map[page];
      const nlist = [];
      for (let i = 0; i < list[page].length; i++) {
        const row = list[page][i];
        if (!RUNTIME.inArray(i, todo)) nlist.push(row);
      }
      list[page] = nlist;
      STORAGE.setKey(key, list);
      //console.log(nlist);
      return ck && ck(true);
    }
  },
  installApp: (obj, page, ck) => {
    const key="apps";
    const list = STORAGE.getKey(key);
    list[page].push(obj);
    STORAGE.setKey(key, list);
    return ck && ck(true);
  },
  clearApps: () => {
    const key="apps";
    STORAGE.removeKey(key);
  },
  formatApp: () => {
    const str = JSON.stringify(Config.format.app);
    return JSON.parse(str);
  },

  /************************************************/
  /************ Websocket Management **************/
  /************************************************/

  setSpam: (uri, spam) => {
    spams[uri] = spam;
  },
  getSpam: (uri) => {
    return spams[uri];
  },
  wsReg: (uri, linker) => {
    wss[uri] = linker;
    return true;
  },
  wsInstance: (uri) => {
    if (!wss[uri]) return false;
    return wss[uri];
  },
  wsCheck: (uri) => {
    if (!wss[uri]) return 99;
    return wss[uri].readyState;
  },
  wsRemove: (uri) => {
    delete wss[uri];
    return true;
  },
  websocket: (uri, ck, agent) => {
    if (wss[uri]) return ck && ck(wss[uri]);
    try {
      const ws = new WebSocket(uri);
      ws.onopen = (res) => {
        if (agent && agent.open) agent.open(res);
      };
      ws.onmessage = (res) => {
        if (agent && agent.message) agent.message(res);
      };
      ws.onclose = (res) => {
        if (agent && agent.close) agent.close(res);
      };
      ws.onerror = (res) => {
        if (agent && agent.error) agent.error(res);
      };
      wss[uri] = ws;
      return ck && ck(ws);
    } catch (error) {
      return ck && ck(error);
      //return ck && ck(RUNTIME.getError("WEBSOCKET_LINK_ERROR"));
    }
  },

  /************************************************/
  /********* Network Websocket Functions **********/
  /************************************************/

  link: (endpoint, ck) => {
    if (wsAPI === null) {
      const WsProvider = API.Polkadot.WsProvider;
      const ApiPromise = API.Polkadot.ApiPromise;
      try {
        const provider = new WsProvider(endpoint);
        ApiPromise.create({ provider: provider }).then((PokLinker) => {
          wsAPI = PokLinker;
          RUNTIME.wsReg(endpoint, wsAPI);
          API.AnchorJS.set(wsAPI);
          ck && ck(API);
        });
      } catch (error) {
        ck && ck(false);
      }
    } else {
      ck && ck(API);
    }
  },
  getActive: (ck) => {
    if (wsAPI === null) {
      RUNTIME.getAPIs(() => {
        return ck && ck(wsAPI, API.Polkadot.Keyring);
      });
    } else {
      return ck && ck(wsAPI, API.Polkadot.Keyring);
    }
  },
  basicStatus: (ck) => {
    if (API.AnchorJS.ready) return ck && ck(API.AnchorJS.ready());
    return ck && ck(false);
  },

  /************************************************/
  /****************** Open APIs *******************/
  /************************************************/

  setUI: (funs) => {
    UI = funs;
  },
  getAPIs: (ck) => {
    if (API === null) {
      const easyAPI = {
        common: {
          latest: AnchorJS.latest,
          target: AnchorJS.target,
          history: AnchorJS.history,
          owner: AnchorJS.owner,
          subcribe: AnchorJS.subcribe,
          block: AnchorJS.block,
        },
      };
      API = {
        Polkadot: Pok,
        AnchorJS: AnchorJS,
        Easy: (anchorLinker, ck) => {
          Easy.easyRun(anchorLinker, easyAPI, ck);
        },
        system: {
          pay: (param, ck) => {
            //transaction API for cApps
            if (!param.amount) return ck && ck(false);

            UI.dialog.show(<Vertify />);
          },
          write: () => {
            //anchor writing API for cApps
          },
        },
      };

      const endpoint = config.system.basic.endpoint[0];
      RUNTIME.networkReg("anchor", RUNTIME.basicStatus); //reg status function for Anchor Network
      return RUNTIME.link(endpoint, ck);
    }
    return ck && ck(API);
  },
  setAvatar:(uri,id)=>{
    base=uri;
    type="?set=set"+id;
    return true;
  },
  getAvatar:(str)=>{
    return `${base}/${str}.png${type}`;
  },
};

export default RUNTIME;
