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
//import Error from "../system/error.js";

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
  //FIXME, this is not safe for root check, need to update to a better one.
  encoder:(str)=>{
    return Encry.md5(str);
  },

  encryKey:(str)=>{
    return `${prefix}_${Encry.md5(str)}`;
  },

  /**********************************************************/
  /********************* Name transfrom *********************/
  /**********************************************************/

  setMap: (obj) => {
    if(Array.isArray(obj)){
      if(!hash) return false;   //Need hash to create the storage key, can not ignore.
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
    if(!hash) return false;
    if (!map[name]) return false;
    const key = STORAGE.getKey(`${hash}${map[name]}`);
    localStorage.removeItem(key);
    return true;
  },

  //key-value

  //check key exsist, ignore not supported.
  exsistKey: (name) => {
    if(!hash) return false;
    if (!map[name]) return false;
    const key = STORAGE.encryKey(`${hash}${map[name]}`);
    const str = localStorage.getItem(key);
    if (str === null) return false;
    return true;
  },

  getKey: (name) => {
    let str="";
    if(ignore[name] === true){
      if (!map[name]) return null;
      const key = map[name];
      str = localStorage.getItem(key);
    }else{
      if(!hash) return false;
      if (!map[name]) return null;
      const key = STORAGE.encryKey(`${hash}${map[name]}`);
      str = localStorage.getItem(key);
    }
    if(!ignore[name]) str=Encry.decrypt(str);
    
    try {
      return JSON.parse(str);
    } catch (error) {
      return false;
    }
  },
  setKey: (name, obj) => {
    if(ignore[name] === true){
      if (!map[name]) return false;
      const key = map[name];
      const val=JSON.stringify(obj);
      return localStorage.setItem(key, val);
    }else{
      if(!hash) return false;
      if (!map[name]) return false;
      Encry.auto(hash);
      const key =STORAGE.encryKey(`${hash}${map[name]}`);
      const val = Encry.encrypt(JSON.stringify(obj));
      return localStorage.setItem(key, val);
    }
  },
};

export default STORAGE;
