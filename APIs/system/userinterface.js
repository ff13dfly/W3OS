/* 
*  W3OS input management
*  @auth [ Fuu ]
*  @creator Fuu
*  @date 2023-12-25
*  @functions
*  1. decode input;
*  2. manage input functions to call;
*/

const replacment = {
    log: null,           //system log printer
    toast: null,         //UI toast, to show the system inner informoation
    dialog: null,        //UI dialog, to show more information
};

const Userinterface = {
    //reset the system functions
    set: (key, fun) => {

    },

    //reset to default functions
    reset: (key) => {
        delete replacment[key];
        replacment[key] = null;
    },

    //system log, default is the 
    log: (str) => {
        if (replacment.log !== null) return replacment.log(str);
        console.log(str);
    },

    //browser default confirm dialog, can not be rewrite
    confirm: (ck) => {

    },
    debug: (info, mode) => {
        const md = !mode ? "log" : mode;
        switch (md) {
            case "log":
                console.log("W3OS[ debug mode ] log:", info);
                break;
            case "warn":
                console.warn("W3OS[ debug mode ] warning:", info);
                break;

            case "error":
                console.error("W3OS[ debug mode ] error:", info);
                break;
            default:
                break;
        }
    },
}
export default Userinterface;