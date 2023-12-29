# W3OS System Deploy

## Overview

- Deployment need the tools of [EasyPolka](https://github.com/ff13dfly/EasyPolka).
- Loader.
- Convertor.

## W3OS UI

- Build the React application first.
- Run the shell to deploy W3OS to Anchor Network [https://dev2.metanchor.net](https://dev2.metanchor.net)
- Check the result.

## IMS and GCS

- Package the nodeJS code to single file.
- Run the shell to deploy W3OS to Anchor Network [https://dev2.metanchor.net](https://dev2.metanchor.net)
- Check the result.

## Gear JS SDK compress

- Need to compress the gear JS SDK.

```SHELL
 ./node_modules/esbuild/bin/esbuild node_modules/@gear-js/api/index.js --bundle --minify --outfile=./gear.min.js

 ./node_modules/esbuild/bin/esbuild node_modules/@gear-js/api/index.js --bundle --minify --outfile=./gear.min.js --global-name=Gear
```
