import W3 from "./index.js";

// const code=';(function(){console.log("Trying eval")})();';
// eval(code);

W3.call("account_local_get",(res)=>{
    console.log(res);
});