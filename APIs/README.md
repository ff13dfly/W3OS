# W3OS APIs

## Overview

- The W3OS APIs is an isolated part of W3OS, can be used both in frontend and backend. For short, it will be called **W3** in the following content.

- Create the websocket link to Anchor link directly, by this way, the code should be small. Then load the **@polkadot/api** from Anchor Network. Will create the link to Anchor node, then get the SDKs, such as Polkadot, AnchorJS, Easy ...

- The tools to deploy Dapps to Anchor Network will also be attatch to **W3**

## How to

- You need to add add a symlink to NPM

    ```SHELL
        # change to node_modules folder of UI
        # add link to NPM
        ln -s ../../../APIs ./w3api
    ```

- It is better to add w3api as NPM package on line.

- Build W3OS API as a single file, **Esbuild** needed.

```BASH
    # Normal way to minify the SDK
    ./node_modules/esbuild/bin/esbuild index.js --bundle --minify --outfile=./w3.min.js

    # Global Var way
    ./node_modules/esbuild/bin/esbuild index.js --bundle --minify --outfile=./w3g.min.js  --global-name=W3
```

## Load SDK from Anchor Network

- The magic function **eval** can not be used in "strict mode", so W3OS API laod the SDK as follow. The SDK code should be packaged such way.

```Javascript
    const SDK_code=`"use strict";return (()=>{return (str)=>{console.log(str)};})()`;

    const fun=new Function(SDK_code);       
    const SDK=fun();
    SDK("abc");

    //The new function "fun" as follow
    (function anonymous(){
        "use strict";return (()=>{return (str)=>{console.log(str)};})()
    })
```

- When try `esbuild` to package the code, need to modify the result to fit onchain requirement. Take **@polkadot/api** for example

```BASH
    # API install, if not exsist
    yarn add esbuild
    yarn add @polkadot/api

    # Polkadot API package
    ./node_modules/esbuild/bin/esbuild node_modules/@polkadot/api/index.js --bundle --minify --outfile=./polkadot.min.js --global-name=Polkadot
```

You will find the header of the packaged file like this, you need to modify it.

```Javascript
    //The packaged file start as follow
    var Polkadot= ...code...

    //Modify it like this
    return ...code...
```

## Function Index

- [System](./system/README.md), the core part of W3OS.
- [Storage](./storage/README.md), this part support all the methods of storage, both local and on chain.

## Test

- All unit test is in the folder **test**

- Functions can be tested one by one to confirm.