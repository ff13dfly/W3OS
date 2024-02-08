# System - W3OS APIs

## Overview

- W3OS basic system functions, this part is the core part, to load the system and manage the runtime.

## Functions

### Loader

- CDapps loader is the majoy entry for on-chain application, will supply the limited W3API to CDapps.

### Permit

- CDapps permition management, record the user permit setting.

- It is not so safe when the user data is storaged on local. When user storage save the setting to Anchor Network, it will be better. Then use can recover the whole system status from Anchor Network.

- Permit dialog will use the Interenet Browser inner dialogs, such as confirm. For the security reason, the CDapps can not replace the UI dialog to disturb user action and result.

### Progress

- Queue the slow interactions of Web3.0, from the UI side, there could be a panel to show all the on progress transations. Then the use do feel handling all the transactions.

- The function do not include UI part, need to inject first.