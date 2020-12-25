import React from 'react';
import {Container,Row,Col,Card,Jumbotron,Button} from 'react-bootstrap';

 function HomePage() {

    return (
        <div >
            <div style={{backgroundColor:"#24305E"}}>
                <Container >
                    <Row>
                        <Col>
                            <Jumbotron style={{backgroundColor:"#24305E",paddingLeft:"0",paddingRight:"0", borderRadius:"0"}}>
                                <h1 style={{color:"white", fontSize:"50px"}}>Internet Banking</h1>
                                <p  style={{color:"white", width:"500px", fontSize:"30px"}} >
                                    Working for customer satisfaction
                                </p>
                                <p>
                                    <Button style={{backgroundColor:"white", color:"#24305E",borderRadius:"20px", fontWeight:"700" , marginTop:"50px"}}>
                                            Learn more
                                    </Button>
                                </p>
                            </Jumbotron>
                        </Col>
                        <Col align="end">
                            <img src="/logo.png" style={{width:"300px"}} alt=""/>
                        </Col>
                    </Row>

                </Container>
            </div>

            <div style={{marginTop:"50px"}}>
                <Container>
                    <Row>
                        <Col>
                            <Card style={{ width: 'auto',height:"300px",borderRadius:"15px",
                            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                <Card.Body>
                                    <Card.Title><h1>Checking Account</h1></Card.Title>
                                    <ul style={{display:"flex", paddingLeft:"0px", marginTop:"30px"}}>
                                        <li style={{display:"inline-block", fontSize:"40px", fontWeight:"600"}}>50000</li>
                                        <li style={{display:"inline-block", fontSize:"40px", marginLeft:"10px"}}>
                                            <i className="fas fa-dollar-sign"></i>
                                        </li>
                                    </ul>
                                    <div style={{marginTop:"40px", color:"gray"}}>
                                        <h1 style={{fontFamily:"monospace"}}>0123456789</h1>
                                        <h4>11/20</h4>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card style={{ width: 'auto',height:"300px",borderRadius:"15px",
                            boxShadow:"0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                                <Card.Body>
                                    <Card.Title><h1>Saving Account</h1></Card.Title>
                                    <ul style={{display:"flex", paddingLeft:"0px", marginTop:"30px"}}>
                                        <li style={{display:"inline-block", fontSize:"40px", fontWeight:"600"}}>50000</li>
                                        <li style={{display:"inline-block", fontSize:"40px", marginLeft:"10px"}}>
                                            <i className="fas fa-dollar-sign"></i>
                                        </li>
                                    </ul>
                                    <div style={{marginTop:"40px", color:"gray"}}>
                                        <h1 style={{fontFamily:"monospace"}}>0123456789</h1>
                                        <h4>11/20</h4>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* <Container>
                <Row>
                    <Col>
                        <Card style={{ width: 'auto',borderRadius:"15px"}}>
                            <Card.Body>
                                <Card.Title>Checking Account</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">0123456789</Card.Subtitle>
                                <h2>50000 $</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: 'auto' ,borderRadius:"15px"}}>
                            <Card.Body>
                                <Card.Title style={{color:"green"}}><i style={{marginRight:"10px"}} className="fas fa-arrow-right"></i>Money In</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Current Month</Card.Subtitle>
                                <h2>50000 $</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ width: 'auto',borderRadius:"15px" }}>
                            <Card.Body>
                                <Card.Title style={{color:"red"}}><i style={{marginRight:"10px"}} className="fas fa-arrow-left"></i>Money Out</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Current Month</Card.Subtitle>
                                <h2>50000 $</h2>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container> */}
        </div>
    );
}
export default HomePage