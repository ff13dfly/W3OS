import Node from "./system/node";
import Network from "./service/network";
import Friend from "./contact/friend";


const Tester={
    contact:{
        friend:Friend,
    },
    service:{
        network:Network,
    },
    system:{
        node:Node,
    },
}
export default Tester;