import { Navbar, Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import Login from "../components/login";
import User from "../components/user";
import RUNTIME from "../lib/runtime";
import SystemHeader from "../components/header";

function Account(props) {
  const funs = props.funs;

  let [details, setDetails] = useState("");
  let [animation, setAnimation] = useState("ani_scale_in");

  const self = {
    fresh: () => {
      RUNTIME.getAccount((sign) => {
        if (sign === null) {
          setDetails(<Login fresh={self.fresh} funs={funs} />);
        } else {
          setDetails(<User fresh={self.fresh} balance={self.balance} />);
        }
      });
    },
    balance: (address, ck) => {
      RUNTIME.getAPIs((API) => {
        if (API.AnchorJS.ready()) {
          return API.AnchorJS.balance(address, ck);
        }
        setTimeout(() => {
          self.balance(address, ck);
        }, 100);
      });
    },
  };

  useEffect(() => {
    self.fresh();
    RUNTIME.networkStatus("anchor", (res) => {
      //console.log(res);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="page" className={animation}>
      <SystemHeader funs={funs} setAnimation={setAnimation} title="Account Settings" />
      <Container>{details}</Container>
    </div>
  );
}
export default Account;
