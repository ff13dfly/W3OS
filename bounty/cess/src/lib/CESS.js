let URI="";

const test=()=>{
    const { Bucket,Space, InitAPI, Common } = require("cess-js-sdk");
    const mnemonic ="denial empower wear venue distance leopard lamp source off other twelve permit";
    const accountId32 = "cXh5StobuVP4B7mGH9xn8dSsDtXks4qLAou8ZdkZ6DbB6zzxe";
    InitAPI().then(({ api, keyring })=>{
        
        const space = new Space(api, keyring, true);
        const oss = new Bucket(api, keyring, true);
        const common = new Common(api, keyring, true);

        /**************************************************/
        /******************** Overview ********************/
        /**************************************************/
        space.userOwnedSpace(accountId32).then((res)=>{
            console.log(res);
        })

        /**************************************************/
        /******************* Bucket APIs ******************/
        /**************************************************/
        // oss.queryBucketList(accountId32).then((res)=>{
        //     console.log(res);
        // });

        oss.createBucket(mnemonic, accountId32, "folder_hello").then((res)=>{
            console.log(res);
            oss.queryBucketList(accountId32).then((res)=>{
                console.log(res);
            });
        });

        /**************************************************/
        /******************* Files APIs *******************/
        /**************************************************/

        ;
    });
};

const CESS={
    setGateway:(gateway_uri)=>{
        URI=gateway_uri;
    },
    overview:(pair)=>{
        test();
    },

    //list images from folder
    list:(folder,page,pair)=>{

    },

    //get the target file by hash
    view:(hash,pair)=>{

    },

    //upload new image file to bucket
    upload:(folder,fa,pair)=>{

    },

    //bucket management
    bucket:{
        //create a bucket as folder
        create:(folder,pair)=>{

        },
        detail:(folder,pair)=>{

        },
        delete:(folder,pair)=>{

        }
    }
}

export default CESS;