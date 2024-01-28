import W3 from "w3api";

const test=[
    ()=>{
        const input={method:["contact","friend","list"],alink:"anchor://myfriend/12345"};
        const mine="5CSTSUDaBdmET2n6ju9mmpEKwFVqaFtmB8YdB23GMYCJSgmw";

        W3.call(input,mine,(res)=>{
          console.log(res);
        });
    },
]

const Friend={
    list:()=>{
        W3.debug();   //set to the debug mode
        test[0]();
    },
}

export default Friend;