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
    "VALID_INPUT":{
        code:40010,
        origin:"system",
    },
};

const Error={
    get:(name)=>{
        if(!map[name]) return null;
        return map[name];
    },
    decode:(code)=>{

    },
}
export default Error;