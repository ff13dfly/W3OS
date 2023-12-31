# W3OS APIs

## How to

- You need to add add a symlink to NPM

    ```SHELL
        # change to node_modules folder of UI
        # add link to NPM
        ln -s ../../../APIs ./w3api
    ```

- It is better to add w3api as NPM package on line.

## Function Index

- [System](./system/README.md), the core part of W3OS.
- [Storage](./storage/README.md), this part support all the methods of storage, both local and on chain.

## Test

- All unit test is in the folder **test**

- Functions can be tested one by one to confirm.