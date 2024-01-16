import W3 from "./index";

//const W3=require("../index");
//const {output} = require('./lib/output');
const aa=Object.assign({}, W3);
console.log(aa);
aa.dapp("anchor://fun/12345");
console.log(W3.ext.getDapp());
console.log(aa.ext.getDapp());