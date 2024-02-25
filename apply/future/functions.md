# W3OS功能说明

- 说明各个功能模块的功能及实现方法。

## W3API

- W3OS主要功能实现的组件，W3API同时支持前端和后端（基于NodeJS）。W3API以从Anchor Network动态加载其他Web3.0网络的SDK的方式，来实现多链连接和使用。这样也能保持自身的精简，便利开发者进行集成。  ****这里最好给个例子****

- W3API是可以进行扩展的Web3.0的功能集合，其自身也是被部署在Anchor Network上的。
![需要补充结构说明图](imgs/structure.png)

### 核心功能

- 文件目录：[https://github.com/ff13dfly/W3OS/blob/main/APIs/core](https://github.com/ff13dfly/W3OS/blob/main/APIs/core)

- W3API的初始化逻辑开发。由于W3API的操作对象是各种不同的区块链，又是基于Anchor Network来运行的，默认将连接到Anchor Network才能正确的运行。初始化的过程就需要处理W3API自身状态、网络检测、节点切换、网络状态维持等工作。主要文件为：

  | 文件 | 状态 | 简介 | Github |
  | ------ |------ |------ | ----------- |
  | runtime.js | 已开发，优化中 | 核心组件，加载逻辑控制 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/runtime.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/runtime.js) |
  | launch.js | 已开发，优化中 | Anchor Network加载管理 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/launch.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/launch.js) |
  | status.js | 有框架，待开发 | W3API系统状态管理 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/status.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/status.js) |

- 统一访问管理，实现单入口访问W3API的所有功能，支持多种不同格式进行访问。需要处理的工作有，对输入进行解析、传入参数的类型控制及合法性检测等。

    ```Javascript
        //以下都可以调用文件 {root}/account/local.js的get方法。
        W3.call("account_local_get", ... );
        W3.call(["account","local","get"], ... );
        W3.call({method:["account","local","get"]}, ... )
        W3.call({method:["account","local","get"],alink:"anchor://w3os"}, ... )
        W3.call({method:"account_local_get"}, ... )
        W3.call({method:"account_local_get",alink:"anchor://w3os/2343"}, ... )
    ```

    | 文件 |  状态 | 简介 | Github |
    | ------ | ------ | ------ | ----------- |
    | check.js | 有框架，待开发 | 参数检测 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/checker.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/checker.js) |

- 基于统一访问建立的权限控制，对限制性的功能进行授权访问及授权管理。

    | 文件 | 状态 | 简介 | Github |
    | ------ |------ |------ | ----------- |
    | runtime.js | 已开发，优化中 | 精确到Alink的权限控制逻辑 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/runtime.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/runtime.js) |

