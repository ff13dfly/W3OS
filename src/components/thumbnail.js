import { Row, Col, Image } from "react-bootstrap";

function Thumbnail(props) {

    const list=props.list;
    const url="https://robohash.org";
    let dom="";

    switch (list.length) {
        case 1:
            dom=(<Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Image
                    src={`${url}/${list[0]}.png`}
                    rounded
                    width="100%"
                    />
                </Col>
            </Row>);
            break;
        case 2:
            dom=(<Row className="text-center">
                <Col style={{marginTop:"10px",marginLeft:"-3px"}} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                <Image
                    src={`${url}/${list[0]}.png`}
                    rounded
                    width="48%"
                    />
                    <Image
                    src={`${url}/${list[1]}.png`}
                    rounded
                    width="48%"
                    /></Col>
                </Row>
            );
            break;
        case 3:
            dom=(<Row className="text-center">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[0]}.png`} rounded width="48%" />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[1]}.png`} rounded width="48%" />
                        <Image src={`${url}/${list[2]}.png`} rounded width="48%" />
                    </Col>
                </Row>);
                break;
        case 4:
            dom=(<Row className="text-center">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[0]}.png`} rounded width="48%" />
                        <Image src={`${url}/${list[1]}.png`} rounded width="48%" />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[2]}.png`} rounded width="48%" />
                        <Image src={`${url}/${list[3]}.png`} rounded width="48%" />
                    </Col>
                </Row>);
            break;
        case 5:
            dom=(<Row className="text-center">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[0]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[1]}.png`} rounded width="32%" />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[2]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[3]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[4]}.png`} rounded width="32%" />
                    </Col>
                </Row>);
            break;
        case 6:
            dom=(<Row className="text-center">
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[0]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[1]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[2]}.png`} rounded width="32%" />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Image src={`${url}/${list[3]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[4]}.png`} rounded width="32%" />
                        <Image src={`${url}/${list[5]}.png`} rounded width="32%" />
                    </Col>
                </Row>);
            break;
        case 7:
            dom=(<Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Image
                    src={`${url}/${props.group}.png?set=set4`}
                    rounded
                    width="100%"
                    />
                </Col>
            </Row>);
            // dom=(<Row className="text-center">
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[0]}.png`} rounded width="32%" />
            //         </Col>
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[1]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[2]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[3]}.png`} rounded width="32%" />
            //         </Col>
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[4]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[5]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[6]}.png`} rounded width="32%" />
            //         </Col>
            //     </Row>);
            break;
        case 8:
            dom=(<Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Image
                    src={`${url}/${props.group}.png?set=set4`}
                    rounded
                    width="100%"
                    />
                </Col>
            </Row>);
            // dom=(<Row className="text-center">
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[0]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[1]}.png`} rounded width="32%" />
            //         </Col>
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[2]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[3]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[4]}.png`} rounded width="32%" />
            //         </Col>
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[5]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[6]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[7]}.png`} rounded width="32%" />
            //         </Col>
            //     </Row>);
            break;
        case 9:
            dom=(<Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Image
                    src={`${url}/${props.group}.png?set=set4`}
                    rounded
                    width="100%"
                    />
                </Col>
            </Row>);
            // dom=(<Row className="text-center">
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[0]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[1]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[2]}.png`} rounded width="32%" />
            //         </Col>
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[3]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[4]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[5]}.png`} rounded width="32%" />
            //         </Col>
            //         <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
            //             <Image src={`${url}/${list[6]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[7]}.png`} rounded width="32%" />
            //             <Image src={`${url}/${list[9]}.png`} rounded width="32%" />
            //         </Col>
            //     </Row>);
            break;
        default:

            break;
    }

    return (<div className="thumbnail">{dom}</div>);
}

export default Thumbnail;