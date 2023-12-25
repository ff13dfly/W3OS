/* 
*  W3OS error definition
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. definition of errors
*  2. decode different errors
*/

const errs={
    system:{
        "VALID_INPUT":{
            code:40010,
            msg:"",
        },
    },
    message:{

    },
    payment:{

    },
};
const map={};

const Error={
    startup:()=>{       //system startup hook
        //1.create the code map from errs
        for(let origin in errs){
            const list=errs[origin];
            for(let key in list){
                const row=list[key];
                row.key=key;
                row.origin=origin;
                map[row.code]=row;
                delete map[row.code].code;
            }
        }
        return true;
    },
    get:(name,cat)=>{
        if(cat===undefined) cat="system";
        if(!map[cat] || !map[cat][name]) return null;
        return map[cat][name];
    },
    decode:(code)=>{

    },
}
export default Error;