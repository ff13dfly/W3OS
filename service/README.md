# Instant Messaging & Group Chat Service

## Overview

- IMGC ( Instant Messaging & Group Chat ) service is base on NodeJS. It is the basic service of W3OS, this is the MVP version, including the IM and GC fully, but only Vertification By Payment in isolated node.

- IMGC bases on ss58 account, you can start to join Web3.0 world withou any coins.

- IMGC service souce code is deployed on Anchor Network, you can run it just by single command with the help of Loader for NodeJS.

    ```SHELL
        # nodejs.loader.js is the loader for nodeJS
        node nodejs.loader.js anchor://imgc
    ```

## Technical Details

- Basic functions is base on websocket.

- Vertification is base on @polkadot/api.

- Link process as follow:
    1. Client ( W3OS frontend for example ) create websocket link to IMGC server.
    2. IMGC server create a unique string called **spam** and sent to client.
    3. Client register account ( SS58 account string ) with **spam**. IMGC server check **spam** to get the account after this step.
    4. Client sent message to do the job.

## Functions

### Instant Messaging Service

- Function **active**: register SS58 account on IMGC server.

- Function **to**: sent the message to target SS58 account.

- Function **online**:  client declared the online status, IMGC server will check the history of chat and send to client.

- Function **offline**: client declared the offline status,

### Group Chat Service

- Function **create**: Create a group by members.

- Function **detail**: Get the group details by ID.

- Function **join**: Join target group by single account.

- Function **members**: Change the group members, will add and remove accounts auotmatically.

- Function **leaver**: Leave the group.

- Function **divert**: Set the new manager of group.

- Function **deport**: [ Not yet ] Adding account to block list. 

- Function **recover**: [ Not yet ] Remove accounts from block list.

- Function **destory**: Destory the group.

- Function **chat**: Chat in the group.

- Function **notice**: Sent notice to group.

- Function **update**: Update the details of group, such as group name and announcement.

### Vertification By Payment

- Function **reg**: Get the amount and target acccount to vertify.

- Function **token**: [ Not yet ], get token when there is vertification of payment.

### System Feather

- Autorecover. IMGC service will backup the group list and cached message intervally. When the service start, IMGC service will check the backup file and recover from it.

- IMGC service will monitor the Anchor Network to confirm the vertification of payment.

## Code

- Github: [https://github.com/ff13dfly/W3OS/tree/main/service/](https://github.com/ff13dfly/W3OS/tree/main/service)

- Folder **chat2**, IMGC service code is here.

- Folder **UI**, basice chatting function, mock 4 accounts.

- Folder **chat**, only IM servcie, abandoned.

## Unit Test

- Only unit test for IMGC service, the folder is **chat2/test**. Isolated test case for GC service.

## Deployment

- Target serve address is [wss://chat.metanchor.net](wss://chat.metanchor.net), Nginx is used to transport data from port to service port.

- When trying Anchor version of IMGC, only one command needed.

    ```SHELL
        # nodejs.loader.js is the loader for nodeJS
        node nodejs.loader.js anchor://imgc
    ```