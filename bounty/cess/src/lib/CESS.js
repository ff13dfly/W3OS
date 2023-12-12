let URI="";



const CESS={
    setGateway:(gateway_uri)=>{
        URI=gateway_uri;
    },
    overview:(pair)=>{
        const { Space, InitAPI, Common } = require("cess-js-sdk");
        InitAPI().then(({ api, keyring })=>{
            console.log(api);

            const mnemonic ="denial empower wear venue distance leopard lamp source off other twelve permit";
            let result = "";

            const space = new Space(api, keyring, true);
            const common = new Common(api, keyring, true);
            const accountId32 = "cXh5StobuVP4B7mGH9xn8dSsDtXks4qLAou8ZdkZ6DbB6zzxe";
            space.userOwnedSpace(accountId32).then((res)=>{
                console.log(res);
            });
        });
    },

    list:(page,pair)=>{

    },

    view:(hash,pair)=>{

    },
    upload:(fa,pair)=>{

    },
}

export default CESS;