# Blockchain SDK Demo

## Overview

- Demo of different blockchain SDK.

## How to test and deploy SDK

- Package the SDK to single file by `Esbuild`, then the single file SDK.
  
  ```BASH
    # install esbuild at first
    yarn add esbuild

    # fomulate
    ./node_modules/esbuild/bin/esbuild {TARGET_SDK_ENTRY} --bundle --minify --outfile=./sdk.min.js --global-name={GLOBAL_NAME}

    # sample to create Polkadot SDK
    ./node_modules/esbuild/bin/esbuild node_modules/@polkadot/api/index.js --bundle --minify --outfile=./frontend/polkadot.min.js --global-name=Polkadot
  ```

- Deploy the SDK on chain, then test it by W3API. W3API support to deploy SDK on chain.

  ```BASH

  ```

## Bitcoin

### BitcoinJS

- Github: [https://github.com/bitcoinjs/bitcoinjs-lib](https://github.com/bitcoinjs/bitcoinjs-lib)

- Full function Bitcoin JS SDK.

### OKX js-wallet SDK

- Github: [https://github.com/okx/js-wallet-sdk](https://github.com/okx/js-wallet-sdk)
