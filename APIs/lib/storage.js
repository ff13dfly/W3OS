/* 
*  storage of frontend
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1.localstorage key format
*  2.localstorage read/write
*/

import Encry from "./encry.js";
import tools from "./tools.js";

const prefix="w3api";  //prefix for localstorage;

const map = {};
const ignore = {};     //write directly without checking the hash ( which confirm root login )
let hash = "";

const STORAGE = {
  dump: () => {
    return map;
  },

  /**********************************************************/
  /******************* Encry storage part *******************/
  /**********************************************************/
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
  setIgnore: (list) => {
    for (let i = 0; i < list.length; i++) ignore[list[i]] = true;
    return true;
  },

  /**********************************************************/
  /********************* Name transfrom *********************/
  /**********************************************************/

  setMap: (obj) => {
    if(Array.isArray(obj)){
      if(!hash) return false;   //Need hash to create the storage key, can not ignore.

      // for(let i=0;i<obj.length;i++){
      //   const key=obj[i];
      //   map[key] = `${prefix}_${tools.char[12]}`;
      // }
    }else{
      for (var k in obj) map[k] = `${prefix}_${obj[k]}`;
    }
    return true;
  },
  checkMap:(key)=>{
    if(map[key]) return true;
    return false;
  },

  /**********************************************************/
  /******************* Key-value Storage ********************/
  /**********************************************************/

  removeKey: (name) => {
    if (!map[name]) return false;
    const key = map[name];
    localStorage.removeItem(key);
    return true;
  },

  //key-value
  exsistKey: (name) => {
    if (!map[name]) return null;
    const key = map[name];
    const str = localStorage.getItem(key);
    if (str === null) return false;
    return true;
  },

  getKey: (name) => {
    if (!map[name]) return null;
    const key = map[name];
    const str = localStorage.getItem(key);
    if (str === null) return null;
    if (!hash || ignore[name] === true) {
      try {
        return JSON.parse(str);
      } catch (error) {
        return false;
      }
    }

    const res = Encry.decrypt(str);
    if (!res) return false;
    return JSON.parse(res);
  },
  setKey: (name, obj) => {
    if (!map[name]) return false;
    const key = map[name];
    if (!hash || ignore[name] === true){
      return localStorage.setItem(key, JSON.stringify(obj));
    }
    Encry.auto(hash);
    const res = Encry.encrypt(JSON.stringify(obj));
    localStorage.setItem(key, res);
  },

  //key-queue
  getQueue: (name) => {
    if (!map[name]) return [];
    const key = map[name];
    const str = localStorage.getItem(key);
    if (str === null) return [];
    return JSON.parse(str);
  },
  footQueue: (name, atom) => {
    if (!map[name]) return [];
    const key = map[name];
    const qu = STORAGE.getQueue(name);
    qu.push(atom);
    localStorage.setItem(key, JSON.stringify(qu));
    return true;
  },
  headQueue: (name, atom) => {
    if (!map[name]) return [];
    const key = map[name];
    const qu = STORAGE.getQueue(name);
    qu.unshift(atom);
    localStorage.setItem(key, JSON.stringify(qu));
    return true;
  },
};

export default STORAGE;
