import { Container, Row, Col,Navbar } from "react-bootstrap";
import { useState, useEffect } from "react";
import TalkingSingle from "../components/talking_single";
import TalkingGroup from "../components/talking_group";
import GroupAdd from "../components/group_add";
import RUNTIME from "../lib/runtime";

function Talking(props) {
    const size = {
        header: [3, 6, 3],
        row: [12],
      };
    
    const funs = props.funs;
    let [animation, setAnimation] = useState("ani_scale_in");
    let [framework, setFramework] = useState("");
    let [active, setActive] = useState("");
    let [hidden, setHidden] = useState(false);

    const self = {
      page:(ctx,address)=>{
        setActive(address);
        setFramework(ctx);
        setHidden(true);
      },
      initData:()=>{
        const group={         
          id:"",              //group unique id
          group:[],           //group account list
          status:1,           //group status [ 1:normal; 0:removed, 4:unknown ]
          create:0,           //group create time
          update:0,           //group update time
          notice:[],          //notice list, remove it?
          manager:"",         //group manager, only this one can destory the group
          founder:"",         //group init account
          announce:{          //group announce setting
              content:"",     //announce content
              expired:0,      //the announce expired time
          },
          permit:{            //permit setting
              free:true,      //free to join
              announce:false, //free to set announce
          }, 
          block:[],           //block list    
          nick:"",            //Group nickname

          last:{              //last message
            from:"",
            msg:""
          },            
          type:"group",       //talking type  
        };
        const contact={
          id:"",              //group unique id
          nick:"",            //nickname of contact
          update:0,           //group update time
          last:"",            //last message
          type:"contact"      //talking type
        }

        const gp_1=JSON.parse(JSON.stringify(group));
        gp_1.id="GDkCdYrCqRvX";
        gp_1.group=[
          "5mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788",
          "5mock2hKUJzIpuzFn7vQJPeLAEdUMZiwfFARFrHYzccGiIhx",
          "5mockapbQ9BQcGIuQ9NFjSSvYHxr6NQERc47kWMD4FeDwKeL"
        ];
        gp_1.founder="5mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788";
        gp_1.manager="5mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788";
        gp_1.update=1700615743020;
        gp_1.nick="Travelling happy days";
        gp_1.last={
          msg:"Enjoy the best days!",
          from:"5mockapbQ9BQcGIuQ9NFjSSvYHxr6NQERc47kWMD4FeDwKeL",
        }
        
        const gp_2=JSON.parse(JSON.stringify(group));
        gp_2.id="GDkCdYrCqRvX";
        gp_2.group=[
          "5mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788",
          "5mock2hKUJzIpuzFn7vQJPeLAEdUMZiwfFARFrHYzccGiIhx",
          "5mockapbQ9BQcGIuQ9NFjSSvYHxr6NQERc47kWMD4FeDwKeL",
          "6mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788",
          "6mock2hKUJzIpuzFn7vQJPeLAEdUMZiwfFARFrHYzccGiIhx",
          "6mockapbQ9BQcGIuQ9NFjSSvYHxr6NQERc47kWMD4FeDwKeL",
          "7ockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788",
          "7mock2hKUJzIpuzFn7vQJPeLAEdUMZiwfFARFrHYzccGiIhx",
          "7mockapbQ9BQcGIuQ9NFjSSvYHxr6NQERc47kWMD4FeDwKeL",
        ];
        gp_2.founder="5mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788";
        gp_2.manager="5mockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788";
        gp_2.update=1700399555483;
        gp_2.nick="W3OS波卡黑客松";
        gp_2.last={
          msg:"波卡2023冬季的黑客松",
          from:"7ockRVETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788",
        }

        const gp_3=JSON.parse(JSON.stringify(group));
        gp_3.id="GDkCdYrCqRvX";
        gp_3.group=[
          "5mockBaETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788",
          "5mock3DKUJzIpuzFn7vQJPeLAEdUMZiwfFARFrHYzccGiIhx",
          "5mock77bQ9BQcGIuQ9NFjSSvYHxr6NQERc47kWMD4FeDwKeL"
        ];
        gp_3.founder="5mockBaETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788";
        gp_3.manager="5mockBaETAEcF56UHhAUNNvcZEejjJvixN8v4mwJRCXDf788";
        gp_3.update=1700389555483;
        gp_3.last={
          msg:"重要的是把分工处理好，这样大家都好控制自己的时间",
          from:"5mock3DKUJzIpuzFn7vQJPeLAEdUMZiwfFARFrHYzccGiIhx",
        }
        const ct_1=JSON.parse(JSON.stringify(contact));
        ct_1.id="5EqaE823bX7ujSuj82B27BERuaQunGu6zzVbFv6LDDmZZB6v";
        ct_1.update=0;
        ct_1.last="你要参加比赛不？啥项目啊？";

        return [gp_1,gp_2,ct_1,gp_3];
      },
      entry:()=>{
        RUNTIME.getTalking((list)=>{
          //FIXME, this is for testing, please remove it when publish
          if(list.length===0){
            const nlist=self.initData();
            RUNTIME.setTalking(nlist,self.entry);
          }

          setFramework(
            <div>
              {list.map((row, index) => (
                row.type==="group"?
                <TalkingGroup to={row.id} page={self.page} key={index} details={row}/>:
                <TalkingSingle to={row.id} page={self.page} key={index} details={row}/>
              ))}
            </div>
          );
        });
      },
      newGroup:()=>{
        console.log(`Ready to create new group`);
        self.page(<GroupAdd />,"group_add");
      },
    }
    
    useEffect(() => {
      self.entry();
    },[]);
    

    return (
      <div id="page" className={animation}>
        <Navbar className="bg-body-tertiary">
        <Container>
          <Row style={{ width: "100%", margin: "0 auto" }}>
            <Col xs={size.header[0]} sm={size.header[0]} md={size.header[0]} lg={size.header[0]} xl={size.header[0]} xxl={size.header[0]}
              style={{ paddingTop: "6px" }}
            >
              <Navbar.Brand href="#">W<span className="logo">3</span>OS</Navbar.Brand>
            </Col>
            <Col xs={size.header[1]} sm={size.header[1]} md={size.header[1]} lg={size.header[1]} xl={size.header[1]} xxl={size.header[1]}
              style={{ paddingTop: "10px" }}
              className="text-center"
            >
              Talking
            </Col>
            <Col xs={size.header[2]} sm={size.header[2]} md={size.header[2]}
              lg={size.header[2]}  xl={size.header[2]} xxl={size.header[2]}
              className="text-end pb-2"
              style={{ paddingTop: "10px" }}
            >
              <span
                className="close"
                onClick={(ev) => {
                  if(!active){
                    setAnimation("ani_scale_out");
                    setTimeout(() => {
                      props.funs.page("");
                    }, 300);
                  }else{
                    setActive("");
                    setHidden(false);
                    self.entry();
                  }
                }}
              >
                <button className="btn btn-sm btn-default">X</button>
              </span>
            </Col>
          </Row>
        </Container>
      </Navbar>
        <Container>
          {framework}
        </Container>
        <div className="opts" hidden={hidden}>
          <img
            src="icons/edit.svg"
            className="opt_button"
            alt=""
            onClick={(ev) => {
              self.newGroup(ev);
            }}
          />
        </div>
      </div>
    );
}

export default Talking;