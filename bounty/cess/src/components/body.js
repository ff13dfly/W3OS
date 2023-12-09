import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import Page from "./page";


function Body(props) {
  const size = [3, 6, 3];

  let [content, setContent] = useState("");

  const self={
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
      </Container>
  );
}

export default Body;