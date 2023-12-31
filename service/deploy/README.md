# Deployment Of On Chain Library

## Overview

- The libraries need to be write to chain, the tools are here.

## How to package

- `ESbuild`  is a pretty good tools to package the libs.

- Sample of packaging the frontend lib, take `@polkadot/api` as sample.

```BASH
    # API install, if not exsist
    yarn add @polkadot/api

    # Polkadot API package
    # Polkadot API package
    ./node_modules/esbuild/bin/esbuild node_modules/@polkadot/api/index.js --bundle --minify --outfile=./polkadot.min.js --global-name=Polkadot
```

- Sample of packaging the NodeJS lib.

```BASH
  # API install, if not exsist
  yarn add @polkadot/api

  # Polkadot API package
  ./node_modules/esbuild/bin/esbuild node_modules/@polkadot/api/index.js --bundle --minify --outfile=./polkadot.node.js --platform=node
```

## Frontend

- The file `frontend_writer.js` is the task to write frontend libs. No more lib support, will load the NodeJS libs from the package folder `nodejs`. Then no need to install the node_modules.

```BASH
  node frontend_writer.js
```

- The config of frontend lib is here.

```Javascript
  //On the top of the file, you need to set the folder of lib files.
  const config = {
    ...
    folder:     "frontend",
    ...
  };

  //libs need to write, the key is the Anchor name
  const libs={
      "anchorjs":"anchor.min.js",
      "polkadot":"polkadot.min.js",
      "easy":"easy.min.js",
  }
```

## NodeJS

- The file `nodejs_writer.js` is the task to write NodeJS libs. No more lib support, will load the NodeJS libs from the package folder `nodejs`. Then no need to install the node_modules.

```BASH
  node nodejs_writer.js
```

- The config of frontend lib is here.

```Javascript
  //On the top of the file, you need to set the folder of lib files.
  const config = {
    ...
    folder:     "./nodejs",
    ...
  };

  //libs need to write, the key is the Anchor name
  const libs={
      "anchorjs":"anchor.node.js",
      "polkadot":"polkadot.node.js",
      "easy":"easy.node.js",
      "koa":"koa.node.js",
  }
```

- The libs is in the folder `nodejs` which is imported by the writer.