- 统一的数据格式、系统信息及基础配置部分。
    | 文件 | 状态 | 简介 | Github |
    | ------ |------ |------ | ----------- |
    | default.js | 已开发 | W3API的基础配置 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/default.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/default.js) |
    | information.js | 已开发 | W3API的版本信息 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/information.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/information.js) |
    | format.js | 已开发 | 所有W3OS内部格式 | [https://github.com/ff13dfly/W3OS/blob/main/APIs/core/format.js](https://github.com/ff13dfly/W3OS/blob/main/APIs/core/format.js) |

- 针对核心部分功能的充分测试。

### 系统管理

- 文件目录：[https://github.com/ff13dfly/W3OS/blob/main/APIs/system](https://github.com/ff13dfly/W3OS/blob/main/APIs/system)

### 连接管理功能

- 对外部的节点连接进行统一管理，可以进行权限控制。避免对同一节点反复连接。

- 连接的自动保持功能的实现。Websocket经常性被闪断，需要进行自动重连的管理。可以提供所有连接的状态提示，供前端UI集成到一起进行显示。

- 主流网络的自动化连接的实现。对广泛支持的区块链网络，提供基础的节点信息。例如，BTC、ETH、Solana等。实现的方式是，官方维护Anchor的列表信息，W3API进行调用。

### 本地安全存储

- 对于用户运行W3OS保存的数据，比如账号信息、权限配置信息等，采用加密（AES）的方式保存在本地。前端采用localStorage保存，后端采用文件的形式来进行保存。

- 本地密码的验证使用如下方式。
  1. 调用本地明文的salt
  2. 和用户输入的password进行md5计算，得到结果
  3. 和本地明文的hash结果进行比较，确认即可

- 本地安全存储也以API的方式提供给其他应用程序使用（注意：这里有安全问题，必须不能暴露加密的hash出来）

- 前端localStorage保存的key值也是通过和密码关联的hash来实现的，进一步降低数据暴露的风险。

### 账户管理

- 本地SS58账号的保存，保存的是加密后的JSON文件，不保存原始的seed。逻辑如下：
    1. 用户用seed创建账号后，输入password
    2. W3OS本地保存password加密的JSON文件
    3. 用户需要使用时，使用password来解密本地JSON文件，获得链上操作的账号
    4. W3OS本地保存的JSON文件，可以下载保存

- 支持多账号的保存，可以在调用的时候进行选择。以数组的方式提供账号JSON文件的保存，提供增删改查的基础功能。

### 支付功能

- 基于Anchor Network的支付功能。简单的链上转账功能，提供转账的历史记录信息(需要服务的支持，会单独开发)

- 更多的限制配置，例如，单日最大支付额、黑名单等。

### 通讯功能

- 基于SS58账号的即时聊天功能，仅需SS58账号即可进行的聊天通讯。基于WebRTC支持点对点的安全加密通讯，实现去中心化的私密聊天。WebRTC还支持点对点的视频聊天，是一个可以深入开发的功能。

- 群组聊天功能。可以通过SS58账号创建群组，实现群聊功能。对群组的管理功能如下：增删成员，设置群名，更换群主，设置群公告，解散群组，设置黑名单。

- 验证支付功能。改功能用于验证SS58账号具有支付能力，这样在服务器间送消息，就增加了一层防护，防止出现临时的SS58账号冲击群组和乱发消息。

### 交易及市场

- Anchor Network自己的市场实现。链锚的交易功能，可以对自己所有的Anchor进行售卖。支持销售给指定用户和公开销售。这是Anchor Network内置的市场机制，可以让Anchor Name具备和域名一样的价值。

- 实现对不同区块链网络支付的统一封装，就能通过同一个API调用对不同的网络进行支付操作。将在不同链上的操作结果，以Anchor的方式进行保存，就能实现资产的跨链功能。虽然对比原生的跨链，安全性要降低了不少，但却能满足一些低安全性要求的场景，极大的降低开发难度。

- NFT市场的初步集成，挑选一个进行集成

- 铭文市场的初步集成，挑选一个进行集成

### 扩展功能

- 转换器（仅后端支持）。实现将React项目部署上Anchor Network的功能，实现一条命令部署到链上。该功能可以极大的降低现有Dapp部署到Anchor Network上来，UI部分几乎不需要改动，就能部署，方便项目进行转移。

- 加载器。启动部署在链上的程序，前后端都进行支持。前端的加载器，可加载Dapp到指定的Dom。后端的加载器，可以直接加载链上程序。

    ```bash
        # 后端运行链上程序的方式
        W3.util.xloader ANCHOR_LINK

        # 前端运行链上程序的方式
        W3.util.xloader( ANCHOR_LINK, DOM_ID ) 
    ```

- 下载器。将链上程序保存成单一文件。主要功能是安全的获取到链上程序，可以从本地运行，不需要能访问的部署节点，就能直接的连接到Web3.0的世界。是Loader的一个补充。

- SDK部署。将SDK部署到Anchor Network的功能，在NodeJS环境下，一条命令搞定将JS的SDK部署到链上，供进一步的测试。W3OS会提供测试及部署过的SDK，测试代码及最终部署文件，都在这里。

## UI

- 和W3API完全分离，完全松耦合，可以实现多种不同的版本。

### 桌面版本

- 基于W3API的桌面W3OS，主要面向开发者，可以提供对数据的深入检测和查看。

- 基于React开发，也可以部署到Anchor Network上。前端数据库采用IndexedDB，保存聊天记录、交易记录等数据量较大的数据。使用localstorage来保存key-value类型的数据，该类型数据都会AES加密后保存。

- 提供开发者需要的转换器和加载器等工具。

### 移动版本

- 基于W3API的移动端W3OS，主要面向普通用户。对现有版本进行升级改造的来，更好的实现当前的功能，增加转账历史等新添加的功能。

- 前端数据库采用IndexedDB，保存聊天记录、交易记录等数据量较大的数据。使用localstorage来保存key-value类型的数据，无论key还是value数据都会AES加密后保存。

- 优化Dapp加载的UI，使用让用户更能理解的图像方式，来替代目前类似命令行的输出。

### Bash版本

- 基于W3API的Bash版本W3OS，主要面向开发者。提供命令行的使用体验，对各项功能进行细致的提示辅助。

- Bash版本可以运行在多种终端，使用loader的方式来进行加载。

- 使用转译的方式来支持命令行的方式进行W3API的调用，例如：

    ```Bash
        #程序的调用方式
        W3.call(["contact","friend","list"],(list)=>{

        });

        #Shell的调用方式
        friend --list
    ```

## 其他支持程序

### IMGC服务

- 链上部署的IMGC服务器，NodeJS版本。

- 群聊功能的实现。创建群组、修改群组成员、设置群名、修改群主、设置群公告、设置黑明单、解散群组。

- 支付验证的功能。服务器给出一个指定金额给客户端以及转账账户，客户端成功向该账户支付了指定金额，既可验证成功。服务器端将共享该交易给其他服务器，作为账户合法的验证信息。

### 账单服务

- 链上部署的账户交易流水版本，NodeJS版本。

- 程序启动后，开始监听网络新的区块生成，记录新的交易。同时，对历史数据进行遍历，获取所有的交易记录，进行缓存。

- 客户端通过API传递账号来获取完整的交易记录

### 加载器 Loader

- 不同与W3API集成的相应功能，这里是独立的Loader文件，可以用于快速部署服务器或者服务节点。

- 前端加载器，html文件，可以通过Anchor Link来加载数据或程序。这次需要对UI进行调整，可以看到完整的进度。

- 后端加载器，js文件。可以通过Anchor Link来加载数据或程序。字符输出结果。

### 下载器 Downloader

- 只需确保您能有Loader，Downloader中任何一个工具，连接上Anchor Network就能得到正确的程序，这也是对安全的额一种保障。

### 服务管理工具

- 通用的服务管理器，可以对IMGC和账单服务进行管理。这次申请，将明确该部分的功能，下一步深入开发。

- 采用加密文件上传的方式来进行验证。将加密的JSON上传到服务器后，服务器通过密码进行解析，和启动的SS58账号进行比对，来判断是否具有访问的权限。

- 未来，其他的W3OS基础服务也是采用此管理器进行。

## iNFT

### 铸造工具

### 交易市场

### 设计师编辑器

- W3OS的每个版本将使用一种鸟类来作为开发代号，同时也发行相关的NFT，“火烈鸟”是该尝试的第一个版本。

- 火烈鸟NFT将使用其他平台来进行发布。

## 太空节点

- Anchor Network支持部署Dapp，就意味着，如果Anchor Network具备太空物理节点的话，就让所有部署的Dapp都具备了物理上的无法摧毁，者对于构建一个去中心化的区块链网络是很有意义的。

- 随着太空技术的进步，尤其是Xspace提供的平价太空部署能力，让部署太空区块链节点变得容易了许多。W3OS预计在3年内将Anchor Network的节点部署到太空，让所有部署在Anchor Network上的Dapp受益。