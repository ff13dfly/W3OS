import { Row, Col } from "react-bootstrap";

function Search() {
    const grid = [9,3];

    return (
        <Row>
            <Col lg={grid[0]} xl={grid[0]} xxl={grid[0]}>
                <input className="form-control" type="text" placeholder="Anchor name..."/>
            </Col>
            <Col className="text-end" lg={grid[1]} xl={grid[1]} xxl={grid[1]}>
                <button className="btn btn-md btn-primary">Search</button>
            </Col>
        </Row>
    );
}

export default Search;