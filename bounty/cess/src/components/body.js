import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import Page from "./page";

function Body(props) {
  const size = [3, 6, 3];

  let [content, setContent] = useState("");

  const self={
    
  }

  useEffect(() => {
    setContent(<Page />);

  }, []);

  return (
      <Container>
        {content}
      </Container>
  );
}

export default Body;