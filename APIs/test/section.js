//!important, this is a file to collect testing code.

/****************************************************************************************/
/************************************ import convert ************************************/
/****************************************************************************************/

//import {aa} from "{aa:()=>{console.log('hello world')}}";
//const code=`{aa:()=>{console.log("hello world")}}`;
//const bs64="e2FhOigpPT57Y29uc29sZS5sb2coImhlbGxvIHdvcmxkIil9fQ";
//import {aa} from eval(code);
// import {aa} from `{aa:()=>{console.log("hello world")}}`;

// import aa from {aa:()=>{console.log('hello world')}};
// console.log(ABC);


//import way
import {aa} from "target.js";
aa();

//normal way
const {aa}={aa:()=>{console.log('hello world')}};
aa();

/****************************************************************************************/
/************************************ SDK structure *************************************/
/****************************************************************************************/

const fun=new Function(`"use strict";return (()=>{return (str)=>{console.log(str)};})()`);
console.log(fun);
const mine=fun();
mine("abc");