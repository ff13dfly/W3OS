//!important, this part decode the location.hash to support IO from outside

import STORAGE from "../lib/storage";
import RUNTIME from "../lib/runtime";
import Page from "../layout/page";
import Link from "../layout/link";

//sample: ##IMGC_group_333445##
const obj={
    key:"FIRST_PARAM",      //the reg open key
    params:[],              //the left params
}

const self={
  isLogin: () => {
    return STORAGE.getEncry();
  },
}

const IO={
  decoder:()=>{
    const input=window.location.hash.split("_");
    const first=input.shift();
    const action=first.substring(1,first.length);
    window.location.hash="";
    const UI = RUNTIME.getUI();
    switch (action) {
      case "dapp":
        
        setTimeout(()=>{
          UI.page(<Page anchor={input[0]} />);
        },1000);
        break;
    
      case "link":
        setTimeout(()=>{
          UI.page(<Link anchor={input[0]} />);
        },1000);
        break;

      default:
        break;
    }
    
  },
 
  regOpen:(key,fun)=>{

  }
}

export default IO;