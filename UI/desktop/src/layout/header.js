import { Row, Col } from "react-bootstrap";
import Search from "../component/search";

function Header() {
    const grid = [2, 4, 6];
    return (
        <Row>
            <Col lg={grid[0]} xl={grid[0]} xxl={grid[0]}>
                <h3>W<span className="logo">3</span>OS <span className="client">Desktop</span> </h3>
                
            </Col>
            <Col lg={grid[1]} xl={grid[1]} xxl={grid[1]}>
                <Search />
            </Col>
            <Col className="text-end" lg={grid[2]} xl={grid[2]} xxl={grid[2]}>
                Commands
            </Col>
        </Row>
    );
}

export default Header;