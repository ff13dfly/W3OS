import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import { IoIosMore } from "react-icons/io";
import Page from "./page";


function Body(props) {
  const size = [3, 6, 3];
  let [content, setContent] = useState("");

  const self={
    click:(ev)=>{

    },
    render:(ctx)=>{
      setContent(ctx);
    },
  }

  useEffect(() => {
    self.render(<Page render={self.render} />);
  }, []);

  return (
      <Container>
        {content}

        <button className="btn btn-sm btn-warning" onClick={(ev) => {
          self.click(ev)
        }}><IoIosMore /></button>
      </Container>
  );
}

export default Body;