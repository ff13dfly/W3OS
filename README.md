# Web3.0 Operation System base on Anchor Network

## Overview

- W3OS bases on Anchor Network, all data can be stored on the network. Even the OS itself and the private data.

- Even without any coins, you can benifit from Web3.0. The Web3.0 account can be treated as mobile number, you can get in touch with another Web3.0 user without more information but SS58 account.

- Complex blockchain world can be managed on W3OS, no need to visit so much website again. All the Dapps can be deployed on Anchor Network, it is more secure than CDN and private server.

- W3OS is pretty easy to the users who has never joined Web3.0 and not so fimilar with Web3.0 tools. Or say, it is pretty easy to join the Web3.0 world for a total newer.

## Technical And Functions

### Technical Architecture

- W3OS. The frontend of W3OS is base on React.

- IMGC service. IMGC is base on NodeJS.

- Full on chain. The on-chain deployment is base on Anchor Network. Test Network here [wss://dev2.metanchor.net](wss://dev2.metanchor.net)

### Basic Functions

- W3OS treates the basic functions as Dapps, you can find them on the screen.

- As a Web3.0 OS for users, the basic fucntions are included in **W3OS** project.
  1. Payment, basic function but need you do have some coins.
  2. Contact, you can add friends just by SS58 account, no coins needed.
  3. Talking, IMing with your friends and creating group to chat are the important part of W3OS.
  4. Market, you can get the price here and you can buy or exchange in the future

### Dapps Deployment

- W3OS treats the Dapps on Anchor Network as isolated application, and can be docked on screen by Anchor Name. When you input the name, W3OS will check from Anchor Network, the create an icon on screen. Support different types of Anchor, W3OS will show in diffferent ways.

- Laoder ( from [EasyPolka](https://github.com/ff13dfly/EasyPolka)), can load the Dapps on Anchor Network, follow the[Easy Protocol](https://github.com/ff13dfly/EasyPolka/tree/main/protocol). It is just a single HTML file, you can deploy to any server which supports http, even more, you can run it as local application in your personal compute.

- Convertor ( from [EasyPolka](https://github.com/ff13dfly/EasyPolka)). It is the tools to converte normal Web3.0 UI and deploy on Anchor network. This time, we tried many different packages, and improved very well.

### Secure APIs [ Not this time ]

- Normally, we get the JS SDK from project officail website then download it in many ways, such as direct download or NPM packages. But wether the SDK file is modified and hacked, it is a bit hard to find out. W3OS solve this by putting the SDK code on chain, you can load and run them just as NPM way, but the code is on chain, more security than from website or CDN.

- As the APIs are trustable, W3OS will not load all the SDKs at starting, but when the Dapps try to run the SDK, then system try to get the code from Anchor Network and run it.

## Functions

### Account

- New Account function. You can create account by Polkadot default Mnemonic, at the same time, W3OS will encry the encried JSON file and store locally. Then, it is easy to login, just input the password when you got the account.

- Login from incried JSON file is a friendly way, just select the JSON file then input the password, your Web3.0 world is back.

### Talking ( IMGC )

- As the bad network, W3OS talking function do improve the UX by reconnect automatically.

#### Instant Messaging

- As the basic function of W3OS, when you click the contact, you can chat with him/her immediately. When you do have messsages, the contact list will show the amount of message on the avatar.

- You can chat to any SS58 account, then there will be strangers. W3OS list the strangers seperated from friends, you can manage them just as contact.

#### Group Chat

- Creating a group. **Talking** is the entry for Group Chat. You can find the **New Group** function by clicking the bottom icons which is on the left. You need to select the members from contact, don't worry forgetting someone, you can change the members later.

- Chat in the group. Just type in what you want to say, IMGC service will get the message and sent it to all the members in the group. When some of the goup is off-line, the message will be hold on server for a period of time.

- Changing the group name. Group name is a basic function, when you do it, the members will get the notice and update the group details automatically.

- Changing members. A list will sent to IMGC service to modify the members of the group, IMGC service will find out who are added and  who are removed. After that, notices are sent to all related members.

- Diverting the manager of group. Changing the manager is done this time, the group details will be updated properly.

- Leaveing the group. Any members of the group can leave the chat as they wish, the notice of such action will send to all members.

- Destory the group. The manager can destory the group, then the data will be removed from IMGC service.

#### Vertification Of Payment

- It is an important thing that SS58 account is too easy to get, there will be a lot of AD accounts when more and more customer joinng W3OS. W3OS take the way of vertifying by payment. You can request the IMGC service to vertify, service will response a special amount of coins and a target account. After you pay the correct amount to the target account, IMGC service will get the transaction and confirm your account.

- The veritifcation details will be storaged on Anchor Network. Then IMGC service can identify the accouts and broadcast the message between services. This part is not done this time.

### Payment

- Well related with contact, when you click any avatar of contact, there is a "Pay to" button. Just input the amount you want to pay, then input the password, payment is done.

- W3OS will monitor the transaction and record to local by inserting to indexedDB. Then you do have a pay bill list, which is not included in offcial portal.

- The vertification payment will be recorded here too.

### Contact

- Add new contact. Just inputting the SS58 addresss on the top of contact page, you will find it on the list of contact. The avantar is from [https://robohash.org](https://robohash.org), as the SS58 account is unique, the avatar is unique too.

- Stranger list. When any SS58 address sent you a message by IMGC service, it will be listed on the stranger list. Click it, you can added the stranger as contact.

- Management of contact. At the bottom, you will find a cross icon, click it, then it is the editing mode, select the target contact you want to remove. Click the red cross icon again, the selected guys are gone.

- Details of contact. You can set a name to an account, that will help you to manage your contact easily. You will find there is a **Pay To** button, easy to use.

### Trend

- There are some important coins on the first screen of W3OS. The data is from [https://coincap.io/](https://coincap.io/). Price of coins is an important part of Web3.0, from W3OS view, it is a great AD banner.

- In the future, this is the entry of market, not finished this time.

### Dapps

- W3OS is base on Anchor Network, when the Dapps is deployed on netwok, it can be loaded just by inputting the Anchor Name on the top of W3OS.

- There are some Anchor Name you can try. `home`,`acala`,`playground`.

## Code

- W3OS Github: [https://github.com/ff13dfly/W3OS](https://github.com/ff13dfly/W3OS)

- IMGC service: [https://github.com/ff13dfly/W3OS/tree/main/service](https://github.com/ff13dfly/W3OS/tree/main/service)

## Resource

- Polkadot/Substrate
- Anchor Network
- Easy Protocol
