# W3OS Desktop

## Overview

- W3OS Desktop is an UI base on W3OS APIs, all the functions are from APIs, the UI element is from W3OS Desktop.


## Feather

- Need to load **W3API** from local, need to link the API folder to `node_modules`. Be careful, when new package is added to the project, you need to relink the folder.

    ```SHELL
        # change to node_modules folder of UI
        cd node_modules
        
        # add link to NPM
        ln -s ../../../APIs ./w3api
    ```
