# W3OS, your Web3.0 entry

- W3OS is an Operation System for Web3.0 base on Polkadot, a pallet called **[Anchor Pallet](https://github.com/ff13dfly/Anchor)** needed.

- W3OS是一个基于Polkadot的全链Web3.0操作系统，基于Polkadot的Anchor Network只多了一个Anchor Pallet（该Pallet也获得了Web3 Foundation的Grants）来支持链上域名系统及存储。W3OS以简洁易用为设计原则，致力于降低开发者和使用者的使用Web3.0的门槛。

- W3OS的目标是让用户和开发者都受益，关键是如何做到这点呢？ 下面从两个角度来说明这个问题，一方面是开发者，一方面是使用者。

- 对于开发者，W3OS具备以下优势
    1. 一站式的全Web3.0访问接入
    2. 精简统一的API访问体验
    3. 不可篡改的链上Dapp发布
    4. 广大的用户基数

- 对于使用者，W3OS具备以下优势
    1. 从免费开始体验Web3.0，完全去中心化的系统
    2. 极低的使用门槛
    3. 安全可信的执行Dapp

- 随着多链时代的到来，链互联也出现了新的变化，W3OS认为链的互通，除了像Polkadot这样的基于链系统本身的互通互联，链上Dapp对多链的功能整合也是一种方式。就像Web2.0那样，一个应用系统，使用不同类型的数据库系统来满足不同的应用需求，也能完美的运行起来。

- 物理性安全，区块链网络本身具有很高的安全性，但是对于服务器本身而言，还是存在被摧毁的风险。现实也浮现出了一个解决方案，只需要把部分网络节点部署到太空，就可以解决这个问题。W3OS作为一个可以加载Dapp的系统，当开发者将Dapp部署到W3OS也就具备了物理性的安全。从成本角度来看，这是一个划算的事情，开发者只需要很少的成本，就可以实现把自己的Dapp部署到太空，具有无法摧毁的安全性。W3OS将开始这方面的调研工作，找到实现这个目标的方案。

## W3OS系统构成

- W3OS主要由3部分组成：Anchor Network，W3API和UI，而W3API和UI都是全链部署在Anchor Network，这样，W3OS就是一个全链的Web3.0操作系统了。

- Anchor Network只增加了一个Pallet来实现W3OS的所有功能，就是Anchor Pallet，这是一个Key-value的链上存储组件，很清晰的把链上资源给组织好，并具备很强的定制能力，也就能实现多种不同的协议。

- W3API是W3OS的核心组件，通过调用链上的SDK库的方式，在保持自身精简的同时，支持广泛的不同Web3.0网络访问能力。

- W3OS支持多种Dapps部署方式，一是可以直接将现有Dapp通过转换的方式部署到链上，二是提供Capp的开发方式，创建更安全的链上应用。

- W3OS的UI部分

### Anchor Network

- 当前，单节点的测试网络已经上线，可以通过以下节点进行访问。同时，部署在Tanssi的节点也可以进行测试。

- Anchor Network只是增加了Anchor Pallet，其他Polkadot原生具有的功能都存在，这就方便了它便利的接入波卡生态，和其他平行链进行链级别的跨链互操作。

- Anchor Network具备存储小量自定义数据的能力，能完整的实现链上的读写，可以用作重要数据的存储，例如，Dapp的UI前端，各种配置文件。

### W3API

- W3OS主要功能实现的组件，W3API同时支持前端和后端（基于NodeJS）。W3API以从Anchor Network动态加载其他Web3.0网络的SDK的方式，来实现多链连接和使用。这样也能保持自身的精简，便利开发者进行集成。  ****这里最好给个例子****

- W3API是可以进行扩展的Web3.0的功能集合，其自身也是被部署在Anchor Network上的。
![需要补充结构说明图](imgs/structure.png)

#### 核心功能

#### 连接管理功能

#### 本地安全存储

#### 账户管理

#### 支付功能

#### 通讯功能

#### 交易及市场

#### 其他工具

### UI

#### 桌面版本

#### 移动版本

#### Bash版本

### 其他支持程序

#### 加载器 Loader

#### 下载器 Downloader

- 只需确保您能有Loader，Downloader中任何一个工具，连接上Anchor Network就能得到正确的程序，这也是对安全的额一种保障。

#### 服务管理工具