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

## Function Index

- [System](./system/README.md), the core part of W3OS.
- [Storage](./storage/README.md), this part support all the methods of storage, both local and on chain.

## Test

- All unit test is in the folder **test**

- Functions can be tested one by one to confirm.